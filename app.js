
const { response } = require("express");
const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const { urlencoded } = require("body-parser");

const app = express();

app.get("/", function(req, res){

res.sendFile(__dirname + "/index.html");
})

app.use(bodyParser.urlencoded({extended: true}));

app.post("/", function(req, res){

     const query = req.body.cityName;
    const appKey = "95cf0c354167b75aea06cb32b4285ee5";
    const unit = "metric"
    const url = "https://api.openweathermap.org/data/2.5/weather?q="+ query +"&units=" + unit + "&appid=" + appKey ;

    https.get(url, function(response){
        console.log(response.statusCode);

        response.on("data", function(data){
            weatherData = JSON.parse(data)
           const temp = weatherData.main.temp
           const description = weatherData.weather[0].description
           const icon = weatherData.weather[0].icon
           const imageUrl = " http://openweathermap.org/img/wn/" + icon + "@2x.png"
            
           res.write("<h1 > The temperature in " +req.body.cityName+ " is " + temp +"degree celsius</h1>");
           res.write("<p> The weather is currently " + description +"</p>");
           res.write("<img src=" + imageUrl + " >");
           res.send();
     })
    })

})
  
   

app.listen(3001, function(){
    console.log("server is running at 3001")  
})