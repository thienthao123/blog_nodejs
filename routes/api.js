var express = require('express')

var app = express()

app.get('/', (req,res) => {
	res.json('welcome api')
})

module.exports = app