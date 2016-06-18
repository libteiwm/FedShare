/**
 *
 * FedShare - A Federated Search Engine for Z39.50 & OAI-PMH protocols
 *
 * Copyright (C) 2016 Library of Technological Educational Institute of Western Macedonia
 * Author: Emmanouil Gkatziouras - Project Management: Fotios Stefanidis
 *
 * This file is part of FedShare.
 *
 * FedShare is free software: you can redistribute it and/or modify it
 * under the terms of the GNU General Public License as published
 * by the Free Software Foundation, version 2.
 *
 * FedShare is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULA__fetchSubjectsR PURPOSE.  See the
 * MERCHANTABILITY or FITNESS FOR A PARTICULA__fetchSubjectsR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
 * MA 02110-1301, USA.
 *
 */

var Promise = require('bluebird').Promise;
var xml2js = require('xml2js');
var http = require('http');
var StemDictionaryRepository = require('./StemDictionaryRepository');
var EPrintsRepository = require('../eprints/EPrintsRepository');
var EPrintsResultExtractor = require('../eprints/EPrintsResultExtractor');

var searchForTerms = function(terms,options) {

    return new Promise(function(resolve,reject) {

        if(!terms||!Array.isArray(terms)) {
            reject(new Error("Provide an array of strings"));
        }

        if(!options) {
            reject(new Error("Provide options"));
        }

        var collection = null;

        async.waterfall([
                function(callback) {
                    OaiRecords.native(function(err,native) {

                        collection = native;

                        if(err) {
                            callback(err);
                        } else{
                            callback();
                        }
                    });
                },
                function(callback) {
                    collection.count(function (err, count) {
                        callback(err, count);
                    });
                },
                function(count, callback) {
                    __idfRepo(collection,terms,options,count,function(err,results) {
                        callback(err,results);
                    });
                },
                function(res,callback) {
                    __tfRepo(terms,res,options,function(err,results) {
                        callback(err,results);
                    })
                },
                function(records,callback) {
                    var sortedRecords = __quickSortRecords(records);
                    callback(null,sortedRecords);
                }
            ],function(err,results) {
                if(err) {
                    sails.log.error("Could not fetch records",err);
                    reject(err);
                } else{
                    resolve(results);
                }
            }
        );
    });
}

var __idfRepo = function(connection,terms,options,count,callback) {

    var fields = {};

    if(options.title) fields.title = true;
    if(options.subject) fields.subject = true;
    if(options.author) fields.author = true;
    if(options.supervisor) fields.corpcreator = true;
    if(options.description) fields.description = true;


    StemDictionaryRepository.findRecordsThatMatch(terms,fields)
        .then(function(results) {

            if(results.length!=terms.length) {
                callback(null,null);
            } else {

                var idf = {};
                var oaiIds = [];

                var intersect = function intersect(a, b) {
                    var t;
                    if (b.length > a.length) t = b, b = a, a = t;
                    return a.filter(function (e) {
                        if (b.indexOf(e) !== -1) return true;
                    });
                }

                for(var i=0;i<results.length;i++) {

                    var result = results[i];

                    var fixedOais = [];
                    for(var j=0;j<result.oaiIds.length;j++) {

                        fixedOais = fixedOais.concat(result.oaiIds[j]);
                    }
                    result.oaiIds = fixedOais;

                    idf[result._id] = Math.log(count/result.oaiIds.length);

                    if(oaiIds.length==0) {
                        oaiIds = result.oaiIds;
                    } else {
                        oaiIds = intersect(oaiIds,result.oaiIds);
                    }
                }

                var res = {"idf":idf,"oaiIds":oaiIds};
                callback(null,res);
            }
        })
        .catch(function(err) {
            callback(err);
        });
};

