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

var normalizeRecord = function(record) {

    var normalizedRecord = {}

    normalizedRecord.oaiId = record.eprintid[0]
    normalizedRecord.identifier = "oai:anaktisis.teiwm.gr:"+record.eprintid[0]
    normalizedRecord.relation = "http://anaktisis.teiwm.gr/"+record.eprintid[0]+"/"
    normalizedRecord.title = __getTitle(record)
    normalizedRecord.author = __getAuthor(record)
    normalizedRecord.subject = __getSubjects(record)
    normalizedRecord.description = __getDescription(record)
    normalizedRecord.date = __getDate(record)
    normalizedRecord.type = __getType(record)
    normalizedRecord.corpcreator = __getCorpCreator(record)
    normalizedRecord.url = __getURI(normalizedRecord.oaiId)

    return normalizedRecord
}

var __getTitle = function(record) {

    if(record.title&&record.title.length>0)
        return record.title[0]
}

var __getAuthor = function(record) {

    var author = ""

    if(!record.creators) {
        return
    }

    for(var i=0;i<record.creators.length;i++) {

        var creator = record.creators[i].item[0].name[0].family[0]+' '+record.creators[i].item[0].name[0].given[0]

        if(i>0) {
            author = author + "," + creator
        } else {
            author = creator
        }
    }

    return author
}

var __getSubjects = function(record) {

    if(!record||!record.subjects||
        !record.subjects.length>0||
        !record.subjects[0].item||
        !record.subjects[0].item.length>0) {
        return [];
    }

    var subjectNames = [];

    for(var i=0;i<record.subjects[0].item.length;i++) {

        var mongoRecord = record.subjects[0].item[i];
        if(mongoRecord.name) {
            subjectNames.push(mongoRecord.name);
        }
    }

    return subjectNames;
}

var __getDescription = function(record) {

    if(!record.abstract||!record.abstract.length>0) {
        return
    }

    return record.abstract[0]
}

var __getDate = function(record) {

    if(!record.date||!record.date.length>0) {
        return
    }

    return record.date[0]
}

var __getType = function (record) {

    if(!record.type&&!record.type.length>0) {
        return
    }

    return record.type = record.type[0]
}

var __getCorpCreator = function (record) {

    if(!record.corp_creators||record.corp_creators.length==0) {
        return
    }

    return record.corp_creators[0].item
}

var __getURI = function (oaiId) {

    return "http://anaktisis.teiwm.gr/"+oaiId
}

module.exports = {
    normalizeRecord: normalizeRecord
}
