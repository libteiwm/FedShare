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

var Promise = require('bluebird').Promise;

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
}

module.exports = {
        findRecordsThatMatch : findRecordsThatMatch
}