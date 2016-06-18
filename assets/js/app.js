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

var appname = angular.module('SearchApp', ['pascalprecht.translate','ui.bootstrap','smart-table'])
    .directive('stRatio',function(){
        return {
            link:function(scope, element, attr){
                var ratio=+(attr.stRatio);

                element.css('width',ratio+'%');

            }
        };
    });;

appname.config(function($translateProvider) {
    $translateProvider
        .translations('en', {
            sitetitle:'Library | TEI of Western Macedonia - FedShare, Federated Search',
            headline:'FedShare',
            language:'Language',
            searchText:'Search',
            noResults:'No results found',
            allCheck:'All Sources',
            kozaniCheck:'Kozani',
            florinaCheck:'Florina',
            kastoriaCheck:'Kastoria',
            grevenaCheck:'Grevena',
            anaktisiCheck:'Thesis Papers',
            languageGreek:'Greek',
            languageEnglish:'English',
            fullSearch:'Full Search',
            searchButton:'Search',
            recordNum:'SN',
            title:'Title',
            author:'Author',
            supervisor:'Supervisor',
            subject:'Subject',
            description:'Description',
            date:'Year',
            allFields:'All Fields',
            searchFilters:'Search Filters',
            source:'Source',
            isbn:'ISBN Number',
            deweyNumber:'Dewey Number',
            availability:'Availability',
            uri:'Link',
            placeholder:'Search for Author, Title, Subject or Keywords',
            page:'Page',
            help:'Help',
            instructionTitle:'FedShare, a Federated Search Engine',
            instructionsone:'With FedShare, you can search all Libraries | TEI of Western Macedonia for Information Service Catalogues(Grevena, Kastoria, Kozani, Florina and the Academic Repository «@νάκτησις»).',
            instructionstwo:'Selecting "All Sources", you can search all "Catalogues" of GREVENA, KASTORIA, KOZANI, FLORINA and THESIS PAPERS. Alternatively, select individually a "Source" or a combination of them. "Search Filters" will limit the results, according to the selected criteria (Author, Supervisor, Title, Subject). The "Keywords" can be typed in greek or english language, Upper- or Lowercase, with or without punctuation.',
            instructionsthree:'Select the "Sources" first, type your "Keywords" into the "Searchbox" and click the "Search Button". After a while you will see the first Results Page (10 Entries per Page), the Paginated Result Pages the Total Records. From the Results Page, select the Entry you are interested in to see the Bibliographical Details and the Lending Status. If the Material is available, procceed with a Lending Request, either per Phone or Email.',
            instructionsfour:'Library | TEI of Western Macedonia',
            wrongInput:'Select a Source of Interest, a combination of them or All Sources',
            close:'Close',
            firstpage:'First Page',
            lastpage:'Last Page',
            totalRecords:'Total Records',
            recordNum:'R/N',
            clearButton:'Clear',
            magazine :'Magazine',
            infokozani:'Library of Kozani - Contact',
            infokastoria:'Library of kastoria - Contact',
            infogrevena:'Library of Grevena - Contact',
            infoflorina:'Library of Florina - Contact',
            tooltipFilter:'Taxonomy Criteria Selection',
            tooltipClear:'Refresh and Clear Search Results',
            tooltipSearch:'Search the selected Sources',
            tooltipAllsources:'Select All Sources',
            tooltipAnaktisis:'Select @νάκτησις Repository',
            tooltipGrevena:'Select Catalog of Grevena Library',
            tooltipKastoria:'Select Catalog of Kastoria Library',
            tooltipKozani:'Select Catalog of Kozani Library',
            tooltipFlorina:'Select Catalog of Florina Library'
        })
        .translations('el', {
            sitetitle:'Βιβλιοθήκη | Τ.Ε.Ι Δυτικής Μακεδονίας - FedShare, Ομόσπονδη Αναζήτηση',
            headline:'FedShare',
            language:'Γλώσσα',
            searchText:'Αναζήτηση',
            noResults:'Δεν βρέθηκαν εγγραφές',
            allCheck:'Όλες οι Πηγές',
            kozaniCheck:'Κοζάνη',
            florinaCheck:'Φλώρινα',
            kastoriaCheck:'Καστοριά',
            grevenaCheck:'Γρεβενά',
            anaktisiCheck:'Πτυχιακές',
            languageGreek:'Ελληνικά',
            languageEnglish:'Αγγλικά',
            fullSearch:'Πλήρης Αναζήτηση',
            searchButton:'Αναζήτηση',
            recordNum:'ΑΑ',
            title:'Τίτλος',
            author:'Συγγραφέας',
            supervisor:'Εισηγητής',
            subject:'Θέμα',
            description:'Περιγραφή',
            date:'Έτος',
            allFields:'Όλα τα πεδία',
            searchFilters:'Φίλτρα Αναζήτησης',
            source:'Πηγή',
            isbn:'Αριθμός ISBN',
            deweyNumber:'Αριθμός Dewey',
            availability:'Διαθεσιμότητα',
            uri:'Σύνδεσμος',
            placeholder:'Αναζήτηση για Συγγραφέα, Τίτλο, Θέμα ή Λέξεις-Κλειδιά',
            page:'Σελίδα',
            help:'Βοήθεια',
            instructionTitle:'FedShare, Μηχανή Ομόσπονδης Αναζήτησης',
            instructionsone:'Μέσω της διαδικτυακής εφαρμογής FedShare είναι εφικτή η αναζήτηση στο υλικό όλων των Ακαδημαϊκών Βιβλιοθηκών του Τ.Ε.Ι Δυτικής Μακεδονίας (Κατάλογοι Γρεβενών, Καστοριάς, Κοζάνης, Φλώρινας), καθώς και στο Ιδρυματικό Καταθετήριο Ακαδημαϊκών Δημοσιεύσεων «@νάκτησις».',
            instructionstwo:'Επιλέγοντας "Όλες τις Πηγές", αναζητήστε στους "Ψηφιακούς Καταλόγους - Συλλογές" των ΓΡΕΒΕΝΩΝ, ΚΑΣΤΟΡΙΑΣ, ΚΟΖΑΝΗΣ, ΦΛΩΡΙΝΑΣ, καθώς και στο ΙΔΡΥΜΑΤΙΚΟ ΚΑΤΑΘΕΤΗΡΙΟ @νάκτησις - ΠΤΥΧΙΑΚΕΣ. Εναλλακτικά, επιλέξτε μεμονωμένες "Πηγές" ή συνδυασμό αυτών. Τα "Φίλτρα Αναζήτησης" θα περιορίσουν τα σχετικά αποτελέσματα στα κυριότερα ευρετήρια (Συγγραφέας, Εισηγητής, Τίτλος, Θέμα). Οι "Λέξεις-Κλειδιά" που θα πληκτρολογήσετε στο πλαίσιο αναζήτησης μπορούν να είναι στην Ελληνική ή Αγγλική, πεζά ή κεφαλαία, με ή χωρίς τόνους.',
            instructionsthree:'Αφού πρώτα διαλέξετε τις Πηγές και πληκτρολογήσετε το κείμενο προς αναζήτηση, επιλέξτε το εικονίδιο αναζήτησης. Σύντομα, στα αποτελέσματα, εμφανίζονται οι πρώτες 10 εγγραφές, ο συνολικός αριθμός αποτελεσμάτων και ο διαχωρισμός τους σε σελίδες των 10 εγγραφών. Επιλέγοντας την εγγραφή που σας ενδιαφέρει, θα εμφανιστούν οι βιβλιογραφικές λεπτομέρειες και η κατάσταση δανεισμού. Αν το υλικό βρίσκεται "Στο ράφι", προχωρήστε άμεσα σε αίτημα δανεισμού μέσω τηλεφώνου ή μηνύματος ηλεκτρονικού ταχυδρομείου.',
            instructionsfour:'Βιβλιοθήκη | Τ.Ε.Ι Δυτικής Μακεδονίας',
            wrongInput:'Επιλέξτε την Πηγή που σας ενδιαφέρει, συνδυασμό αυτών ή Όλες τις Πηγές',
            close:'Κλείσιμο',
            firstpage:'Πρώτη Σελίδα',
            lastpage: 'Τελευταία Σελίδα',
            totalRecords:'Συνολικές Εγγραφές',
            recordNum:'Α/Α',
            clearButton:'Εκκαθάριση',
            magazine:'Περιοδικό',
            infokozani:'Βιβλιοθήκη Κοζάνης - Επικοινωνία',
            infokastoria:'Βιβλιοθήκη Καστοριάς - Επικοινωνία',
            infogrevena:'Βιβλιοθήκη Γρεβενών - Επικοινωνία',
            infoflorina:'Βιβλιοθήκη Φλώρινας - Επικοινωνία',
            tooltipFilter:'Επιλογή Κριτηρίου Ταξινόμησης',
            tooltipClear:'Ανανέωση και Εκκαθάριση Αποτελεσμάτων',
            tooltipSearch:'Αναζήτηση στις επιλεγμένες Πηγές',
            tooltipAllsources:'Αναζήτηση Όλων των Πηγών',
            tooltipAnaktisis:'Επιλογή του Ιδρυματικού Καταθετηρίου @νάκτησις',
            tooltipGrevena:'Επιλογή του Καταλόγου Βιβλιοθήκης Γρεβενών',
            tooltipKastoria:'Επιλογή του Καταλόγου Βιβλιοθήκης Καστοριάς',
            tooltipKozani:'Επιλογή του Καταλόγου Βιβλιοθήκης Κοζάνης',
            tooltipFlorina:'Επιλογή του Καταλόγου Βιβλιοθήκης Φλώρινας'
        })

    $translateProvider.preferredLanguage('el')
})

