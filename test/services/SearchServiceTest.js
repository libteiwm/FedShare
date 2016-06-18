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

var SailsApp = require('sails').Sails,
    assert = require('assert');

describe('SearchServiceTest',function() {

    var sails = new SailsApp();

    before(function(done){
        this.timeout(50000);

        sails.lift({},
            function(err,server) {
                if(err) {
                    done(err);
                } else {
                    done(err,sails);
                }
            });
    });

    it('testSearch',function(done) {
        this.timeout(100000);

        var query = {text:"Δομές"};

        sails.services.searchservice.search(query)
            .then(function(results) {
                console.log("Received results");
                    assert(results.length>1);
                    done();
            })
            .catch(function(err) {
                console.log("Prob on function");
                done(err);
            });

    });

    it('Search oai only',function(done) {
        this.timeout(10000);

        var query = {text:"Δομές",source:["oai"]};

        sails.services.searchservice.search(query)
            .then(function(results) {
                console.log("Received results");
                assert(results.length>1);
                done();
            })
            .catch(function(err) {
                console.log("Prob on function");
                done(err);
            });
    });

    it('Search only pazpar repo',function(done) {
        this.timeout(100000);

        var query = {'text':'Δομές',source:['kozani']};

        sails.services.searchservice.search(query)
            .then(function(results) {
                results.forEach(function(result) {
                    assert.equal(result.source,"195.130.83.160:210/ADVANCE");
                });
                done();
            })
            .catch(function(err) {
                console.log("Prob on function");
                done(err);
            });
    });

    it('Search invalid repo',function(done) {
        this.timeout(100000);

        var query = {'text':'Δομές',source:['invalid one']};

        sails.services.searchservice.search(query)
            .then(function(results) {
                done();
            })
            .catch(function(err) {
                console.log("Prob on function");
                done(err);
            });
    });

    it('Search invalid',function(done) {
        this.timeout(10000);

        var query = {'text':'Δομές','field':'nosuchfield','source':'oai'};

        SearchService.search(query)
            .then(function(results) {
                done();
            })
            .catch(function(err) {
                console.log("Prob on function");
                done(err);
            });
    });

    it('Search invalid oai field',function(done) {
        this.timeout(10000);

        var query = {};

        sails.services.searchservice.search(query)
            .then(function(results) {
                assert.equal(results.length,0);
                done();
            })
            .catch(function(err) {
                console.log("Prob on function");
                done(err);
            });
    });

    after(function(done) {
        sails.lower(done);
    });

});