var __tfRepo = function(terms,res,options,callback) {

    if(res==null) {

        callback(null,[]);
    } else {

        OaiRecords.find({oaiId:{$in:res.oaiIds}}).exec(function(err,records) {

            var results = [];

            for(var i = 0;i<records.length;i++) {

                var record = records[i];

                var rowsOfStems = [];

                var countTermOccurrence = function(terms,rowsOfStems) {

                    var termsOccurrence = {}

                    for(var i=0;i<terms.length;i++) {

                        var term = terms[i];
                        termsOccurrence[term] = 0;
                    }


                    for(var j=0;j<rowsOfStems.length;j++) {

                        var stem = rowsOfStems[j];

                        for(var term in termsOccurrence) {

                            if(stem.indexOf(term)!=-1) {
                                termsOccurrence[term] = termsOccurrence[term]+1;
                            }
                        }
                    }

                    return termsOccurrence;
                }

                if(options.title&&record.stemmedTitle) {
                    rowsOfStems = rowsOfStems.concat(record.stemmedTitle);
                }

                if(options.subject&record.stemmedSubject) {
                    rowsOfStems = rowsOfStems.concat(record.stemmedSubject);
                }

                if(options.description&&record.stemmedDescription) {
                    rowsOfStems = rowsOfStems.concat(record.stemmedDescription);
                }

                if(options.author&&record.stemmedAuthor) {
                    rowsOfStems = rowsOfStems.concat(record.stemmedAuthor);
                }

                if (options.supervisor&&record.stemmedCorpCreators) {
                    rowsOfStems = rowsOfStems.concat(record.stemmedCorpCreators);
                }

                if(options.description&&record.stemmedDescription) {
                    rowsOfStems = rowsOfStems.concat(record.stemmedDescription);
                }

                var getStemCount = function(terms) {

                    var termsOccurrence = {}

                    for(var i=0;i<terms.length;i++) {

                        var term = terms[i];
                        if(record.stemCount&&record.stemCount[term]) {
                            termsOccurrence[term] = record.stemCount[term]
                        } else {
                            termsOccurrence[term] = 0;
                        }
                    }

                    return termsOccurrence;
                }

                var termOccurrences = getStemCount(terms)

                var weights = {};
                var weightSum = 0;

                for(var key in res.idf) {

                    weights[key] = res.idf[key]*(termOccurrences[key]/rowsOfStems.length);
                    weightSum = weights[key]+weightSum;
                }

                results.push({"weight": weightSum, "record": record});

            }

            callback(null,results);
        });
    }
};

var __quickSortRecords = function(records) {

    var weightSum = function(weight) {

        var sum = 0;

        for(var key in weight) {
            if(weight[key]&&!isNaN(weight[key])) {
                sum += weight[key];
            }
        }

        return sum;
    }

    if(records.length == 0) {
        return [];
    }

    var left =[], right = [], pivot = records[0];

    for(var i=1;i<records.length;i++) {

        var record = records[i];

        var keyNum = weightSum(record.weight);
        var pivotNum = weightSum(pivot.weight);

        keyNum>pivotNum? left.push(records[i]):right.push(records[i]);
    }

    return __quickSortRecords(left).concat(pivot,__quickSortRecords(right));
};

var fetchLastRecord = function() {

    return new Promise(function(resolve,reject){

        OaiRecords.find({limit: 1, sort: {oaiId: -1}})
            .then(function(result) {
                if(result.length>0) {
                    resolve(result[0].oaiId);
                } else {
                    resolve();
                }
            })
            .catch(function(err) {
                reject(err);
            });
    });
};

var listFromLast = function() {

    return new Promise(function(resolve,reject) {

        fetchLastRecord()
            .then(function (result) {

                if(result) {
                    var nextOaiId = result;
                } else {
                    var nextOaiId = 0;
                }

                var recordsToFetch = [];

                __fetchRecordList()
                    .then(function (recordList) {

                        for (var i = 0; i < recordList.length; i++) {

                            var recordNum = parseInt(recordList[i].replace(".xml", ""))

                            if (recordNum > nextOaiId) {
                                recordsToFetch.push(recordNum);
                            }
                        }

                        resolve(recordsToFetch);
                    })
                    .catch(function (err) {
                        reject(err);
                    });
            })
            .catch(function (err) {
                reject(err);
            });
    });
};

