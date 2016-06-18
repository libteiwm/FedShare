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

describe('Text Rank Sorter test',function() {

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

    var oaiRecord = {"_id":"55bbb89b7c898422a8ec3f0f",
        "identifier":"oai:anaktisis.teiwm.gr:126",
        "title":"Τραπεζικό μάρκετινγκ",
        "relation":"http://anaktisis.teiwm.gr/126/",
        "author":"Αναστασοπούλου, Κωνσταντίνα",
        "subject":"Τράπεζες και τραπεζικές εργασίες - Ανταγωνισμός",
        "description":"Διανύουμε το τέλος του αιώνα και μαζί με άλλες σαρωτικές αλλαγές στις οικονομίες οι" +
        " τράπεζες ζούνε και αυτές τη δική τους Οδύσσεια. Αναζητούν τη δική τους Ιθάκη μέσα από τις" +
        " τρικυμιές του ευρώ, τις αλλεπάλληλες συγχωνεύσεις, την εκμετάλλευση της τεχνολογίας και την " +
        "αξιοποίηση του Μάρκετινγκ . Οι πελάτες, ενώ παραπονιόνται για τις υπηρεσίες που τους προσφέρουν  " +
        "συνεχίζουν να επισκέπτονται τα υποκαταστήματα για τις συναλλαγές τους. Ο πελάτης προτιμά να επισκέπτεται " +
        "σαν ένα παλιό φίλο το υποκατάστημα της γειτονιάς του. Πολλοί πιστεύουν ότι η αύξηση του αριθμού των ΑΤΜ’ς  " +
        "καθιστά τα υποκαταστήματα λιγότερο απαραίτητα. Είναι όμως δύσκολο να βρει κανείς έστω και έναν καταναλωτή " +
        "που με αφορμή κάποιο σημαντικό γεγονός της ζωής του (σύνταξη, αγορά σπιτιού) δεν επισκέφτηκε μια Τράπεζα. " +
        "Εντύπωση, ωστόσο. προξενεί το γεγονός ότι, ακόμη και σήμερα, υπάρχουν τράπεζες που δε χρησιμοποιούν το " +
        "Μάρκετινγκ  για να εξακριβώσουν τι πραγματικά θέλει ο καταναλωτής και τι πρέπει να αλλάξουν σχετικά με " +
        "τα προϊόντα ή τις υπηρεσίες τους, ώστε να κερδίσουν μεγαλύτερο μερίδιο αγοράς.",
        "date":"2005",
        "type":["Thesis","NonPeerReviewed"],
        "stemmedTitle":["τραπεζ","μαρκετινγκ"],
        "stemmedSubject":["τραπεζ","και","τραπεζικ","εργασι","-","ανταγωνισμ"],
        "stemmedAuthor":["αναστασοπουλου,","κωνσταντιν"],
        "stemmedDescription":["διανυ","το","τελ","του","αιων","και","μαζ","με","αλλ","σαρωτικ","αλλαγ","στισ","οικονομι",
            "οι","τραπεζ","ζ","και","αυτ","τη","δικ","τ","οδυσσεια.","αναζητ","τη","δικ","τ","ιθακ","μεσ","απο","τισ",
            "τρικυμι","του","ευρω,","τισ","αλλεπαλληλ","συγχωνευσεισ,","την","εκμεταλλευσ","τησ","τεχνολογι","και",
            "την","αξιοποιησ","του","μαρκετινγκ",".","Οι","πελατεσ,","ενω","παραπονι","για","τισ","υπηρεσι","που",
            "τ","προσφερ","συνεχιζ","να","επισκεπτ","τα","υποκαταστημα","για","τισ","συναλλαγ","τουσ.","Ο","πελατ",
            "προτιμ","να","επισκεπτ","σαν","ενα","παλι","φιλ","το","υποκαταστημ","τησ","γειτονι","του.","πολλ",
            "πιστευ","οτι","η","αυξησ","του","αριθμ","των","ατμ’σ","","καθιστ","τα","υποκαταστημα","λιγ","απαραιτητα.",
            "εινα","ομωσ","δυσκολ","να","βρ","καν","εστ","και","εν","καταναλωτ","που","με","αφορμ","καποι",
            "σημαντ","γεγον","τησ","ζω","του","(συνταξη,","αγορ","σπιτιου)","δεν","επισκεφτ","μια","τραπεζα.",
            "εντυπωση,","ωστοσο.","προξεν","το","γεγον","οτι,","ακομ","και","σημερα,","υπαρχ","τραπεζ","που",
            "δε","χρησιμοποι","το","μαρκετινγκ","","για","να","εξακριβωσ","τι","πραγματ","θελ","ο","καταναλωτ",
            "και","τι","πρεπ","να","αλλαξ","σχετ","με","τα","προιοντ","η","τισ","υπηρεσι","τουσ,","ωστ","να","κερδισ",
            "μεγαλ","μεριδι","αγορασ."]};

    var pazparRecords = [
        {"title":"Μικρή χρηματοοικονομική λογιστική",
            "isbn":"960-02-0948-0",
            "localholdings":"TEI-DM, teikoz",
            "author":"Ντόμαλης, Ιωάννης Α",
            "subject":"Λογιστική κόστους",
            "availability":"Στο ραφι",
            "source":"195.130.83.160:210/ADVANCE",
            "catalog":"Κατάλογος ΚΟΖΑΝΗΣ"},
        {"title":"Μακροοικονομική ανοικτής οικονομίας",
            "isbn":"960-351-039-4",
            "localholdings":"TEI-DM, teikoz",
            "author":"Λεβεντάκης, Ιωάννης Α",
            "subject":"Μακροοικονομία Τραπεζας",
            "availability":"Στο ραφι",
            "source":"195.130.83.160:210/ADVANCE",
            "catalog":"Κατάλογος ΚΟΖΑΝΗΣ"}
    ];

    var recordList = [];
    recordList = recordList.concat(oaiRecord);
    recordList = recordList.concat(pazparRecords);

    it('Check The private sort',function() {

        var sorted = TextRankSorterService.sort("Τραπεζικα",recordList);

        assert.equal(sorted[0].identifier,"oai:anaktisis.teiwm.gr:126")
        assert.equal(sorted[1].isbn,"960-02-0948-0")
        assert.equal(sorted[2].isbn,"960-351-039-4")

        console.log("Check the records")
    });

    after(function(done) {
        sails.lower(done);
    });

});
