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

function PazparResultExtractor(jsonResults) {

    var listRecords = this.__fetchListRecordsArray(jsonResults);

    this.normaLizedRecords = this.__normalizeRecords(listRecords);
}

PazparResultExtractor.prototype.recordsMatching = function(searchText) {
    return this.normaLizedRecords;
}


PazparResultExtractor.prototype.__fetchListRecordsArray = function(jsonResults) {
    try {

        var listRecords = []

        for(var i=0;i<jsonResults.length;i++) {
            var jsonResult = jsonResults.pop()
            var hits = this.__getHitResult(jsonResult);
            if(hits) {
                listRecords = listRecords.concat(hits)
            }
        }

        return listRecords

    } catch (e) {
        return []
    }
}

PazparResultExtractor.prototype.__getHitResult = function(jsonResult) {
    if(jsonResult) {
        var showResult = jsonResult['show']
        if (showResult) {
            var hits = showResult['hit'];
            if (hits) {
                return hits;
            }
        }
    }
}

PazparResultExtractor.prototype.__normalizeRecords = function(listRecords) {

    var normalizedRecords = []

    for(var i=0;i<listRecords.length;i++) {
        var record = this.__normalizeRecord(listRecords[i])
        normalizedRecords.push(record)
    }

    return normalizedRecords;
}

PazparResultExtractor.prototype.__normalizeRecord = function(record) {

    var normalizedRecord = {}

    this.__setTitle(record,normalizedRecord)
    this.__setISBN(record,normalizedRecord)
    this.__setLocalHoldings(record,normalizedRecord)
    this.__setRelation(record,normalizedRecord)
    this.__setAuthor(record,normalizedRecord)
    this.__setSubject(record,normalizedRecord)
    this.__setDescription(record,normalizedRecord)
    this.__setDate(record,normalizedRecord)
    this.__setAvailability(record,normalizedRecord)
    this.__setSourceLocation(record,normalizedRecord)
    this.__setCatalog(record,normalizedRecord)
    this.__setMagazine(record,normalizedRecord)
    this.__setDeweyNumber(record,normalizedRecord)

    return normalizedRecord;
}

/**
 * Title is pretty much the same with title
 * @param record
 * @param normalizedRecord
 * @private
 */
PazparResultExtractor.prototype.__setTitle = function(record,normalizedRecord) {

    if(record['md-title']&&record['md-title'].length>0) {
        var title = record['md-title'].pop()
        normalizedRecord['title'] = title
    }
}

PazparResultExtractor.prototype.__setMagazine = function(record,normalizedRecord) {

    if(record['md-magazine']&&record['md-magazine'].length>0) {
        normalizedRecord.magazine = true
    } else {
        normalizedRecord.magazine = false
    }

}

PazparResultExtractor.prototype.__setISBN = function(record,normalizedRecord) {
    if(record['md-isbn']&&record['md-isbn'].length>0) {
        var title = record['md-isbn'].pop()
        normalizedRecord['isbn'] = title
    }
}

PazparResultExtractor.prototype.__setLocalHoldings = function(record,normalizedRecord) {
    if(record['md-localholdings']&&record['md-localholdings'].length>0) {
        var title = record['md-localholdings'].pop()
        normalizedRecord['localholdings'] = title.replace('GrTEIGrevena','Grevena')
    }
}

PazparResultExtractor.prototype.__setRelation = function(record,normalizedRecord) {
}

PazparResultExtractor.prototype.__setAuthor = function(record,normalizedRecord) {
    if(record['md-author']&&record['md-author'].length>0) {
        var author = record['md-author'].pop()
        normalizedRecord['author'] = author
    }
}

PazparResultExtractor.prototype.__setSubject = function(record,normalizedRecord) {
    if (record['md-subject'] && record['md-subject'].length > 0) {
        var subject = record['md-subject'].pop()
        normalizedRecord['subject'] = subject;
    }
}
PazparResultExtractor.prototype.__setDescription = function(record,normalizedRecord) {
}

PazparResultExtractor.prototype.__setDate = function(record,normalizedRecord) {
    if(record['md-date']&&record['md-date'].length>0) {
        normalizedRecord['date'] = record['md-date'].pop()
    }
}

PazparResultExtractor.prototype.__setAvailability = function(record,normalizedRecord) {
    if(record['md-availability']&&record['md-availability'].length>0) {
        normalizedRecord['availability'] = record['md-availability'].pop()
    }
}

PazparResultExtractor.prototype.__setSourceLocation = function(record,normalizeRecord) {
    if(record['location']&&record['location'].length>0) {
        var resource = record['location'][0];
        normalizeRecord['source'] = resource['$']['id'];
    }
}

PazparResultExtractor.prototype.__setCatalog = function(record,normalizeRecord) {
    if(record['location']&&record['location'].length>0) {
        var resource = record['location'][0];
        normalizeRecord['catalog'] = resource['$']['name'];
    }
}

PazparResultExtractor.prototype.__setDeweyNumber = function(record,normalizedRecord) {

    if(record['md-deweynumber']&&record['md-deweynumber'].length>0) {
        normalizedRecord['deweynumber'] = record['md-deweynumber'].pop()
    }
}

module.exports = PazparResultExtractor
