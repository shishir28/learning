const express = require('express')
const app = express()
const api = require('./api')
const morgan = require('morgan')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')

app.set('port', (process.env.PORT || 8081))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cors())
app.use('/api', api)
app.use(express.static('static'))
app.use(morgan('dev'))

app.use(function (req, res, next) {
    const err = new Error('Not found!')
    err.status = 404
    res.json(err)

})

mongoose.connect('mongodb://localhost:27017/globalmantics')
const db = mongoose.connection
db.on('error', console.error.bind(console, 'error in conenction '))

db.on('open', function () {
    console.log('Connetced to Database')

    app.listen(app.get('port'), function () {
        console.log('Application listening on port ' + app.get('port') + '!')
    })
})

