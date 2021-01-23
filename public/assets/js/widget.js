require("dotenv").config()
const moment = require("moment")

const apiKey = process.env.apiKey
const host = process.env.host

let recentAverages = {
    "placementTotals" : [],
    "killTotals" : [],
    "deathTotals" : [],
    "damageDoneTotals" : [],
    "damageTakenTotals" : []
}

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

        newUl.append(gamesPlayed, wins, topFive, topTen, topTwentyFive, kdRatio, kills, deaths, revives, contracts)

        $("#stats").append(newUl)

    })

}

function getAverages(){
    // calculating the averages
    let placement = recentAverages.placementTotals.reduce((a, b) => a + b, 0)
    placement = placement / 20

    let kills = recentAverages.killTotals.reduce((a, b) => a + b, 0)
    kills = kills / 20

    let deaths = recentAverages.deathTotals.reduce((a, b) => a + b, 0)
    deaths = deaths / 20

    let damageDone = recentAverages.damageDoneTotals.reduce((a, b) => a + b, 0)
    damageDone = damageDone / 20

    let damageTaken = recentAverages.damageTakenTotals.reduce((a, b) => a + b, 0)
    damageTaken = damageTaken / 20

    let kd = kills / deaths

    // printing to the screen
    let newUl = $("<ul>")
    newUl.addClass("recentAverages")

    let placementTag = $("<li>")
    placementTag.addClass("placement")
    placementTag.text("Team Placement: " + placement)

    let kdTag = $("<li>")
    kdTag.addClass("kd")
    kdTag.text("KD Ratio: " + Math.round((kd + Number.EPSILON) * 100) / 100)

    let killsTag = $("<li>")
    killsTag.addClass("kills")
    killsTag.text("Kills: " + kills)

    let deathsTag = $("<li>")
    deathsTag.addClass("deaths")
    deathsTag.text("Deaths: " + deaths)

    let damageDoneTag = $("<li>")
    damageDoneTag.addClass("damageDone")
    damageDoneTag.text("Damage Done: " + formatNumber(damageDone))

    let damageTakenTag = $("<li>")
    damageTakenTag.addClass("damageTaken")
    damageTakenTag.text("Damage Taken: " + formatNumber(damageTaken))

    newUl.append(placementTag, kdTag, killsTag, deathsTag, damageDoneTag, damageTakenTag)

    $("#averages").append(newUl)

    // clearing the averages object of data
    recentAverages = {
        "placementTotals" : [],
        "killTotals" : [],
        "deathTotals" : [],
        "damageDoneTotals" : [],
        "damageTakenTotals" : []
    }

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

            recentAverages.placementTotals.push(player.teamPlacement)
            recentAverages.killTotals.push(player.kills)
            recentAverages.deathTotals.push(player.deaths)
            recentAverages.damageDoneTotals.push(player.damageDone)
            recentAverages.damageTakenTotals.push(player.damageTaken)

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

        getAverages()

    })

}

// submit button
$("#submit").on("click", function() {
    getPlayerStats()
    setTimeout(function(){ getRecentMatches() }, 2000)
})

// listening for the enter keypress
$(document).ready(function(){
    $("#gamertag").keypress(function(e){
      if(e.keyCode==13)
      $("#submit").click()
    })
})