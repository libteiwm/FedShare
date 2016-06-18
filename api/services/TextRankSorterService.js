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

var sort = function(stemmedWords,recordList) {

    var records = []

    for(var i=0;i<recordList.length;i++) {
        records = records.concat(recordList[i])
    }

    var valuedRecords = __sort(stemmedWords,records)

    var clearRecords = []

    for(var i=0;i<valuedRecords.length;i++) {

        var valuedRecord = valuedRecords[i]

        if(valuedRecord.record.record){
            clearRecords.push(valuedRecord.record.record);
        } else {
            clearRecords.push(valuedRecord.record)
        }
    }

    return clearRecords
}

var __sort = function(stemmedWords,records) {

    var termIdf = {}

    for(var i=0;i<stemmedWords.length;i++) {

        var term = stemmedWords[i]
        var idf = __idf(records,term)
        termIdf[term] = idf
    }

    var recordRanks = []

    for(var i=0;i<records.length;i++) {

        var record = records[i]

        var rank = __calculateTfIdf(termIdf,record)

        var recordRank = {}
        recordRank.rank = rank
        recordRank.record = record

        recordRanks.push(recordRank)
    }

    return __quickSortRecords(recordRanks)
}

var __tf = function(words,term) {

    var result = 0

    for(var i=0;i<words.length;i++) {

        var word = words[i]

        if(word.indexOf(term)!=-1) {
            result++
        }
    }

    return result/words.length
}

var __idf = function(records,term) {

    var result = 0

    for(var j=0;j<records.length;j++) {

        var record = records[j]

        var words = __getWords(record)

        for(var i=0;i<words.length;i++) {

            var word = words[i]

            if(word.indexOf(term)!=-1) {
                result++
                break
            }
        }
    }

    return Math.log(records.length/result)
}

var __calculateTfIdf = function(stemmedWords,wordIdf,record) {

    var tfidfSum = 0

    for(var i=0;i<stemmedWords.length;i++) {

        var stemmedWord = stemmedWords[i]
        var idf = wordIdf[stemmedWord]
        var tf = __tf(__getWords(record),stemmedWord)

        tfidfSum = tfidfSum+idf*tf
    }

    return tfidfSum
}

var __getWords = function(record) {

    if(__isParpar(record)) {
        return __pazparStemmedWords(record)
    } else if(__isOai(record)) {
        return __oaiStemmedWords(record)
    } else {
        return []
    }
}

var __quickSortRecords = function(recordRanks) {

    if(recordRanks.length == 0) {
        return []
    }

    var left =[], right = [], pivot = recordRanks[0]

    for(var i=1;i<recordRanks.length;i++) {

        var recordRank = recordRanks[i]

        var keyNum = recordRank.rank
        var pivotNum = pivot.rank

        keyNum>pivotNum? left.push(recordRanks[i]):right.push(recordRanks[i])
    }

    return __quickSortRecords(left).concat(pivot,__quickSortRecords(right))
}

var __isParpar = function(record) {
    return record.isbn
}

var __isOai = function(record) {
    return record.identifier
}

var __pazparStemmedWords = function(record) {

    var words = []

    if(record.title) words = words.concat(WordStemmerService.stemmText(record.title))
    if(record.subject) words = words.concat(WordStemmerService.stemmText(record.subject))

    return words
}

var __oaiStemmedWords = function(record) {

    var words = []
    if(record.stemmedTitle) words = words.concat(record.stemmedTitle)
    if(record.stemmedSubject) words = words.concat(record.stemmedSubject)
    if(record.stemmedAuthor) words = words.concat(record.stemmedAuthor)

    return words
}

module.exports = {

    sort: function(text,recordList) {

        var stemmedWords = WordStemmerService.stemmText(text);
        return sort(stemmedWords,recordList);
    }
}
