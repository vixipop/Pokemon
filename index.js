const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({extended:true}));

app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res){
    var baseUrl = "https://pokeapi.co/api/v2/pokemon/";
    var pokemon = req.body.ID;
    var finalUrl = baseUrl + pokemon;

    request(finalUrl, function(error, response, body){

        var data = JSON.parse(body);
        var wt = (data.weight)/10;
        var ht = (data.height);
        var ability = data.abilities[0].ability.name;

        res.write("<h1>Pokemon details.</h1>");
        res.write("<h3>Name : " + pokemon +"</h3>");
        res.write("<h3>Weight : " + wt + " kg</h3>");
        res.write("<h3>Height : "+ ht +"</h3>");
        res.write("<h3>Abilities : "+ ability +"</h3>");

   res.send();
})
    
});

app.listen(3000, function(){
    console.log("Server up and running.")
});