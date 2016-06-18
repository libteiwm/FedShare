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

function GreekStemmer() {
}

GreekStemmer.prototype.toned = {

}

GreekStemmer.prototype.__accentedCharacterMap = {
    'ά':'α',
    'έ':'ε',
    'ή':'η',
    'ί':'ι',
    'ό':'ο',
    'ύ':'υ',
    'ώ':'ω',
    'ΰ': 'υ',
    'ϋ': 'υ',
    'ϊ': 'ι',
    'ΐ': 'ι'
}

GreekStemmer.prototype.exc4 = ["θ", "δ", "ελ", "γαλ", "ν", "π", "ιδ", "παρ"]

GreekStemmer.prototype.exc6 = ["αλ", "αδ", "ενδ", "αμαν", "αμμοχαλ", "ηθ", "ανηθ",
    "αντιδ", "φυσ", "βρωμ", "γερ", "εξωδ", "καλπ", "καλλιν", "καταδ",
    "μουλ", "μπαν", "μπαγιατ", "μπολ", "μποσ", "νιτ", "ξικ", "συνομηλ",
    "πετσ", "πιτσ", "πικαντ", "πλιατσ", "ποστελν", "πρωτοδ", "σερτ",
    "συναδ", "τσαμ", "υποδ", "φιλον", "φυλοδ", "χασ"]

GreekStemmer.prototype.exc7 = ["αναπ", "αποθ", "αποκ", "αποστ", "βουβ", "ξεθ", "ουλ",
    "πεθ", "πικρ", "ποτ", "σιχ", "χ"]

GreekStemmer.prototype.exc8a = ["τρ", "τσ"]

GreekStemmer.prototype.exc8b = ["βετερ", "βουλκ", "βραχμ", "γ", "δραδουμ", "θ", "καλπουζ",
    "καστελ", "κορμορ", "λαοπλ", "μωαμεθ", "μ", "μουσουλμ", "ν", "ουλ",
    "π", "πελεκ", "πλ", "πολισ", "πορτολ", "σαρακατσ", "σουλτ",
    "τσαρλατ", "ορφ", "τσιγγ", "τσοπ", "φωτοστεφ", "χ", "ψυχοπλ", "αγ",
    "ορφ", "γαλ", "γερ", "δεκ", "διπλ", "αμερικαν", "ουρ", "πιθ",
    "πουριτ", "σ", "ζωντ", "ικ", "καστ", "κοπ", "λιχ", "λουθηρ", "μαιντ",
    "μελ", "σιγ", "σπ", "στεγ", "τραγ", "τσαγ", "φ", "ερ", "αδαπ",
    "αθιγγ", "αμηχ", "ανικ", "ανοργ", "απηγ", "απιθ", "ατσιγγ", "βασ",
    "βασκ", "βαθυγαλ", "βιομηχ", "βραχυκ", "διατ", "διαφ", "ενοργ",
    "θυσ", "καπνοβιομηχ", "καταγαλ", "κλιβ", "κοιλαρφ", "λιβ",
    "μεγλοβιομηχ", "μικροβιομηχ", "νταβ", "ξηροκλιβ", "ολιγοδαμ",
    "ολογαλ", "πενταρφ", "περηφ", "περιτρ", "πλατ", "πολυδαπ", "πολυμηχ",
    "στεφ", "ταβ", "τετ", "υπερηφ", "υποκοπ", "χαμηλοδαπ", "ψηλοταβ"]

GreekStemmer.prototype.exc9 = ["αβαρ", "βεν", "εναρ", "αβρ", "αδ", "αθ", "αν", "απλ",
    "βαρον", "ντρ", "σκ", "κοπ", "μπορ", "νιφ", "παγ", "παρακαλ", "σερπ",
    "σκελ", "συρφ", "τοκ", "υ", "δ", "εμ", "θαρρ", "θ"]

GreekStemmer.prototype.exc12a = ["π", "απ", "συμπ", "ασυμπ", "ακαταπ", "αμεταμφ"]

