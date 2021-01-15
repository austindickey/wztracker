// Dependencies
const express = require("express")
const path = require('path')

// Port
const PORT = process.env.PORT || 8000

// Initialize Express
const app = express()

// Middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static("public"))

// Routes
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + "/index.html"))
})

// Start the API server
app.listen(PORT, function() {
  console.log(`🌎  ==> API Server now listening on PORT ${PORT}!`)
})