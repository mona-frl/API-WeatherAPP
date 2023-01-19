//dotenv to hide your API
require('dotenv').config();

const express = require('express');
const https = require('https');
const app = express();
const port = 4200;


//post results
app.use(express.urlencoded({ extended: true }));

//get the display
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
})


//post the request
app.post("/", (req, res) => {
    //api link
    const apiId = process.env.API_KEY;
    const query = req.body.cityName;
    const units = "metric";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${query}&units=${units}&appid=${apiId}`

    // gets the api and displays the info
    https.get(url, (response) => {
        //responds with the data from the API
        response.on("data", (data) => {
            //converts the hex code into "human friendly" language 
            const weatherData = JSON.parse(data);
            const weatherTemp = weatherData.main.temp;
            const weatherDescription = weatherData.weather[0].description;
            const weatherIcon = weatherData.weather[0].icon
            const imageUrl = "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png"

            //to write multiple lines you could use res.write and summon the res.send after you're done writing your lines.
            res.write(`<h1>The temperature in ${query} is ${weatherTemp}C, ${weatherDescription}</h1>`);
            res.write(`<img src=${imageUrl}>`)
            res.send();
        })
    })
})






















// listen to the port
app.listen(port, () => {
    console.log('Listening to port: ' + port);
})