GreekStemmer.prototype.exc12b = ["αλ", "αρ", "εκτελ", "ζ", "μ", "ξ", "παρακαλ", "αρ", "προ", "νισ"]

GreekStemmer.prototype.exc13 = ["διαθ", "θ", "παρακαταθ", "προσθ", "συνθ"]

GreekStemmer.prototype.exc14 = ["φαρμακ", "χαδ", "αγκ", "αναρρ", "βρομ", "εκλιπ", "λαμπιδ",
    "λεχ", "μ", "πατ", "ρ", "λ", "μεδ", "μεσαζ", "υποτειν", "αμ", "αιθ",
    "ανηκ", "δεσποζ", "ενδιαφερ", "δε", "δευτερευ", "καθαρευ", "πλε",
    "τσα"]

GreekStemmer.prototype.exc15a = ["αβαστ", "πολυφ", "αδηφ", "παμφ", "ρ", "ασπ", "αφ", "αμαλ",
    "αμαλλι", "ανυστ", "απερ", "ασπαρ", "αχαρ", "δερβεν", "δροσοπ",
    "ξεφ", "νεοπ", "νομοτ", "ολοπ", "ομοτ", "προστ", "προσωποπ", "συμπ",
    "συντ", "τ", "υποτ", "χαρ", "αειπ", "αιμοστ", "ανυπ", "αποτ",
    "αρτιπ", "διατ", "εν", "επιτ", "κροκαλοπ", "σιδηροπ", "λ", "ναυ",
    "ουλαμ", "ουρ", "π", "τρ", "μ"]

GreekStemmer.prototype.exc15b = ["ψοφ", "ναυλοχ"]

GreekStemmer.prototype.exc16 = ["ν", "χερσον", "δωδεκαν", "ερημον", "μεγαλον", "επταν"]

GreekStemmer.prototype.exc17 = ["ασβ", "σβ", "αχρ", "χρ", "απλ", "αειμν", "δυσχρ", "ευχρ", "κοινοχρ", "παλιμψ"]

GreekStemmer.prototype.exc18 = ["ν", "ρ", "σπι", "στραβομουτσ", "κακομουτσ", "εξων"]

GreekStemmer.prototype.exc19 = ["παρασουσ", "φ", "χ", "ωριοπλ", "αζ", "αλλοσουσ", "ασουσ"]

GreekStemmer.prototype.stem = function(s) {

    var len = s.length

    s = this.__replaceAccentedCharacters(s)
    s = this.__replaceSigma(s)

    if(len<4) {
        return s
    }

    var originalLen = len

    len = this.rule0(s, len);
    len = this.rule1(s, len);
    len = this.rule2(s, len);
    len = this.rule3(s, len);
    len = this.rule4(s, len);
    len = this.rule5(s, len);
    len = this.rule6(s, len);
    len = this.rule7(s, len);
    len = this.rule8(s, len);
    len = this.rule9(s, len);
    len = this.rule10(s, len);
    len = this.rule11(s, len);
    len = this.rule12(s, len);
    len = this.rule13(s, len);
    len = this.rule14(s, len);
    len = this.rule15(s, len);
    len = this.rule16(s, len);
    len = this.rule17(s, len);
    len = this.rule18(s, len);
    len = this.rule19(s, len);
    len = this.rule20(s, len);
    // "long list"
    if (len == originalLen)
        len = this.rule21(s, len);

    var point = this.rule22(s, len);

    return s.substring(0,point)
}

