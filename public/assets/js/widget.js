require("dotenv").config()
const moment = require("moment")

const apiKey = process.env.apiKey
const host = process.env.host

function getRecentMatches() {
    let platform = $("#platformSelector option:selected").val()
    let gamertag = $("#gamertag").val()

    // settings for the call
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://call-of-duty-modern-warfare.p.rapidapi.com/warzone-matches/" + gamertag + "/" + platform,
        "method": "GET",
        "headers": {
            "x-rapidapi-key": apiKey,
            "x-rapidapi-host": host
        }
    }
    
    // making the call
    $.ajax(settings).done(function (response) {

        let matches = response.matches

        for (let i = 0; i < matches.length; i++) {

            let player = matches[i].playerStats

            let endTime = matches[i].utcEndSeconds
            let date = new Date(0)
            date.setUTCSeconds(endTime)
            // let test = moment(date).format('LLLL')

            let newUl = $("<ul>")
            newUl.addClass("recentMatch")

            let title = $("<h5>")
            title.addClass("title")
            title.text("Match " + (i+1))

            let matchTime = $("<li>")
            matchTime.addClass("endTime")
            matchTime.text("Match End Time: " + date)

            let placement = $("<li>")
            placement.addClass("placement")
            placement.text("Team Placement: " + player.teamPlacement)

            let kills = $("<li>")
            kills.addClass("kills")
            kills.text("Kills: " + player.kills)

            let deaths = $("<li>")
            deaths.addClass("deaths")
            deaths.text("Deaths: " + player.deaths)

            let damageDone = $("<li>")
            damageDone.addClass("damageDone")
            damageDone.text("Damage Done: " + player.damageDone)

            let damageTaken = $("<li>")
            damageTaken.addClass("damageTaken")
            damageTaken.text("Damage Taken: " + player.damageTaken)

            let hr = $("<hr>")

            newUl.append(title, matchTime, placement, kills, deaths, damageDone, damageTaken)

            $("#games").append(newUl, hr)

        }

    })

}

$("#submit").on("click", function() {
    getRecentMatches()
})

$(document).ready(function(){
    $("#gamertag").keypress(function(e){
      if(e.keyCode==13)
      $("#submit").click()
    })
})