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

var WordStemmerService = require('../../api/services/WordStemmerService')
var assert = require('assert')

describe('WordStemmerServiceTest',function() {

    beforeEach(function() {
    })

    it('Check English word',function() {
        var stems = WordStemmerService.stemmText('I saw reptiles last memorized')

        assert.equal('reptil',stems[2])
    })

    it('Check greek word',function() {

        var stems = WordStemmerService.stemmText('Για να κατανοήσεις')

        assert.equal('κατανοησ',stems[2])
    })

})