GreekStemmer.prototype.rule0  = function(s,len) {

    if (len > 9 && (this.endsWith(s, len, "καθεστωτοσ")
        || this.endsWith(s, len, "καθεστωτων")))
        return len - 4

    if (len > 8 && (this.endsWith(s, len, "γεγονοτοσ")
        || this.endsWith(s, len, "γεγονοτων")))
        return len - 4

    if (len > 8 && this.endsWith(s, len, "καθεστωτα"))
        return len - 3

    if (len > 7 && (this.endsWith(s, len, "τατογιου")
        || this.endsWith(s, len, "τατογιων")))
        return len - 4

    if (len > 7 && this.endsWith(s, len, "γεγονοτα"))
        return len - 3

    if (len > 7 && this.endsWith(s, len, "καθεστωσ"))
        return len - 2

    if (len > 6 && (this.endsWith(s, len, "σκαγιου"))
        || this.endsWith(s, len, "σκαγιων")
        || this.endsWith(s, len, "ολογιου")
        || this.endsWith(s, len, "ολογιων")
        || this.endsWith(s, len, "κρεατοσ")
        || this.endsWith(s, len, "κρεατων")
        || this.endsWith(s, len, "περατοσ")
        || this.endsWith(s, len, "περατων")
        || this.endsWith(s, len, "τερατοσ")
        || this.endsWith(s, len, "τερατων"))
        return len - 4

    if (len > 6 && this.endsWith(s, len, "τατογια"))
        return len - 3

    if (len > 6 && this.endsWith(s, len, "γεγονοσ"))
        return len - 2

    if (len > 5 && (this.endsWith(s, len, "φαγιου")
        || this.endsWith(s, len, "φαγιων")
        || this.endsWith(s, len, "σογιου")
        || this.endsWith(s, len, "σογιων")))
        return len - 4

    if (len > 5 && (this.endsWith(s, len, "σκαγια")
        || this.endsWith(s, len, "ολογια")
        || this.endsWith(s, len, "κρεατα")
        || this.endsWith(s, len, "περατα")
        || this.endsWith(s, len, "τερατα")))
        return len - 3

    if (len > 4 && (this.endsWith(s, len, "φαγια")
        || this.endsWith(s, len, "σογια")
        || this.endsWith(s, len, "φωτοσ")
        || this.endsWith(s, len, "φωτων")))
        return len - 3

    if (len > 4 && (this.endsWith(s, len, "κρεασ")
        || this.endsWith(s, len, "περασ")
        || this.endsWith(s, len, "τερασ")))
        return len - 2

    if (len > 3 && this.endsWith(s, len, "φωτα"))
        return len - 2

    if (len > 2 && this.endsWith(s, len, "φωσ"))
        return len - 1

    return len
}

GreekStemmer.prototype.rule1 = function(s,len) {
    if (len > 4 && (this.endsWith(s, len, "αδεσ") || this.endsWith(s, len, "αδων"))) {
        len -= 4
        if (!(this.endsWith(s, len, "οκ") ||
            this.endsWith(s, len, "μαμ") ||
            this.endsWith(s, len, "μαν") ||
            this.endsWith(s, len, "μπαμπ") ||
            this.endsWith(s, len, "πατερ") ||
            this.endsWith(s, len, "γιαγι") ||
            this.endsWith(s, len, "νταντ") ||
            this.endsWith(s, len, "κυρ") ||
            this.endsWith(s, len, "θει") ||
            this.endsWith(s, len, "πεθερ")))
            len += 2
    }
    return len
}

GreekStemmer.prototype.rule2 = function(s,len) {
    if (len > 4 && (this.endsWith(s, len, "εδεσ") || this.endsWith(s, len, "εδων"))) {
        len -= 4
        if (this.endsWith(s, len, "οπ") ||
            this.endsWith(s, len, "ιπ") ||
            this.endsWith(s, len, "εμπ") ||
            this.endsWith(s, len, "υπ") ||
            this.endsWith(s, len, "γηπ") ||
            this.endsWith(s, len, "δαπ") ||
            this.endsWith(s, len, "κρασπ") ||
            this.endsWith(s, len, "μιλ"))
            len += 2
    }
    return len
}

