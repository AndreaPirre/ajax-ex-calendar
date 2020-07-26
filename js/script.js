// Descrizione:
// Creiamo un calendario dinamico con le festività.
// Il calendario partirà da gennaio 2018 e si concluderà a dicembre 2018 (unici dati disponibili sull'API).
// Milestone 1
// Creiamo il mese di Gennaio, e con la chiamata all'API inseriamo le festività.
// Milestone 2
// Diamo la possibilità di cambiare mese, gestendo il caso in cui l'API non possa ritornare festività.
// Attenzione!
// Ogni volta che cambio mese dovrò:
// Controllare se il mese è valido (per ovviare al problema che l'API non carichi holiday non del 2018)
// Controllare quanti giorni ha il mese scelto formando così una lista
// Chiedere all'api quali sono le festività per il mese scelto
// Evidenziare le festività nella lista
// Consigli e domande del giorno:
// Abbiamo visto assieme una libereria che serve per gestire le date... quale sarà?
// Una chiamata ajax può anche non andare a buon fine, che si fa in quel caso? Lasciamo l'utente ad attendere? ;)

function stampaMese(meseCorrente) {
    var giorniDelMese = meseCorrente.daysInMonth();
    console.log(giorniDelMese);
    var template = $("#template").html();
    var compiled = Handlebars.compile(template);
    var target = $('.giorni_mese');
    target.html("");
    for (var i = 1; i <= giorniDelMese; i++) {
        var datacomplete = moment({year: meseCorrente.year(), month: meseCorrente.month(), day: i});
        var giorniHtml = compiled ({
            "value": i,
            "datacomplete": datacomplete.format('YYYY-MM-DD')
        });


        target.append(giorniHtml);

    }
}

function stampaFeste(meseCorrente) {

    var anno = meseCorrente.year();
    var mese = meseCorrente.month();


    $.ajax({
        url:'https://flynn.boolean.careers/exercises/api/holidays',
        method:'GET',
            data: {
                "year": anno,
                "month": mese
            },
        success: function (data, state) {

        var holidays = data["response"];
        for (var i = 0; i < holidays.length; i++) {
            var element = $(".giorni_mese li[data-datacomplete='"+holidays[i]["date"]+"']")
            element.addClass("holidays");
            element.append( " " + "-" + " "+ holidays[i]["name"]);

            console.log(holidays[i]);
        }


        },
        error: function (error) {


        }
    });
}


function init() {

    var meseCorrente = moment("2018-01-01");
    console.log(meseCorrente.month());
    stampaMese(meseCorrente)
    stampaFeste(meseCorrente)

}

$(document).ready(init);
