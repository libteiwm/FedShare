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
    assert = require('assert'),
    OaiRepository = require('../../../api/repositories/oai/OaiRepository');

describe('OaiRepositoryTest',function() {

    var sails = new SailsApp();

    before(function(done) {
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

    /*
    it('testFetchFromLast',function(done) {
        this.timeout(50000);
        OaiRepository.listFromLast()
            .then(function(results) {
                done();
            })
            .catch(function(error){
                done(error);
            });
    });

    it('checkTheRepo',function(done) {
        this.timeout(50000);

        OaiRepository.searchForTerms(['συγχρονοσ','ανθρωπινου'],{"title":true})
            .then(function(results) {
                assert.equal(100,results[0].record.oaiId);
                done();
            })
            .catch(function(err) {
                console.log("Check this error");
                done(err);
            });
    });

    it('checkTheRepoWithWrongArguements',function(done) {
        this.timeout(50000);

        OaiRepository.searchForTerms('dumpterm')
            .then(function(results) {
                done(new Error("Not quite expected"));
            })
            .catch(function(err){
                assert.deepEqual(err,new Error(""));
                done();
            });
    });

    it('checkTHeRepoWithEmptyOptions',function(done) {
        this.timeout(50000);

        OaiRepository.searchForTerms(['nosuchterm'],{})
            .then(function(results) {
                assert.equal(results.length,0);
                done();
            })
            .catch(function(err){
                done(err);
            });
    });

    it('testFetchLastRecord',function(done) {
        this.timeout(50000);

        OaiRepository.fetchLastRecord()
            .then(function(result) {

                done();
            })
            .catch(function(err) {
                done();
            });
    });

    it('test__fetchRecordList',function(done) {
        this.timeout(50000);

        OaiRepository.__fetchRecordList()
            .then(function(result) {
                assert(result.length>0);
                done();
            })
            .catch(function(error) {
                done(error);
            });

    });

    it('test__fetchRecord',function(done) {
        this.timeout(50000);

        OaiRepository.__fetchRecord(8099)
            .then(function(result) {

                done();
            })
            .catch(function(error) {
                done(error);
            });

    });

    it('test__fetchAndSaveSubjectFromEPrints',function(done) {
        this.timeout(50000);

        OaiRepository.__fetchAndSaveSubjectFromEPrints("AZ109",function(err,result) {
            if(err) {
                done(err);
            } else {
                done();
            }
        });
    });

    it('test__fetchAndSaveRecord', function (done) {
        this.timeout(50000);

        OaiRepository.__fetchAndSaveRecord(119,function(err,result) {

            if(err) {
                done(err);
            } else {
                done(null,result);
            }
        });
    });

    it('testFetchAndSaveRecords',function(done) {
        this.timeout(50000);

        OaiRepository.fetchAndSaveRecords(['8119','8118'])
            .then(function(result) {
                console.log("Pass");
                done();
            })
            .catch(function(error){
                console.log("There was another error");
                done(error);
            });
    });

    it('testRefreshRecords',function(done) {
        this.timeout(50000);

        OaiRepository.refreshRecords()
            .then(function(result) {
                console.log("The res are");
                done();
            })
            .catch(function(err){
                done(err);
            });
    });
     */

    it('testUpsertSubject',function(done) {
        this.timeout(50000);

        var subject = {"code":"A10", "name":"Adaptive learning"};

        OaiRepository.upsertSubject(subject)
            .then(function(results) {
                console.log("Saved table");
                done();
            })
            .catch(function(err) {
                done(err);
            })
    });


    after(function(done) {
       sails.lower(done);
    });

});
