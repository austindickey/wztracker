function getPlayerDetails() {
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
            "x-rapidapi-key": "1d79a935fbmsh6ce840778fdfc27p1edc1fjsnfd7dbd504b08",
            "x-rapidapi-host": "call-of-duty-modern-warfare.p.rapidapi.com"
        }
    }
    
    // making the call
    $.ajax(settings).done(function (response) {
        console.log(response)
    })

}

$("#submit").on("click", function() {
    getPlayerDetails()
})