GreekStemmer.prototype.rule3 = function(s,len) {
    if (len > 5 && (this.endsWith(s, len, "ουδεσ") || this.endsWith(s, len, "ουδων"))) {
        len -= 5
        if (this.endsWith(s, len, "αρκ") ||
            this.endsWith(s, len, "καλιακ") ||
            this.endsWith(s, len, "πεταλ") ||
            this.endsWith(s, len, "λιχ") ||
            this.endsWith(s, len, "πλεξ") ||
            this.endsWith(s, len, "σκ") ||
            this.endsWith(s, len, "σ") ||
            this.endsWith(s, len, "φλ") ||
            this.endsWith(s, len, "φρ") ||
            this.endsWith(s, len, "βελ") ||
            this.endsWith(s, len, "λουλ") ||
            this.endsWith(s, len, "χν") ||
            this.endsWith(s, len, "σπ") ||
            this.endsWith(s, len, "τραγ") ||
            this.endsWith(s, len, "φε"))
            len += 3
    }
    return len
}

GreekStemmer.prototype.rule4 = function(s,len) {

    if(len>3 && (this.endsWith(s,len,"εωσ") || this.endsWith(s,len,"εων"))) {
        len -= 3

        if(this.__contains(s,0,len,this.exc4))
            len++
    }

    return len
}

GreekStemmer.prototype.rule5 = function(s,len) {
    if (len > 2 && this.endsWith(s, len, "ια")) {
        len -= 2
        if (this.endsWithVowel(s, len))
            len++ // add back -ι
    } else if (len > 3 && (this.endsWith(s, len, "ιου") || this.endsWith(s, len, "ιων"))) {
        len -= 3
        if (this.endsWithVowel(s, len))
            len++ // add back -ι
    }
    return len
}

GreekStemmer.prototype.rule6 = function(s,len) {

    var removed = false;

    if (len > 3 && (this.endsWith(s, len, "ικα") || this.endsWith(s, len, "ικο"))) {
        len -= 3
        removed = true
    } else if (len > 4 && (this.endsWith(s, len, "ικου") || this.endsWith(s, len, "ικων"))) {
        len -= 4
        removed = true
    }

    if (removed) {
        if (this.endsWithVowel(s, len) || this.__contains(s, 0, len,this.exc6))
            len += 2 // add back -ικ
    }
    return len
}

GreekStemmer.prototype.rule7 = function(s,len) {

    if (len == 5 && this.endsWith(s, len, "αγαμε"))
        return len - 1

    if (len > 7 && this.endsWith(s, len, "ηθηκαμε"))
        len -= 7
    else if (len > 6 && this.endsWith(s, len, "ουσαμε"))
        len -= 6
    else if (len > 5 && (this.endsWith(s, len, "αγαμε") ||
        this.endsWith(s, len, "ησαμε") ||
        this.endsWith(s, len, "ηκαμε")))
        len -= 5

    if (len > 3 && this.endsWith(s, len, "αμε")) {
        len -= 3
        if (this.__contains(s, 0, len,this.exc7))
            len += 2 // add back -αμ
    }

    return len
}

GreekStemmer.prototype.rule8 = function(s,len) {

    var removed = false

    if (len > 8 && this.endsWith(s, len, "ιουντανε")) {

        len -= 8
        this.removed = true
    } else if (len > 7 && this.endsWith(s, len, "ιοντανε") ||

        this.endsWith(s, len, "ουντανε") ||
        this.endsWith(s, len, "ηθηκανε")) {
        len -= 7;
        removed = true
    } else if (len > 6 && this.endsWith(s, len, "ιοτανε") ||

        this.endsWith(s, len, "οντανε") ||
        this.endsWith(s, len, "ουσανε")) {
        len -= 6
        removed = true
    } else if (len > 5 && this.endsWith(s, len, "αγανε") ||
        this.endsWith(s, len, "ησανε") ||
        this.endsWith(s, len, "οτανε") ||
        this.endsWith(s, len, "ηκανε")) {
        len -= 5
        removed = true
    }

    if (removed && this.__contains(s, 0, len,this.exc8a)) {
        // add -αγαν (we removed > 4 chars so it's safe)
        len += 4
        s[len - 4] = 'α'
        s[len - 3] = 'γ'
        s[len - 2] = 'α'
        s[len - 1] = 'ν'
    }

    if (len > 3 && this.endsWith(s, len, "ανε")) {
        len -= 3
        if (this.endsWithVowelNoY(s, len) || this.__contains(s, 0, len,this.exc8b)) {
            len += 2 // add back -αν
        }
    }

    return len;
}

