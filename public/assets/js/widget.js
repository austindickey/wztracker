require("dotenv").config()
const moment = require("moment")

const apiKey = process.env.apiKey
const host = process.env.host

function getRecentMatches() {
    let platform = $("#platformSelector option:selected").val()
    let gamertag = $("#gamertag").val()

    console.log(platform)
    console.log(gamertag)

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
        let data = response.matches[0]
        console.log(data)

        let endTime = data.utcEndSeconds
        let d = new Date(0)
        d.setUTCSeconds(endTime)
        let test = moment(d).format('LLLL')

        console.log(test)
    })

}

$("#submit").on("click", function() {
    getRecentMatches()
})