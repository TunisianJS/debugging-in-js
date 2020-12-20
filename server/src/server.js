var express = require('express'),
    parser = require('body-parser'),
    cors = require('cors'),
    validator = require("card-validator")

var app = express()

app.use(cors())
app.use(parser.json())
app.use(parser.urlencoded({ extended: false }))

app.get('/validate/:number', (req, res) => {
    let ccNumber = req.params.number
    let checkCard = validator.number(ccNumber)

    let result = {
        valid: checkCard.isValid
    }

    if (checkCard.isValid && checkCard.card && checkCard.card.niceType) {
        result.type = checkCard.card.niceType
    }

    res.json(result)
})

app.listen(4000, '0.0.0.0')

module.exports = app