GreekStemmer.prototype.rule9 = function(s,len) {

    if (len > 5 && this.endsWith(s, len, "ησετε"))
        len -= 5

    if (len > 3 && this.endsWith(s, len, "ετε")) {
        len -= 3

        if (this.__contains(s, 0, len,this.exc9) ||
            this.endsWithVowelNoY(s, len) ||
            this.endsWith(s, len, "οδ") ||
            this.endsWith(s, len, "αιρ") ||
            this.endsWith(s, len, "φορ") ||
            this.endsWith(s, len, "ταθ") ||
            this.endsWith(s, len, "διαθ") ||
            this.endsWith(s, len, "σχ") ||
            this.endsWith(s, len, "ενδ") ||
            this.endsWith(s, len, "ευρ") ||
            this.endsWith(s, len, "τιθ") ||
            this.endsWith(s, len, "υπερθ") ||
            this.endsWith(s, len, "ραθ") ||
            this.endsWith(s, len, "ενθ") ||
            this.endsWith(s, len, "ροθ") ||
            this.endsWith(s, len, "σθ") ||
            this.endsWith(s, len, "πυρ") ||
            this.endsWith(s, len, "αιν") ||
            this.endsWith(s, len, "συνδ") ||
            this.endsWith(s, len, "συν") ||
            this.endsWith(s, len, "συνθ") ||
            this.endsWith(s, len, "χωρ") ||
            this.endsWith(s, len, "πον") ||
            this.endsWith(s, len, "βρ") ||
            this.endsWith(s, len, "καθ") ||
            this.endsWith(s, len, "ευθ") ||
            this.endsWith(s, len, "εκθ") ||
            this.endsWith(s, len, "νετ") ||
            this.endsWith(s, len, "ρον") ||
            this.endsWith(s, len, "αρκ") ||
            this.endsWith(s, len, "βαρ") ||
            this.endsWith(s, len, "βολ") ||
            this.endsWith(s, len, "ωφελ")) {
            len += 2 // add back -ετ
        }
    }

    return len
}

GreekStemmer.prototype.rule10 = function(s,len) {

    if (len > 5 && (this.endsWith(s, len, "οντασ") || this.endsWith(s, len, "ωντασ"))) {
        len -= 5
        if (len == 3 && this.endsWith(s, len, "αρχ")) {
            len += 3 // add back *ντ
            s[len - 3] = 'ο'
        }
        if (this.endsWith(s, len, "κρε")) {
            len += 3 // add back *ντ
            s[len - 3] = 'ω'
        }
    }

    return len
}

GreekStemmer.prototype.rule11 = function(s,len) {
    if (len > 6 && this.endsWith(s, len, "ομαστε")) {
        len -= 6
        if (len == 2 && this.endsWith(s, len, "ον")) {
            len += 5 // add back -ομαστ
        }
    } else if (len > 7 && this.endsWith(s, len, "ιομαστε")) {
        len -= 7
        if (len == 2 && this.endsWith(s, len, "ον")) {
            len += 5
            s[len - 5] = 'ο'
            s[len - 4] = 'μ'
            s[len - 3] = 'α'
            s[len - 2] = 'σ'
            s[len - 1] = 'τ'
        }
    }
    return len
}

GreekStemmer.prototype.rule12 = function(s,len) {

    if (len > 5 && this.endsWith(s, len, "ιεστε")) {
        len -= 5
        if (this.__contains(s, 0, len,this.exc12a))
            len += 4 // add back -ιεστ
    }

    if (len > 4 && this.endsWith(s, len, "εστε")) {
        len -= 4
        if (this.__contains(s, 0, len,this.exc12b))
            len += 3 // add back -εστ
    }

    return len
}

