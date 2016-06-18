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

var fs = require('fs'),
    uwords = require('uwords'),
    Promise = require('bluebird').Promise;

var insertFromFile = function(file) {

    return new Promise(function(resolve,reject) {

        fs.readFile(file, 'utf8', function (err,data) {

            if (err) {
                reject(err);
            }

            var terms = uwords(data);


            var stopWords = [];
            for(var i=0;i<terms.length;i++) {
                var stopWord = {term:terms[i]};
                stopWords.push(stopWord);
            }

            StopWords.native(function(err,collection) {

                if(err) {
                    reject(err);
                } else {

                    async.map(stopWords,function(stopWord,callback) {

                        collection.updateOne({term:stopWord.term},stopWord,{upsert:true},callback);
                    },function(err,results) {
                        if(err) {
                            reject(err);
                        } else {
                            resolve(results);
                        }
                    });
                }
            });
        });

    });
};

module.exports = {
    insertFromFile: insertFromFile
}