require("dotenv").config()
const moment = require("moment")

const apiKey = process.env.apiKey
const host = process.env.host

function formatNumber(num) {
    return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
}

function getPlayerStats() {
    let platform = $("#platformSelector option:selected").val()
    let gamertag = $("#gamertag").val()

    // settings for the call
    const settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://call-of-duty-modern-warfare.p.rapidapi.com/warzone/" + gamertag + "/" + platform,
        "method": "GET",
        "headers": {
            "x-rapidapi-key": apiKey,
            "x-rapidapi-host": host
        }
    }

    // making the call
    $.ajax(settings).done(function (response) {
        let stats = response.br

        let newUl = $("<ul>")
        newUl.addClass("lifetimeStats")

        let gamesPlayed = $("<li>")
        gamesPlayed.addClass("gamesPlayed")
        gamesPlayed.text("Games Played: " + formatNumber(stats.gamesPlayed))

        let wins = $("<li>")
        wins.addClass("wins")
        wins.text("Wins: " + formatNumber(stats.wins))

        let topFive = $("<li>")
        topFive.addClass("topFive")
        topFive.text("Top Five: " + formatNumber(stats.topFive))

        let topTen = $("<li>")
        topTen.addClass("topTen")
        topTen.text("Top Ten: " + formatNumber(stats.topTen))

        let topTwentyFive = $("<li>")
        topTwentyFive.addClass("topTwentyFive")
        topTwentyFive.text("Top Twenty Five: " + formatNumber(stats.topTwentyFive))

        let kdRatio = $("<li>")
        kdRatio.addClass("kdRatio")
        kdRatio.text("KD Ratio: " + Math.round((stats.kdRatio + Number.EPSILON) * 100) / 100)

        let kills = $("<li>")
        kills.addClass("kills")
        kills.text("Kills: " + formatNumber(stats.kills))

        let deaths = $("<li>")
        deaths.addClass("deaths")
        deaths.text("Deaths: " + formatNumber(stats.deaths))

        let revives = $("<li>")
        revives.addClass("revives")
        revives.text("Revives: " + formatNumber(stats.revives))

        let contracts = $("<li>")
        contracts.addClass("contracts")
        contracts.text("Contracts: " + formatNumber(stats.contracts))

        let hr = $("<hr>")

        newUl.append(gamesPlayed, wins, topFive, topTen, topTwentyFive, kdRatio, kills, deaths, revives, contracts)

        $("#stats").append(newUl, hr)

    })


}

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
            damageDone.text("Damage Done: " + formatNumber(player.damageDone))

            let damageTaken = $("<li>")
            damageTaken.addClass("damageTaken")
            damageTaken.text("Damage Taken: " + formatNumber(player.damageTaken))

            let hr = $("<hr>")

            newUl.append(title, matchTime, placement, kills, deaths, damageDone, damageTaken)

            $("#games").append(newUl, hr)

        }

    })

}

$("#submit").on("click", function() {
    getPlayerStats()
    getRecentMatches()
})

$(document).ready(function(){
    $("#gamertag").keypress(function(e){
      if(e.keyCode==13)
      $("#submit").click()
    })
})