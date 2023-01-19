const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const app = express();
app.use(bodyParser.urlencoded({ extended: true }))
app.set("view engine", "ejs");
app.use(express.static('public'))

items = []

app.get('/', function(req, res) {
    // set date and format
    option = {
        weekday:'long',
        year:'numeric',
        month:'short',
        day:'numeric'
    }
    var now = new Date().toLocaleDateString('en-us', option)

    // response date
    res.render('list', {today: now, job: items})
})

app.post('/', function(req, res) {
    items.push(req.body.todoList)
    res.redirect('/')
})

app.listen(3000, function () {
    console.log('listening on 3000')
})