appname.controller('SearchController', function($scope,$http) {

        $scope.itemsByPage=15;
        $scope.searchCollection = [];
        $scope.isLoading = false;
        $scope.isCollapsed = true;
        $scope.displayedCollection = [].concat($scope.searchCollection);
        $scope.greeting = { text: 'Hello' };
        $scope.selectedRecord = {};
        $scope.alerts = [];
        $scope.fields = "all";

        $scope.checkModel = {
            all:false,
            kozani:false,
            florina:false,
            kastoria:false,
            grevena:false,
            anaktisi:false
        }

        $scope.clear = function() {

            $scope.isCollapsed = true
            $scope.checkModel.all
            $scope.searchCollection = []
            $scope.searchText = ''
            $scope.fullSearch = false
            $scope.checkModel.all =false
            $scope.checkModel.kozani =false
            $scope.checkModel.florina = false
            $scope.checkModel.kastoria = false
            $scope.checkModel.grevena = false
            $scope.checkModel.anaktisi =false
        }

        $scope.search = function() {

            if(($scope.checkModel.all==false&&
                $scope.checkModel.kozani==false&&
                $scope.checkModel.florina==false&&
                $scope.checkModel.kastoria==false&&
                $scope.checkModel.grevena==false&&
                $scope.checkModel.anaktisi==false)||(!$scope.searchText||$scope.searchText=='')) {
                $scope.alerts.push({msg: 'wrongInput',type: 'danger'});
                return;
            }

            $scope.searchCollection = []
            $scope.isCollapsed = true

            var query = $scope.createQuery()

            $scope.isLoading = true

            $http.get('record/find', {params:query}
            ).success(
                function(data, status, headers, config) {

                    $scope.isLoading = false

                    if(data.length==0) {
                        $scope.alerts.push({msg: 'noResults',type: 'danger'});
                    } else {
                        $scope.populateTable(data);
                    }
                }
            ).error(
                function(data, status, headers, config) {

                    $scope.isLoading = false
                }
            );
        }

        $scope.createQuery = function() {

            var query = {}

            query.text = $scope.searchText

            query.type = "fullsearch"

            if(!$scope.checkModel.all) {

                query.type = "advanced"

                var source = []
                if($scope.checkModel.anaktisi) {
                    source.push("oai")
                }
                if($scope.checkModel.florina) {
                    source.push("florina")
                }
                if($scope.checkModel.grevena) {
                    source.push("grevena")
                }
                if($scope.checkModel.kastoria) {
                    source.push("kastoria")
                }
                if($scope.checkModel.kozani) {
                    source.push("kozani")
                }

                query.source = source
            }

            query.type = $scope.fields;

            return query
        }

        $scope.populateTable = function(data) {

            $scope.searchCollection = []

            for(var i=0;i<data.length;i++) {

                var record = data[i]

                var searchRecord = {}

                searchRecord.title = record.title
                searchRecord.author = record.author

                searchRecord.supervisor = $scope.arrayToString(record,"corpcreator");

                record.subject = $scope.arrayToString(record,"subject");


                searchRecord.subject = $scope.arrayToString(record,"subject");



                searchRecord.date = record.date
                if(record.catalog) {
                    searchRecord.source = record.catalog
                } else {
                    searchRecord.source = 'Ανάκτησις'
                }

                searchRecord.magazine = record.magazine
                searchRecord.record = record
                searchRecord.record.supervisor = searchRecord.supervisor
                searchRecord.number = i+1

                $scope.searchCollection.push(searchRecord)
            }
        }

        $scope.createSubject = function(record) {

            if(!record.subject||record.subject.length==0) {
                return;
            }

            var subject = "";

            for(var i=0;i<record.subject.length;i++) {
                sub
            }

        };

        $scope.arrayToString = function(record,key) {

            if(!record[key]||record[key].length==0) {
                return
            }

            var arrayStr = ""


            var values = record[key];

            values = [].concat(values);

            for(var i=0;i<values.length;i++) {

                if(values[i]) {
                    arrayStr = arrayStr + ", " + values[i];
                }
            }

            arrayStr = arrayStr.replace(", ","")

            return arrayStr
        }

        $scope.$watch(function(){
            return $scope.searchCollection;
        },function(searchCollection){
            if (searchCollection)
            {
                self.displayedCollection = searchCollection
            }
            else{
                $scope.displayedCollection = []
            }
        })

        $scope.$watch(function(){
            return $scope.displayedCollection;
        }, function(row) {
            row.filter(function(r) {
                if (r.isSelected) {
                    $scope.isCollapsed = false

                    $scope.selectedRecord = r.record
                }
            })
        }, true)

        $scope.$watch('checkModel.all', function () {

            if($scope.checkModel.all==true) {
                $scope.checkModel.kozani = false
                $scope.checkModel.florina = false
                $scope.checkModel.kastoria = false
                $scope.checkModel.grevena = false
                $scope.checkModel.anaktisi = false
            }
        })

        $scope.$watch('checkModel.kozani', function () {
            if($scope.checkModel.kozani==true) $scope.checkModel.all=false
        })

        $scope.$watch('checkModel.florina', function () {
            if($scope.checkModel.florina==true) $scope.checkModel.all=false
        })

        $scope.$watch('checkModel.kastoria', function () {
            if($scope.checkModel.kastoria==true) $scope.checkModel.all=false
        })

        $scope.$watch('checkModel.grevena', function () {
            if($scope.checkModel.grevena==true) $scope.checkModel.all=false
        })
        $scope.$watch('checkModel.anaktisi', function () {
            if($scope.checkModel.anaktisi==true) $scope.checkModel.all=false
        })

        $scope.closeAlert = function(index) {
            $scope.alerts.splice(index, 1);
        };
    }
);

appname.controller('helpCtrl', function ($scope, $modalInstance) {

    $scope.ok = function () {
        $modalInstance.close();
    };
})

appname.controller('TranslateController', function($translate, $scope) {
    $scope.changeLanguage = function (langKey) {
        $translate.use(langKey);
    };

});

appname.controller('ScrollCtrl', function($scope, $location, $anchorScroll) {
    $scope.scrollTo = function(id) {
        $location.hash(id);
        $anchorScroll();
    };
});