GreekStemmer.prototype.rule13 = function(s,len) {

    if (len > 6 && this.endsWith(s, len, "ηθηκεσ")) {
        len -= 6
    } else if (len > 5 && (this.endsWith(s, len, "ηθηκα") || this.endsWith(s, len, "ηθηκε"))) {
        len -= 5
    }

    var removed = false

    if (len > 4 && this.endsWith(s, len, "ηκεσ")) {
        len -= 4
        removed = true
    } else if (len > 3 && (this.endsWith(s, len, "ηκα") || this.endsWith(s, len, "ηκε"))) {
        len -= 3
        removed = true
    }

    if (removed && (this.__contains(s, 0, len,this.exc13)
        || this.endsWith(s, len, "σκωλ")
        || this.endsWith(s, len, "σκουλ")
        || this.endsWith(s, len, "ναρθ")
        || this.endsWith(s, len, "σφ")
        || this.endsWith(s, len, "οθ")
        || this.endsWith(s, len, "πιθ"))) {

        len += 2 // add back the -ηκ
    }

    return len;
}

GreekStemmer.prototype.rule14 = function(s,len) {

    var removed = false;

    if (len > 5 && this.endsWith(s, len, "ουσεσ")) {
        len -= 5
        removed = true;
    } else if (len > 4 && (this.endsWith(s, len, "ουσα") || this.endsWith(s, len, "ουσε"))) {
        len -= 4
        removed = true
    }

    if (removed && (this.__contains(s, 0, len,this.exc14)
        || this.endsWithVowel(s, len)
        || this.endsWith(s, len, "ποδαρ")
        || this.endsWith(s, len, "βλεπ")
        || this.endsWith(s, len, "πανταχ")
        || this.endsWith(s, len, "φρυδ")
        || this.endsWith(s, len, "μαντιλ")
        || this.endsWith(s, len, "μαλλ")
        || this.endsWith(s, len, "κυματ")
        || this.endsWith(s, len, "λαχ")
        || this.endsWith(s, len, "ληγ")
        || this.endsWith(s, len, "φαγ")
        || this.endsWith(s, len, "ομ")
        || this.endsWith(s, len, "πρωτ"))) {
        len += 3 // add back -ουσ
    }

    return len

}

GreekStemmer.prototype.rule15 = function(s,len) {

    var removed = false;

    if (len > 4 && this.endsWith(s, len, "αγεσ")) {
        len -= 4
        removed = true
    } else if (len > 3 && (this.endsWith(s, len, "αγα") || this.endsWith(s, len, "αγε"))) {
        len -= 3
        removed = true
    }

    if (removed) {
        var cond1 = this.__contains(s, 0, len,this.exc15a)
            || this.endsWith(s, len, "οφ")
            || this.endsWith(s, len, "πελ")
            || this.endsWith(s, len, "χορτ")
            || this.endsWith(s, len, "λλ")
            || this.endsWith(s, len, "σφ")
            || this.endsWith(s, len, "ρπ")
            || this.endsWith(s, len, "φρ")
            || this.endsWith(s, len, "πρ")
            || this.endsWith(s, len, "λοχ")
            || this.endsWith(s, len, "σμην")

        var cond2 = this.__contains(s, 0, len,this.exc15b)
            || this.endsWith(s, len, "κολλ")

        if (cond1 && !cond2)
            len += 2 // add back -αγ
    }

    return len
}

GreekStemmer.prototype.rule16 = function(s,len) {

    var removed = false
    if (len > 4 && this.endsWith(s, len, "ησου")) {
        len -= 4
        removed = true
    } else if (len > 3 && (this.endsWith(s, len, "ησε") || this.endsWith(s, len, "ησα"))) {
        len -= 3
        removed = true
    }

    if (removed && this.__contains(s, 0, len,this.exc16))
        len += 2 // add back -ησ

    return len
}

GreekStemmer.prototype.rule17 = function(s,len) {

    if (len > 4 && this.endsWith(s, len, "ηστε")) {
        len -= 4
        if (this.__contains(s, 0, len, this.exc17))
            len += 3 // add back the -ηστ
    }

    return len
}

