require("dotenv").config()
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
        console.log(response)
    })

}

$("#submit").on("click", function() {
    getRecentMatches()
})