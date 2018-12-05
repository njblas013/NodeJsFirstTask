'use strict';
var http = require('http');
var port = process.env.PORT || 1337;
var requests = require('request');
var url = require('url');
var xml = require('xml-formatter');
//var 


http.createServer(function (req, res) {

    var add = url.parse(req.url, true);
    var query = add.query;
    switch (add.pathname.replace('/', '')) {

        case "getBiller":
            getBiller(req, res, query.tpaid);
            break;
        case "getBillerRules":
            getBillerRules(req, res, query)
            break;
        default:
            res.write('Hello World!');
            res.end();
            break;
    }
}).listen(port);


function getBiller(req, res, q) {
    requests.get("http://172.24.1.6:8083/MultiSys/Services.asmx/GetBillers?tpaid=" + q, (error, response, body) => {
        if (error) {
            return console.dir(error);
        }
        console.log(body);
        res.writeHead(200, { 'Content-Type': 'text/xml' });
        res.write(body);
        res.end();
    })
}

function getBillerRules(req, res, q) {
    requests.get("http://172.24.1.6:8083/MultiSys/Services.asmx/GetBillerRules?tpaid=" + q.tpaid + "&merchantid=" + q.merchant, (error, response, body) => {
        if (error) {
            return console.dir(error);
        }
        console.log(body);
        res.writeHead(200, { 'Content-Type': 'text/xml' });
        res.write(body);
        res.end();
    })
}