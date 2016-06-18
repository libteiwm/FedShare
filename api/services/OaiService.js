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

var async = require('async'),
    Promise = require('bluebird').Promise,
    OaiRepository = require('../repositories/oai/OaiRepository'),
    uwords = require('uwords'),
    lodash = require('lodash'),
    GreekStemmer = require('../stemmer/GreekStemmer'),
    natural = require('natural');


var insertRecord = function(record) {

    return new Promise(function(resolve,reject) {
        if(__validateRecord(record)) {

            
            
            var oaiId = record.oaiId;

            var stemmedTitle = __stemmWords(__extractTitleWords(record))
            var stemmedSubject = __stemmWords(__extractSubjectWords(record))
            var stemmedAuthor = __stemmWords(__extractAuthorWords(record))
            var stemmedDescription = __stemmWords(__extractDescriptionWords(record))
            var stemmedCorpCreators = __stemmWords(__extractCorpCreators(record))

             var stems = {
                'title':stemmedTitle,
                'subject':stemmedSubject,
                'author':stemmedAuthor,
                'description':stemmedDescription,
                'corpCreators':stemmedCorpCreators
             };

             record.oaiId = oaiId

            stemClearance(stems)
                .then(function(clearance) {
                    record.stemmedTitle = clearance.stems.title;
                    record.stemmedSubject = clearance.stems.subject;
                    record.stemmedAuthor = clearance.stems.author;
                    record.stemmedDescription = clearance.stems.description;
                    record.stemmedCorpCreators = clearance.stems.corpCreators;
                    record.stemCount = clearance.stemCount;

                    OaiRecords
                        .create(record)
                        .exec(function(err,result){
                            if(err) {
                                reject(err);
                            } else {
                                resolve(result);
                            }
                        });
                })
                .catch(function(err) {
                    reject(err);
                });

        } else {
            sails.log.info("Invalid record: "+record.oaiId);
            reject(new Error("Invalid record"));
        }
    });
};

var __validateRecord = function(record) {

    if(!record.identifier) {
        return false;
    }

    if(!record.title) {
        return false;
    }

    if(!record.relation) {
        return false;
    }

    if(!record.author) {
        return false;
    }

    if(!record.subject) {
        return false;
    }

    if(!record.description) {
        return false;
    }

    return true;
};

var __stemmWords = function (words) {

    var stemmedWords = []

    var greekStemmer = new GreekStemmer();

    for(var i=0;i<words.length;i++) {

        var  word = words[i]

        stemmedWords.push(__getPlain(word,greekStemmer))

        word = greekStemmer.stem(word)
        word = natural.PorterStemmer.stem(word)

        stemmedWords.push(word)
    }

    return stemmedWords
}


var __getPlain = function(word,greekStemer) {

    word = greekStemer.__replaceAccentedCharacters(word)
    word = greekStemer.__replaceSigma(word)

    return word.toLowerCase()
}

var __stemmRecord = function (record) {

    var words = __extractWords(record)

    var stemmedWords = []

    var greekStemmer = new GreekStemmer()

    for(var i=0;i<words.length;i++) {

        var word = words[i]

        word = greekStemmer.stem(word)
        word = natural.PorterStemmer.stem(word)

        stemmedWords.push(word)
    }

    return stemmedWords
}

var __setUpDate = function (record) {

    if(record['date']) {

        var dateStr = record['date']

        try {
            record['date'] = new Date(Date.parse(dateStr))
        } catch(err) {
        }
    }

}

var __extractAuthorWords = function(record) {

    var author = record.author
    return uwords(author);
}

var __extractTitleWords = function(record) {

    if(record.title) {
        var title = record.title
        return uwords(title)
    }

    return []
}

var __extractSubjectWords = function(record) {


    if(Array.isArray(record.subject)) {
        var subject = ""

        for(var i=0;i<record.subject.length;i++) {

            var subject = subject+" "+record.subject[i]
        }

    } else {
        var subject = record.subject
    }

    return uwords(subject);
}

var __extractDescriptionWords = function(record) {

    var description = record.description;
    return uwords(description);
}

var __extractCorpCreators = function(record) {

    var corpCreators = record.corpcreator

    if(!corpCreators) {
        return []
    }

    var corpCreator = ""

    for(var i=0;i<corpCreators.length;i++) {
        corpCreator = corpCreator+' '+corpCreators[i]
    }

    return uwords(corpCreator);
}

var __extractWords = function(record) {

    var subject = record.subject
    var description = record.description
    var title = record.title
    var splittedSubject = subject.replace('  ',' ').split(' ')
    var splittedDescription = description.replace('  ',' ').split(' ')
    var splittedTitle = title.replace('  ',' ').split(' ')
    var words = splittedSubject.concat(splittedDescription).concat(splittedTitle)

    return words
}

var fetchRecords = function(text,fields) {

    return new Promise(function(resolve,reject) {

        var options = {};

        if(!fields) {
            options = {};
            options.title = true;
            options.subject = true;
            options.author = true;
            options.supervisor = true;
            options.description = true;
        } else {

            for(var i=0;i<fields;i++) {
                options[fields[i]]=true;
            }
        }


        var words = text.replace('  ',' ').split(' ')

        var terms = WordStemmerService.stemmWords(words);
        OaiRepository.searchForTerms(terms,options)
            .then(resolve)
            .catch(reject);
    });
};

var stemClearance = function(stems) {

    return new Promise(function(resolve,reject) {

        async.map(Object.keys(stems),
            function(key,callback) {

                findNonExistentWords(stems[key])
                    .then(function(result) {
                        stems[key] = result;
                        callback();
                    })
                    .catch(callback);
            },
            function(err,callback) {

                var stemSum = [];

                for(var key in stems) {
                    stemSum = stemSum.concat(stems[key])
                }

                var uniques = lodash.uniq(stemSum)

                var stemCount = {};

                for(var j=0;j<uniques.length;j++) {

                    var stem = uniques[j];

                    for(var i=0;i<stemSum.length;i++) {

                        if (!stemCount[stem]) {
                            stemCount[stem] = 0;
                        }

                        if(stemSum[i]==stem) {
                            stemCount[stem] = stemCount[stem] + 1;
                        }
                    }
                }

                var clearance = {};
                clearance.stems = stems;
                clearance.stemCount = stemCount;
                resolve(clearance);
            });
    });

}

var findNonExistentWords = function(words) {

    return new Promise(function(resolve,reject) {
        async.map(words,function(word,callback) {

            if(stem.length<=1) {
                callback(null,null);
            } else {
                StopWords.findOne({term:word}).exec(function(err,result) {
                    if(err) {
                        callback(err);
                    } else if(result) {
                        callback();
                    } else {
                        callback(null,word);
                    }
                });
            }
        },function(err,results) {

            var wordsToSearch = [];

            for(var i=0;i<results.length;i++) {
                if(results[i]) {
                    wordsToSearch.push(results[i]);
                }
            }

            resolve(wordsToSearch);
        });
    });
}


module.exports = {
    fetchRecords: fetchRecords,
    insertRecord: insertRecord
}