GreekStemmer.prototype.rule18 = function(s,len) {

    var removed = false

    if (len > 6 && (this.endsWith(s, len, "ησουνε") || this.endsWith(s, len, "ηθουνε"))) {
        len -= 6
        removed = true
    } else if (len > 4 && this.endsWith(s, len, "ουνε")) {
        len -= 4
        removed = true
    }

    if (removed && this.__contains(s, 0, len,this.exc18)) {
        len += 3
        s[len - 3] = 'ο'
        s[len - 2] = 'υ'
        s[len - 1] = 'ν'
    }
    return len
}

GreekStemmer.prototype.rule19 = function(s,len) {

    var removed = false;

    if (len > 6 && (this.endsWith(s, len, "ησουμε") || this.endsWith(s, len, "ηθουμε"))) {
        len -= 6
        removed = true
    } else if (len > 4 && this.endsWith(s, len, "ουμε")) {
        len -= 4
        removed = true
    }

    if (removed && this.__contains(s, 0, len,this.exc19)) {
        len += 3
        s[len - 3] = 'ο'
        s[len - 2] = 'υ'
        s[len - 1] = 'μ'
    }
    return len
}

GreekStemmer.prototype.rule20 = function(s,len) {

    if (len > 5 && (this.endsWith(s, len, "ματων") || this.endsWith(s, len, "ματοσ")))
        len -= 3
    else if (len > 4 && this.endsWith(s, len, "ματα"))
        len -= 2
    return len
}

GreekStemmer.prototype.rule21 = function(s,len) {

    if (len > 9 && this.endsWith(s, len, "ιοντουσαν"))
        return len - 9

    if (len > 8 && (this.endsWith(s, len, "ιομασταν") ||
        this.endsWith(s, len, "ιοσασταν") ||
        this.endsWith(s, len, "ιουμαστε") ||
        this.endsWith(s, len, "οντουσαν")))
        return len - 8

    if (len > 7 && (this.endsWith(s, len, "ιεμαστε") ||
        this.endsWith(s, len, "ιεσαστε") ||
        this.endsWith(s, len, "ιομουνα") ||
        this.endsWith(s, len, "ιοσαστε") ||
        this.endsWith(s, len, "ιοσουνα") ||
        this.endsWith(s, len, "ιουνται") ||
        this.endsWith(s, len, "ιουνταν") ||
        this.endsWith(s, len, "ηθηκατε") ||
        this.endsWith(s, len, "ομασταν") ||
        this.endsWith(s, len, "οσασταν") ||
        this.endsWith(s, len, "ουμαστε")))
        return len - 7

    if (len > 6 && (this.endsWith(s, len, "ιομουν") ||
        this.endsWith(s, len, "ιονταν") ||
        this.endsWith(s, len, "ιοσουν") ||
        this.endsWith(s, len, "ηθειτε") ||
        this.endsWith(s, len, "ηθηκαν") ||
        this.endsWith(s, len, "ομουνα") ||
        this.endsWith(s, len, "οσαστε") ||
        this.endsWith(s, len, "οσουνα") ||
        this.endsWith(s, len, "ουνται") ||
        this.endsWith(s, len, "ουνταν") ||
        this.endsWith(s, len, "ουσατε")))
        return len - 6

    if (len > 5 && (this.endsWith(s, len, "αγατε") ||
        this.endsWith(s, len, "ιεμαι") ||
        this.endsWith(s, len, "ιεται") ||
        this.endsWith(s, len, "ιεσαι") ||
        this.endsWith(s, len, "ιοταν") ||
        this.endsWith(s, len, "ιουμα") ||
        this.endsWith(s, len, "ηθεισ") ||
        this.endsWith(s, len, "ηθουν") ||
        this.endsWith(s, len, "ηκατε") ||
        this.endsWith(s, len, "ησατε") ||
        this.endsWith(s, len, "ησουν") ||
        this.endsWith(s, len, "ομουν") ||
        this.endsWith(s, len, "ονται") ||
        this.endsWith(s, len, "ονταν") ||
        this.endsWith(s, len, "οσουν") ||
        this.endsWith(s, len, "ουμαι") ||
        this.endsWith(s, len, "ουσαν")))
        return len - 5

    if (len > 4 && (this.endsWith(s, len, "αγαν") ||
        this.endsWith(s, len, "αμαι") ||
        this.endsWith(s, len, "ασαι") ||
        this.endsWith(s, len, "αται") ||
        this.endsWith(s, len, "ειτε") ||
        this.endsWith(s, len, "εσαι") ||
        this.endsWith(s, len, "εται") ||
        this.endsWith(s, len, "ηδεσ") ||
        this.endsWith(s, len, "ηδων") ||
        this.endsWith(s, len, "ηθει") ||
        this.endsWith(s, len, "ηκαν") ||
        this.endsWith(s, len, "ησαν") ||
        this.endsWith(s, len, "ησει") ||
        this.endsWith(s, len, "ησεσ") ||
        this.endsWith(s, len, "ομαι") ||
        this.endsWith(s, len, "οταν")))
        return len - 4

    if (len > 3 && (this.endsWith(s, len, "αει") ||
        this.endsWith(s, len, "εισ") ||
        this.endsWith(s, len, "ηθω") ||
        this.endsWith(s, len, "ησω") ||
        this.endsWith(s, len, "ουν") ||
        this.endsWith(s, len, "ουσ")))
        return len - 3

    if (len > 2 && (this.endsWith(s, len, "αν") ||
        this.endsWith(s, len, "ασ") ||
        this.endsWith(s, len, "αω") ||
        this.endsWith(s, len, "ει") ||
        this.endsWith(s, len, "εσ") ||
        this.endsWith(s, len, "ησ") ||
        this.endsWith(s, len, "οι") ||
        this.endsWith(s, len, "οσ") ||
        this.endsWith(s, len, "ου") ||
        this.endsWith(s, len, "υσ") ||
        this.endsWith(s, len, "ων")))
        return len - 2

    if (len > 1 && this.endsWithVowel(s, len))
        return len - 1

    return len
}

