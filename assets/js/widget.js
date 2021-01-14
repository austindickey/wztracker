function getPlayerDetails() {
    let platform = $("#platformSelector option:selected").val()
    let gamertag = $("#gamertag").val()

    console.log(platform)
    console.log(gamertag)
}

$("#submit").on("click", function() {
    getPlayerDetails()
})