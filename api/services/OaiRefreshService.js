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
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston,
 * MA 02110-1301, USA.
 *
 */

var xml2js = require('xml2js');
var OaiRepository = require('../repositories/oai/OaiRepository');
var EPrintsRepository = require('../repositories/eprints/EPrintsRepository');
var EPrintsResultExtractor = require('../repositories/eprints/EPrintsResultExtractor');

var listFromLast = function() {

    return new Promise(function(resolve,reject) {

        async.waterfall([
            function(callback){
                OaiRepository.fetchLastRecord()
                    .then(function(result) {

                        if(result) {
                            var lastOaiId = parseInt(result);
                        } else {
                            var lastOaiId = 0;
                        }

                        callback(null,lastOaiId);
                    })
                    .catch(function(err) {
                        callback(err,null);
                    });
            },
            function(lastRecord,callback) {
                EPrintsRepository.fetchRecordList()
                    .then(function(recordList) {
                        callback(null,lastRecord,recordList);
                    })
                    .catch(function(err) {
                        callback(err);
                    });
            },
            function(lastRecord,recordList,callback) {

                var recordsToFetch = [];

                for (var i = 0; i < recordList.length; i++) {

                    var recordNum = parseInt(recordList[i].replace(".xml", ""))

                    if (recordNum > lastRecord) {
                        recordsToFetch.push(recordNum);
                    }
                }

                callback(null,recordsToFetch);
            }
        ],function(err,result) {
            if(err) {
                reject(err);
            } else {
                resolve(result);
            }
        }) ;
    });
};

var fetchAndSaveRecord = function(recordName,callback) {


    async.waterfall([
        function(callback) {
            EPrintsRepository.fetchRecord(recordName+".xml")
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

                OaiRepository.fetchSubjects(document.subjects[0].item)
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

            var normalizedDocument = EPrintsResultExtractor.normalizeRecord(document);

            OaiService.insertRecord(normalizedDocument)
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
            callback();
        }
    });
};


var fetchAndSaveRecords = function(records) {

    return new Promise(function(resolve,reject) {

        var queue = async.queue(function(record,callback) {

            sails.log.info("Processing record: "+record);
            fetchAndSaveRecord(record,callback);
        },1);


        for(var i=0;i<records.length;i++) {

            var record = records[i];

            queue.push(record,function(err) {
                sails.log.info("Finished processing");
            });
        }

        queue.drain = function() {
            sails.log.info('all items have been processed');
            resolve();
        };
    });
}


var refreshRecords = function() {

    return new Promise(function(resolve,reject) {
        listFromLast()
            .then(function(records) {
                fetchAndSaveRecords(records)
                    .then(function(res) {
                       resolve(res);
                    })
                    .catch(function(err){
                        reject(err);
                    });
            })
            .catch(function(err) {
                reject(err);
            });
    });
};

module.exports = {
    refreshRecords: refreshRecords
}