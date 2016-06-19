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

var Promise = require('bluebird').Promise,
    async = require('async');

var insertRecord = function (record) {

    var wordMap = __createWordMap(record);
    return __processWords(record.oaiId,wordMap);
}

var __createWordMap = function (record) {

    var wordMap = {}

    for(var i=0;record.stemmedTitle&&i<record.stemmedTitle.length;i++) {

        var word = record.stemmedTitle[i];

        if(wordMap[word]) {
            wordMap[word].title = true;
        } else {
            wordMap[word] = {"title":true};
        }
    }

    for(var i=0;record.stemmedSubject&&i<record.stemmedSubject.length;i++) {

        var word = record.stemmedSubject[i];

        if(wordMap[word]) {
            wordMap[word].subject = true;
        } else {
            wordMap[word] = {"subject":true};
        }
    }

    for(var i=0;record.stemmedAuthor&&i<record.stemmedAuthor.length;i++) {

        var word = record.stemmedAuthor[i];

        if(wordMap[word]) {
            wordMap[word].author = true;
        } else {
            wordMap[word] = {"author":true};
        }
    }

    for(var i=0;record.stemmedDescription&&i<record.stemmedDescription.length;i++) {

        var word = record.stemmedDescription[i];

        if(wordMap[word]) {
            wordMap[word].description = true;
        } else {
            wordMap[word] = {"description":true};
        }
    }

    for(var i=0;record.stemmedCorpCreators&&i<record.stemmedCorpCreators.length;i++) {

        var word = record.stemmedCorpCreators[i];

        if(wordMap[word]) {
            wordMap[word].corpcreator = true;
        } else {
            wordMap[word] = {"corpcreator":true};
        }
    }

    return wordMap;
};

var __processWords = function(oaiId,wordMap) {

    return new Promise(function (resolve,reject) {

        var words = Object.keys(wordMap);

        StemDictionary.native(function (err,collection) {

            if(err) {
                reject(err);
            } else {
                
                async.map(words,
                    function(word,callback) {

                        var record = {};
                        record.oaiId = oaiId;
                        record.occurences = wordMap[word];

                        collection.updateOne({term:word},{$push:{records:record}},{upsert:true},callback);
                        
                    },function(err,result) {
                        
                        if(err) {
                            reject(err);
                        } else {
                            resolve();
                        }
                    }
                );
            }
        });
    });
};

var findRecordsThatMatch = function(terms,fields) {

    return new Promise(function(resolve,reject){
        StemDictionary.native(function(err,collection) {

            var filter = {}
            for(var key in fields) {
                if(fields[key]) {
                    filter["records.occurences."+key] = true;
                }
            }

            var matchFilter = {$match:filter};

            //TODO refactor!!!

            if(Object.keys(filter).length!=5) {

                collection.aggregate([
                    {$match: {term: {$in: terms}}},
                    {$unwind: "$records"},
                    matchFilter,
                    {$group: {_id: "$term", oaiIds: {$addToSet: "$records.oaiId"}}}
                ], function (err, results) {
                    if(err) {
                        reject(err);
                    } else{
                        resolve(results);
                    }
                })
            } else {
                collection.aggregate([
                    {$match: {term: {$in: terms}}},
                    {$unwind: "$records"},
                    {$group: {_id: "$term", oaiIds: {$addToSet: "$records.oaiId"}}}
                ], function (err, results) {
                    if(err) {
                        reject(err);
                    } else {
                        resolve(results);
                    }
                })
            }
        });
    });
};

module.exports = {
    findRecordsThatMatch : findRecordsThatMatch,
    insertRecord: insertRecord
}