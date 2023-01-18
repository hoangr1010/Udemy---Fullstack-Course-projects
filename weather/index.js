const express = require('express')
const app = express()
const http = require('http')
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/', function(req,res) {
    res.sendFile(__dirname + '/index.html')
})

app.post('/', function(req, res) {
    // get input city from user
    var city = req.body.city
    var API_KEY = 'API_KEY'

    //pass city to url
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`
    
    // request the data and parse JSON
    http.get(url, function(response) {
        response.on('data', function(data){
            var weather = JSON.parse(data)
            
            // assign value of each variable
            var mainWeather = weather.weather[0].main
            var temp = weather.main.temp
            var icon = weather.weather[0].icon

            // display content to website
            res.write('<p>The weather currently ' + mainWeather + '</p>')
            res.write(`<h1>Temperature in ${city}: ${temp} degrees Celsius</h1>`)
            res.write(`<img src="http://openweathermap.org/img/wn/${icon}@2x.png" alt="Girl in a jacket">`)
            res.send() 
        })
    })
})

app.listen('3000', function () {
    console.log('listening on http://localhost:3000')
})