GreekStemmer.prototype.rule22 = function(s,len) {

    if (this.endsWith(s, len, "εστερ") ||
        this.endsWith(s, len, "εστατ"))
        return len - 5

    if (this.endsWith(s, len, "οτερ") ||
        this.endsWith(s, len, "οτατ") ||
        this.endsWith(s, len, "υτερ") ||
        this.endsWith(s, len, "υτατ") ||
        this.endsWith(s, len, "ωτερ") ||
        this.endsWith(s, len, "ωτατ"))

        return len - 4

    return len
}

GreekStemmer.prototype.__replaceAccentedCharacters = function(word) {

    var outcome = ''

    for(var i=0;i<word.length;i++) {

        var character = word[i]

        var alternative = this.__accentedCharacterMap[character]

        if(alternative) {
            character = alternative
        }

        outcome = outcome + character
    }

    return outcome;
}

GreekStemmer.prototype.__replaceSigma = function(word) {

    return word.replace('ς','σ')
}

GreekStemmer.prototype.__contains = function(text,off,len,values) {

    var subString = text.substring(off,len)

    var index = values.indexOf(subString)

    return index!=-1
}

GreekStemmer.prototype.endsWithVowel = function(s,len) {

    if (len == 0)
        return false

    switch(s[len - 1]) {
        case 'α':
        case 'ε':
        case 'η':
        case 'ι':
        case 'ο':
        case 'υ':
        case 'ω':
            return true
        default:
            return false
    }
}

GreekStemmer.prototype.endsWithVowelNoY = function(s,len) {

    if (len == 0)
        return false
    switch(s[len - 1]) {
        case 'α':
        case 'ε':
        case 'η':
        case 'ι':
        case 'ο':
        case 'ω':
            return true
        default:
            return false
    }
}

GreekStemmer.prototype.endsWith = function(s,len,suffix) {

    var suffixLen = suffix.length
    if(suffixLen>len)
        return false

    for(var i = suffixLen-1; i >= 0 ; i--)
        if(s[len-(suffixLen-i)] != suffix[i])
            return false

    return true
}



module.exports = GreekStemmer
