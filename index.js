var nastavenia = require('./nastavenia.js');
var nastavenia = new nastavenia;

var cors = require('cors');
var express = require('express');
var neo4j = require('neo4j');
var nodemailer = require('nodemailer');
var smtpTransport = require('nodemailer-smtp-transport');
var bodyParser = require("body-parser");
var db = new neo4j.GraphDatabase(nastavenia.graphdb);
var app = express();

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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
        query: 'match (u:Uzivatel) optional match (u:Uzivatel)-[r:PRIPOMIENKOVAL]->(p) optional match (u:Uzivatel)-[r2:VYTVORIL]->(pr) return u, count(distinct r) as pocetPripomienok, count(distinct r2) as pocetProjektov'
    }, function (err, results) {
        if (err) throw err;
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(results, null, 4));
    });
});
app.get('/get/pripomienky', function (req, res) {
    db.cypher({
        query: 'MATCH (p:Pripomienka)<-[v:PRIPOMIENKOVAL]-(u) optional match (p:Pripomienka)<-[v2:ZAPRACOVAL]-(u2:Uzivatel) RETURN p, u.meno as zadavatel, v.kedy as casZadania, v2.kedy as casZapracovania, count(v2.kedy) as ciZapracoval, u2.meno as zapracoval order by ID(p) DESC'
    }, function (err, results) {
        if (err) throw err;
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(results, null, 4));
    });
});
app.post('/get/pripomienka', function (req, res) {
    db.cypher({
        query: 'MATCH (p:Pripomienka)<-[v:PRIPOMIENKOVAL]-(u), (p)-[v3:PATRI]-(r) where ID(p)='+req.body.id+' optional match (p:Pripomienka)<-[v2:ZAPRACOVAL]-(u2:Uzivatel) RETURN p, v, u, v2, r, u2'
    }, function (err, results) {
        if (err) throw err;
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(results, null, 4));
    });
});
app.post('/put/pripomienkyPreProjekt', function (req, res) {
    db.cypher({
		query: 'MATCH (p:Pripomienka)-[:PATRI]->(r), (p)<-[v:PRIPOMIENKOVAL]-(u:Uzivatel) where ID(r)='+req.body.pid+' optional match (p:Pripomienka)<-[v2:ZAPRACOVAL]-(u2:Uzivatel) optional match (p2:Pripomienka)-[:PATRI]->(r) where ID(r)='+req.body.pid+' RETURN p, u.meno as zadavatel, v.kedy as casZadania, v2.kedy as casZapracovania, u2.meno as zapracoval, r.meno as nadpis, sum(p2.cas) as trvanie order by v2.kedy DESC, toInt(p.priorita) desc'
    }, function (err, results) {
        if (err) throw err;
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(results, null, 4));
    });
});
app.post('/put/dokonciPripomienku', function (req, res) {
    db.cypher({
		query: 'MATCH (p:Pripomienka), (u:Uzivatel) where ID(p)='+req.body.id+' and ID(u)='+req.body.dokoncil+' create (u)-[:ZAPRACOVAL {kedy: "'+Date.now()+'"}]->(p) set p.cas='+req.body.cas+' RETURN p'
    }, function (err, results) {
        if (err) throw err;
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(results, null, 4));
    });
});
app.post('/get/nacitajKomentare', function (req, res) {
    db.cypher({
        query: 'MATCH (p:Pripomienka)<-[v:KOMENTAR_KU]-(k:Komentar)<-[v2:KOMENTOVAL]-(u) where id(p)='+req.body.id+' RETURN k.znenie as znenie, v2.kedy as kedy, u.meno as komentator order by kedy DESC'
    }, function (err, results) {
        if (err) throw err;
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(results, null, 4));
    });
});
app.post('/put/komentuj', function (req, res) {
	db.cypher({
		query: 'match (p:Pripomienka) where id(p)='+req.body.id+' optional match(u:Uzivatel) where id(u)='+req.body.idu+' optional match(zap:Uzivatel)-[:ZAPRACOVAL]->(p) create (k:Komentar {znenie: "' + req.body.znenie + '"}), (u)-[v:KOMENTOVAL {kedy: '+Date.now()+'}]->(k), (k)-[v2:KOMENTAR_KU]->(p) return p, k, u, v, zap'
    }, function (err, results) {
        if (err) throw err;
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(results, null, 4));

		try {
			if(results[0].zap.properties.mejl) {
				posliMejl(results[0].zap.properties.mejl, 'Komenár na tebou zapracovanú pripomienku', req.body.znenie);
			}
		} catch(err) {
			console.log('Nieje zadaný mejl');
		}
    });
});
app.get('/get/projekty', function (req, res) {
    db.cypher({
        query: 'MATCH (n:Projekt)<-[r:VYTVORIL]–(u:Uzivatel) OPTIONAL MATCH (:Pripomienka)-[r2:PATRI]->(n:Projekt) optional MATCH (p:Pripomienka) where (p)-[:PATRI]->(n) and not ((:Uzivatel)-[:ZAPRACOVAL]->(p:Pripomienka)) RETURN count(distinct p) as `nesplnenePripomienky`, n, count(distinct r2) as `pocetPripomienok`, u'
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
        query: 'match(u:Uzivatel), (r:Projekt) where ID(r)='+req.body.projektID+' and ID(u)='+req.body.zadavatelID+' create (p:Pripomienka {znenie: "'+ req.body.znenie.replace(/['"]+/g, '')+'", priorita: '+req.body.priorita+'}), (u)-[v:PRIPOMIENKOVAL {kedy: "'+Date.now()+'"}]->(p), (p)-[v2:PATRI]->(r) return u, v, r'
    }, function (err, results) {
        if (err) throw err;
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(results, null, 4));
    });
});
app.post('/put/zmenPripomienku', function (req, res) {
    db.cypher({
        query: 'match(p:Pripomienka) where ID(p)='+req.body.id+' set p.znenie = "'+req.body.znenie.replace(/['"]+/g, '')+'", p.priorita = '+req.body.priorita+', p.cas = '+req.body.trvanie
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
app.post('/put/zmenUdajeUzivatela', function (req, res) {
    db.cypher({
        query: 'match (u:Uzivatel) where ID(u)='+req.body.id+' set u.meno="'+req.body.meno+'", u.heslo="'+req.body.heslo+'", u.mejl="'+req.body.mejl+'" return u'
    }, function (err, results) {
        if (err) throw err;
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(results, null, 4));
    });
});
app.post('/get/uzivatel', function (req, res) {
    db.cypher({
        query: 'match (u:Uzivatel) where ID(u)='+req.body.id+' return u'
    }, function (err, results) {
        if (err) throw err;
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(results, null, 4));
    });
});
app.post('/get/nadpis', function (req, res) {
    db.cypher({
        query: 'match (n) where ID(n)='+req.body.id+' return n.meno as nadpis'
    }, function (err, results) {
        if (err) throw err;
        res.writeHead(200, { "Content-Type": "application/json" });
        res.end(JSON.stringify(results, null, 4));
    });
});
app.all('*', function(req, res) {
	res.sendFile(__dirname + '/public/index.html');
});
app.listen(3000, function () {
	console.log('Beží na porte 3000');
});


var posliMejl = function(komu, predmet, obsah) {
	// create reusable transporter object using the default SMTP transport
	//var transporter = nodemailer.createTransport(nastavenia.mejl_meno);
	var transporter = nodemailer.createTransport(smtpTransport({
		host: nastavenia.mejl_host,
		port: nastavenia.mejl_port,
		auth: {
			user: nastavenia.mejl_user,
			pass: nastavenia.mejl_pass
		}
	}));

	// verify connection configuration
	transporter.verify(function(error, success) {
	   if (error) {
			console.log(error);
	   } else {
			console.log('Server is ready to take our messages');
	   }
	});

	// setup e-mail data with unicode symbols
	var mailOptions = {
		from: '"Pripomienkovač 👥" <skusamelet@elet.sk>', // sender address
		to: komu, // list of receivers
		subject: predmet, // Subject line
		text: obsah, // plaintext body
		html: obsah // html body
	};

	// send mail with defined transport object
	transporter.sendMail(mailOptions, function(error, info){
		console.log(error);
	});
}
