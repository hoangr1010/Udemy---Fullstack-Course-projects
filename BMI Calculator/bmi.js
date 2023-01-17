const express = require('express')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended:true }))

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html')
})

app.post('/', function (req, res) {
    var weight = req.body.weight
    var height = req.body.height
    var bmi = (weight / (height**2))

    res.send('Your BMI is ' + bmi)
})

app.listen(3000, function() 
    {console.log('listening on 3000')}
)