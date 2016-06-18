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
var xml2js = require('xml2js');
var http = require('http');

var fetchRecord = function(item) {

    return new Promise(function(resolve,reject) {

        var fetchItemOptions = {
            host: 'anaktisis.teiwm.gr',
            port: '80',
            path: "/rest/eprint/"+item
        };

        var request = http.request(fetchItemOptions,function(result) {
            result.setEncoding('utf-8');
            var completeResponse = '';

            result.on('data', function (buffer) {
                completeResponse +=buffer;
            });

            result.on('end',function() {
                resolve(completeResponse);
            });
        });
        request.on('error',function(e) {
            reject(e);
        });

        request.end();
    });
};

var fetchRecordList = function() {

    return new Promise(function(resolve,reject) {

        var fetchListOptions = {
            host: 'anaktisis.teiwm.gr',
            port: '80',
            path: "/rest/eprint/"
        };

        var request = http.request(fetchListOptions,function(result) {

            result.setEncoding('utf-8')

            var completeResponse = ''

            result.on('data', function (buffer) {
                completeResponse +=buffer
            })

            result.on('end',function() {

                xml2js.parseString(completeResponse,function(err,jsonResult) {

                    if(err) {
                        reject(err);
                    } else {
                        var list = jsonResult.html.body[0].ul[0].li;

                        var xmlList = []

                        for(var i=0;i<list.length;i++) {

                            var item = list[i].a[0].$.href

                            if(item.indexOf(".xml")!=-1) {
                                xmlList.push(item)
                            }
                        }
                        resolve(xmlList);
                    }
                });
            });
        });

        request.on('error',function(e) {
            reject(e);
        })

        request.end();
    });
};

var fetchSubject = function(subjectKey) {

    return new Promise(function(resolve,reject) {

        var subjectOptions = {
            host: 'anaktisis.teiwm.gr',
            post: '80',
            path: "/rest/subject/" + subjectKey + ".xml"
        };

        var request = http.request(subjectOptions, function (result) {
            result.setEncoding('utf-8')
            var completeResponse = ''

            result.on('data', function (buffer) {
                completeResponse += buffer
            })

            result.on('end', function () {

                var parser = new xml2js.Parser()
                parser.parseString(completeResponse, function (err, result) {

                    if (err) {
                        reject(err)
                    } else {

                        var name = result.subjects.subject[0].name[0].item[0].name[0]

                        var subject = {code: subjectKey, name: name};

                        resolve(subject);
                    }
                });
            });
        });

        request.on('error', function (err) {
            reject(err);
        });

        request.end();
    });
};

module.exports = {
    fetchRecordList: fetchRecordList,
    fetchRecord: fetchRecord,
    fetchSubject: fetchSubject
}
