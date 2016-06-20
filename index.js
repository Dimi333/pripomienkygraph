var cors = require('cors');
var express = require('express');
var neo4j = require('neo4j');
var bodyParser = require("body-parser");
var db = new neo4j.GraphDatabase('http://neo4j:dunajska12@localhost:7474');
var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
/*app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});*/
app.use(cors());

app.post('/', function (req, res) {
    res.sendFile(__dirname + '/public/index.html');
});
app.post('/put/prihlas', function (req, res) {
    db.cypher({
        query: 'match(u:Uzivatel) where u.meno="'+req.body.meno+'" and u.heslo="'+req.body.heslo+'" return u'
    }, function (err, results) {
        if (err) throw err;
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(results, null, 4));
    });
});
app.get('/get/uzivatelia', function (req, res) {
    db.cypher({
        query: 'match (u:Uzivatel) optional match (u:Uzivatel)-[r:PRIPOMIENKOVAL]->(p) optional match (u:Uzivatel)-[r2:VYTVORIL]->(pr) return u, count(r) as pocetPripomienok, count(distinct r2) as pocetProjektov'
    }, function (err, results) {
        if (err) throw err;
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(results, null, 4));
    });
});
app.get('/get/pripomienky', function (req, res) {
    db.cypher({
        query: 'MATCH (p:Pripomienka)<-[v:PRIPOMIENKOVAL]-(u) RETURN p, u, v'
    }, function (err, results) {
        if (err) throw err;
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(results, null, 4));
    });
});
app.post('/put/pripomienkyPreProjekt', function (req, res) {
    db.cypher({
		query: 'MATCH (p:Pripomienka)-[:PATRI]->(r), (p)<-[v:PRIPOMIENKOVAL]-(u:Uzivatel) where ID(r)='+req.body.pid+' optional match (p:Pripomienka)<-[v2:ZAPRACOVAL]-(u2:Uzivatel) RETURN p, u, v, v2'
    }, function (err, results) {
        if (err) throw err;
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(results, null, 4));
    });
});
app.post('/put/dokonciPripomienku', function (req, res) {
    db.cypher({
		query: 'MATCH (p:Pripomienka),(u:Uzivatel) where ID(p)='+req.body.id+' and ID(u)='+req.body.dokoncil+' create (u)-[:ZAPRACOVAL {kedy: "'+Date.now()+'"}]->(p) RETURN p'
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
app.post('/put/pripomienka', function (req, res) {
    db.cypher({
        query: 'match(u:Uzivatel), (r:Projekt) where ID(r)='+req.body.projektID+' and ID(u)='+req.body.zadavatelID+' create (p:Pripomienka {znenie: "'+req.body.znenie+'"}), (u)-[v:PRIPOMIENKOVAL {kedy: "'+Date.now()+'"}]->(p), (p)-[v2:PATRI]->(r) return u, v, r'
    }, function (err, results) {
        if (err) throw err;
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(results, null, 4));
    });
});
app.post('/put/uzivatel', function (req, res) {
    db.cypher({
        query: 'create (u:Uzivatel {meno: "'+req.body.meno+'", heslo: "'+req.body.heslo+'"}) return u'
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