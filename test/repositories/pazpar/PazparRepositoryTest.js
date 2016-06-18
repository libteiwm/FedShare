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

var PazParRepository = require('../../../api/repositories/pazpar/PazparRepository')
var assert = require('assert');

describe('PazParRepository',function() {

    var pazparRepository = new PazParRepository();

    it('Should create session successfully',function(done) {
        this.timeout(100000)

        pazparRepository.__createSession(function(err,session) {
            if(err) {
                done(err)
            } else {
                if(session) {
                    done()
                } else {
                    done(new Error('Session was not created'))
                }
            }
        })

    })

    it('Should check if it fetches records',function(done) {
        this.timeout(100000)

        pazparRepository.find("Σαπαλίδης",function(err,results) {

            if(err) {
                done(err);
            }

            if(results.length>0) {

                done();
            } else {
                done(new Error("Should have fetched results"));
            }
        });
    });

    it('Should fetch records from sepcific target',function(done) {
        this.timeout(100000)

        pazparRepository.findFromTarget("Java","195.130.83.165:210/ADVANCE",function(err,results) {

            if(err) {
                done(err);
            }

            if(results.length>0) {
                done()
            } else {
                done(new Error("There were no results at all"));
            }
        });
    });

    it('Should try to fetch empty results',function(done) {
        this.timeout(100000)

        pazparRepository.find("Μανιαμούνιας",function(err,results) {

            if(err) {
                done(err)
            } else {
                done(assert.equal(results.length,0))
            }
        });

    });

});
