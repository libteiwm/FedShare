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

var async = require('async');
var Promise = require('bluebird').Promise;

var SOURCE_MAP = {
  "florina":"195.130.86.200:210/ADVANCE",
  "grevena":"195.130.83.165:210/ADVANCE",
  "kastoria":"195.130.87.12:210/ADVANCE",
  "kozani":"195.130.83.160:210/ADVANCE",
  "oai":"127.0.0.1:8004"
}

var createSearcher = function(source,fields,text) {

    if(source=='oai') {

        var oaiSearcher = {

            search : function(callback) {

                OaiService.fetchRecords(text,fields)
                    .then(function(records) {
                        callback(null,records);
                    }).catch(function(err) {
                        callback(err)
                    });
            }
        };

        return oaiSearcher;

    } else if(source=='pazparall') {

        var pazparSearcher =  {

            search : function(callback) {

                PazparService.fetchRecords(text)
                    .then(function(results) {
                        callback(null,results);
                    })
                    .catch(function(err) {
                        callback(err);
                    });
            }
        };

        return pazparSearcher;
    } else {

        var pazparSearcher = {

            search : function(callback) {

                PazparService.fetchRecordsFromSource(text,SOURCE_MAP[source])
                    .then(function(results) {
                        callback(null,results);
                    })
                    .catch(function(err) {
                        callback(err);
                    });
            }
        };

        return pazparSearcher;
    }
};

module.exports = {

  search: function(query,callback) {

      return new Promise(function(resolve,reject) {

          if(query==undefined||query.text==undefined) {
              resolve([]);
              return;
          }

          var source = query.source;

          if(!source) {
              source = [
                  "pazparall",
                  "oai"
              ];
          }

          if(!Array.isArray(source)) {
              source = [source]
          }

          var field = query.type;

          if(field) {
              if(!Array.isArray(field)) {
                  field = [field];
              }
          }

          var searchers = [];

          source.forEach(function (singleSource) {
              searchers.push(createSearcher(singleSource,field,query.text));
          });

          async.map(searchers,
              function(searcher,callback) {
                  searcher.search(callback);
              },
              function(err,results) {

                  var totalResults = [];

                  if(Array.isArray(results)) {
                      results.forEach(function(result) {

                          if(Array.isArray(result)) {
                              totalResults = totalResults.concat(result);
                          } else{
                              totalResults.push(result);
                          }
                      });
                  }

                  var sortedResults = TextRankSorterService.sort(query.text,totalResults);
                  resolve(sortedResults);
              });
      });
  }

};