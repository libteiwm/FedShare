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
    StemDictionaryRepository = require('../../../api/repositories/oai/StemDictionaryRepository');


describe('StemDictionaryRepositoryTest',function() {

    var sails = new SailsApp();

    before(function(done) {
        this.timeout(50000);

        sails.lift({},
            function(err,server){
                if(err) {
                    done(err);
                } else {
                    done(err,sails);
                }
        });
    });

    it('testFindRecordsThatMatch',function(done) {

        StemDictionaryRepository.findRecordsThatMatch(['δομη'])
            .then(function(results) {

                assert.equal("δομη",results[0]._id);
                assert(results[0].oaiIds.length>0);
                done();
            })
            .catch(function(err){
                done(err);
            });

    });

    it('testFindRecordsThatMatchEmpty', function (done) {
        StemDictionaryRepository.findRecordsThatMatch([])
            .then(function(results) {
                assert(Array.isArray(results));
                assert.equal(0,results.length);
                done();
            })
            .catch(function(err){
                done(err);
            });
    });

    it('testFindRecordsThatMatchNone',function(done) {
        StemDictionaryRepository.findRecordsThatMatch()
            .then(function(results) {
                done(new Error("Expected error"));
            })
            .catch(function(err){
                done();
            });
    });

    it('testFindRecordsThatMatcInvalid',function(done) {
        StemDictionaryRepository.findRecordsThatMatch(123)
            .then(function(results) {
                done(new Error("Expected error"));
            })
            .catch(function(err){
                done();
            });
    });

    after(function (done) {
        sails.lower(done);
    });

});
