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

var http = require('http')
var xml2js = require('xml2js')
var PazparResultExtractor = require('./PazparResultExtractor')

function PazparRepository() {
    this.pazParHost = '127.0.0.1'
    this.pazParPort = '8004';
}

PazparRepository.prototype.findFromTarget = function(searchText,target,callback) {

    var pazparRepository = this

    this.__createSession(function(err,session) {

        if(err) {
            callback(err, null)
            return
        }

        pazparRepository.__searchRequest(session,searchText,target,callback)
    })
}

PazparRepository.prototype.__createSession = function(callback) {

    var sessionOptions = this.__createSessionOptions()
    var sessionRequest = http.request(sessionOptions,function(sessionResponse){
        sessionResponse.setEncoding('utf8')

        var completeResponse = '';

        sessionResponse.on('data',function(httpData) {
            completeResponse +=httpData
        })
        sessionResponse.on('end',function() {

            xml2js.parseString(completeResponse,function(err,result) {
                if(err) {
                    callback(err,null)
                } else {
                    var session = result.init.session;
                    callback(null,session);
                }
            })
        })
    })

    sessionRequest.on('error',function(e) {
        callback(e,null)
    })

    sessionRequest.end()
}

PazparRepository.prototype.__searchRequest = function(session,searchText,target,callback) {

    var searchOptions = this.__createSearchOptions(session,searchText,target)
    this.__issueSearchRequest(searchOptions,callback)
}

PazparRepository.prototype.__createSearchOptions = function(session,searchText,source) {

    var searchOptions = this.__createRequestOptions();
    searchOptions.session = session
    searchOptions.path = "/?session=" + session + "&command=search&query=" + searchText +"&filter=pz:id="+source
    searchOptions.path = encodeURI(searchOptions.path)

    return searchOptions
}

PazparRepository.prototype.find = function(searchText,callback) {

    var pazparRepository = this;

    var sessionOptions = this.__createSessionOptions()
    var sessionRequest = http.request(sessionOptions,function(sessionResponse){
        sessionResponse.setEncoding('utf8')

        var completeResponse = '';

        sessionResponse.on('data',function(httpData) {
            completeResponse +=httpData
        })
        sessionResponse.on('end',function() {

            xml2js.parseString(completeResponse,function(err,result) {

                if(err) {
                    callback(err,null)
                } else {

                    var session = result.init.session;
                    sessionOptions.session = session
                    sessionOptions.path = "/?session=" + session + "&command=search&query=" + searchText

                    sessionOptions.path = encodeURI(sessionOptions.path)

                    pazparRepository.__issueSearchRequest(sessionOptions, callback)
                }
            })
        })

    })

    sessionRequest.on('error',function(e) {
        callback(e,null)
    })

    sessionRequest.end()

}

PazparRepository.prototype.__issueSearchRequest = function (sessionOptions,callback) {

    var pazparRepository = this;

    var searchRequest = http.request(sessionOptions,function(searchResponseData) {

        searchResponseData.setEncoding('utf8')

        var completeResponse = '';

        searchResponseData.on('data',function(httpData) {
            completeResponse +=httpData
        })

        searchResponseData.on('end',function() {
            setTimeout(function() {
                var colletionParams = {
                    session : sessionOptions.session,
                    start: 0,
                    number: 10
                }

                var responseData = []


                pazparRepository.__collectSearchData(colletionParams,responseData,callback)

            },2000)
        })

    })

    searchRequest.on('error',function(e) {
        callback(e,null)
    })

    searchRequest.end()
}

PazparRepository.prototype.__createRequestOptions = function() {
    return {
        host : this.pazParHost,
        port : this.pazParPort
    }
}

PazparRepository.prototype.__createSessionOptions = function() {
    return {
        host : this.pazParHost,
        port : this.pazParPort,
        path : '/?command=init'
    }
}

PazparRepository.prototype.__collectSearchData = function(collectionParams,responseData,callback) {

    var pazParRepository = this;

    var requestOption = this.createRequestOption()
    requestOption.path = this.__createCollectionQuery(collectionParams)
    var request = http.request(requestOption,function(result) {

        result.setEncoding('utf8')

        var completeResponse = '';

        result.on('data',function(httpData) {

            completeResponse +=httpData
        })

        result.on('end',function() {
            var parser = new xml2js.Parser();
            parser.parseString(completeResponse,function(err,pazparResponse) {

                if(err) {
                    callback(err,null)
                } else {

                    responseData.push(pazparResponse);

                    if (pazParRepository.__continueCollecting(pazparResponse)) {
                        collectionParams.start += collectionParams.number
                        collectSearchData(collectionParams, responseData, callback)
                    } else {
                        var pazparResultsExtractor = new PazparResultExtractor(responseData);
                        var mathcingRecords = pazparResultsExtractor.recordsMatching()
                        callback(null, mathcingRecords)
                    }
                }
            })
        })
    })



    request.on('error', function (e) {
        callback(e,null)
    })

    request.end()

}

PazparRepository.prototype.__createCollectionQuery = function(collectionParams) {

    var collectionQuery = "/?session="+ collectionParams.session+
        "&command=show&start="+collectionParams.start+
        "&number="+collectionParams.number

    return collectionQuery;
}

PazparRepository.prototype.__continueCollecting = function(pazparResponse) {

    if(pazparResponse&&pazparResponse.show&&pazparResponse.start) {
        var start = parseInt(pazparResponse.show.start)
        var total = parseInt(pazparResponse.show.total)
        return start < total;
    } else {
        return false;
    }
}

PazparRepository.prototype.createRequestOption = function() {
    return {
        host : this.pazParHost,
        port : this.pazParPort
    }
}

module.exports = PazparRepository
