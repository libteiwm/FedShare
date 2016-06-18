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

var GreekStemmer = require('../stemmer/GreekStemmer');
var natural = require('natural')

var greekStemmer = new GreekStemmer();

module.exports = {

    stemmText : function(text) {
        var words = text.replace('  ',' ').split(' ')
        return this.stemmWords(words)
    },
    stemmWords : function(words) {

        var stemmedWords = []

        for(var i=0;i<words.length;i++) {
            var word = words[i]
            stemmedWords.push(this.stemmWord(word))
        }

        return stemmedWords
    },
    stemmWord : function(word) {

        word = greekStemmer.stem(word)
        word = natural.PorterStemmer.stem(word)

        return word
    }

}