var __fetchAndSaveRecord = function(recordName,callback) {

    async.waterfall([
        function(callback) {
            __fetchRecord(recordName+".xml")
                .then(function(result) {
                    callback(null,result);
                })
                .catch(function(error){
                    callback(error);
                });
        },
        function (completeResponse,callback) {

            xml2js.parseString(completeResponse,function(err,jsonResult) {

                if(err) {
                    callback(err)
                } else {
                    if((!jsonResult)||
                        (!jsonResult.eprints)||
                        (!jsonResult.eprints.eprint)||
                        jsonResult.eprints.eprint.length==0) {

                        console.log("Problem on record "+recordName)

                        callback(new Error("Problem parsing new result"))
                    } else {
                        var document = jsonResult.eprints.eprint[0]
                        callback(null,document);
                    }
                }
            })
        },
        function (document,callback) {

            if(!document||!document.subjects||
                !document.subjects.length>0||
                !document.subjects[0].item||
                !document.subjects[0].item.length>0) {

                callback(null,document)
            } else {

                fetchSubjects(document.subjects[0].item)
                    .then(function(subjects){
                        document.subjects[0].item = subjects
                        callback(null,document)
                    })
                    .catch(function(err){
                        callback(err)
                    });
            }
        },
        function(document,callback) {

            var oaiDocument = EPrintsResultExtractor.normalizeRecord(document);

            OaiRecords.create(oaiDocument)
                .then(function(result) {
                    callback(null,result);
                })
                .catch(function(err) {
                    callback(err);
                });
        }
    ],function(err,result) {
        if(err) {
            callback(err);
        } else {
            callback(null,result);
        }
    });
};

var fetchSubjects = function(subjectKeys) {

    return new Promise(function(resolve,reject) {

        async.map(subjectKeys,__fetchSubject,function(err,result) {
            if(err) {
                reject(err);
            } else {
                resolve(result);
            }
        })
    });
};

var __fetchSubject = function(subjectKey,callback) {

    async.waterfall([
            function(callback) {
                Subjects.find({term:subjectKey}).exec(callback);
            },
            function(records,callback) {
                if(records&&records.length>0) {
                    callback(null,result);
                } else {

                    EPrintsRepository.fetchSubject(subjectKey)
                        .then(upsertSubject)
                        .then(function(upsertResult){
                            callback(null,upsertResult);
                        })
                        .catch(function(err) {
                            callback(err);
                        });

                }
            }
        ],
        function(err,result) {
            if(err) {
                callback(err);
            } else {
                callback(null,result);
            }
        });
}

/**
 * We use series since we want to process each record one by one
 * @param records
 * @returns {*}
 * @private
 */
var __fetchAndSaveRecords = function(records) {

    return new Promise(function(resolve,reject) {

        var recordFetches = [];

        for(var i=0;i<records.length;i++) {

            var record = records[i];

            var recordFetchFunction = (record,function(callback){

                __fetchAndSaveRecord(record,callback);

            }.bind({record:record}));

            recordFetches.push(recordFetchFunction);
        }

        async.series(recordFetches,function(err,result) {
            if(err) {
                reject(err);
            } else {
                resolve(result);
            }
        });
    });
}

var upsertSubject = function(subject) {

    return new Promise(function(resolve,reject) {
        Subjects.native(function(err,native) {
            if(err) {
                reject(err);
            } else {
                native.updateOne({code:subject.code},
                    subject,
                    {upsert:true},
                    function(err,success) {
                        if(err) {
                            reject(err);
                        } else {
                            resolve(subject);
                        }
                    });
            }
        });
    });
}

var refreshRecords = function() {

    return new Promise(function(resolve,reject) {
        listFromLast()
            .then(function(records) {
                __fetchAndSaveRecords(records)
                    .then(function(res) {
                        resolve(res)
                    })
                    .catch(function(err) {
                        reject(err)
                    });
            })
            .catch(function(err) {
                reject(err);
            });
    });
}

module.exports = {
    refreshRecords: refreshRecords,
    searchForTerms: searchForTerms,
    fetchLastRecord: fetchLastRecord,
    listFromLast: listFromLast,
    fetchSubjects: fetchSubjects,
    __fetchAndSaveRecord: __fetchAndSaveRecord,
    fetchAndSaveRecords: __fetchAndSaveRecords,
    upsertSubject: upsertSubject
}