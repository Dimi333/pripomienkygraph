var express = require('express');
var neo4j = require('neo4j');
var bodyParser = require("body-parser");
var db = new neo4j.GraphDatabase('http://neo4j:dunajska12@localhost:7474');
var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});

app.get('/get/uzivatelia', function (req, res) {
    db.cypher({
        query: 'match (u:Uzivatel)-[r:ZADAL]->(p) match (u:Uzivatel)-[r2:VYTVORIL]->(pr) return u, count(r) as pocetPripomienok, count(distinct r2) as pocetProjektov'
    }, function (err, results) {
        if (err) throw err;
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(results, null, 4));
    });
});
app.get('/get/pripomienky', function (req, res) {
    db.cypher({
        query: 'MATCH (p:Pripomienka)<-[r:ZADAL]-(u) RETURN p, u'
    }, function (err, results) {
        if (err) throw err;
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(results, null, 4));
    });
});
app.get('/get/projekty', function (req, res) {
    db.cypher({
        query: 'MATCH (n:Projekt)<-[r:VYTVORIL]–(u:Uzivatel) OPTIONAL MATCH (p2:Pripomienka)-[r2:PATRI]->(n:Projekt) RETURN n, count(r2) as `pocetPripomienok`, u'
    }, function (err, results) {
        if (err) throw err;
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(results, null, 4));
    });
});
app.post('/put/projekt', function (req, res) {
    db.cypher({
        query: 'match(u:Uzivatel) where ID(u)='+req.body.zadavatelID+' create (p:Projekt {meno: "'+req.body.meno+'"}), (u)-[r:VYTVORIL]->(p) RETURN p, r, u'
    }, function (err, results) {
        if (err) throw err;
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(results, null, 4));
    });
});
app.all('*', function(req, res) { 
  res.redirect('/'); 
});
app.listen(3000, function () {
  console.log('Beží na porte 3000');
});