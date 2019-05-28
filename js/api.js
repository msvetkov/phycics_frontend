var xmlHttp = new XMLHttpRequest();
var BASE_URL = 'http://83.166.247.138:8080/api';

function ajaxPost(url, json, func) {
    xmlHttp.open("POST", url, true);
    xmlHttp.setRequestHeader("Content-Type", "application/json");

    xmlHttp.setRequestHeader("token", "eyJhbGciOiJIUzUxMiJ9.eyJlbWFpbCI6ImgwMjJ1cGlAZ21haWwuY29tIiwicGFzc3dvcmQiOiI3YTg1NDk3Yzc4OWFlZjc0ZWVlMjI0MmRmMzliNDQ5ZSIsImN1cnJlbnRUaW1lIjoxNTU4NzMyNjE3OTM5fQ.bPM2Fq4Nd7sYL88QJ26HA2Kp5a0vTLIDyBuW3OX3toMXw2kS9sgMylyheFy8kXjRBdw7-9988bTyoA6xg2odwQ");

    xmlHttp.onload = func;

    var jsonToSend = JSON.stringify(json, null, ' ');

    if (json == null) {
        xmlHttp.send();
    } else {
        xmlHttp.send(jsonToSend)
    }
}

function getUrl(url) {
    return BASE_URL + url;
}

function getLabsList(callback) {
    ajaxPost(getUrl('/lab'), null, callback);
}

function getMyLabsList(callback) {
    ajaxPost(getUrl('/lab/my'), null, callback);
}

function sendProtocol(params, callback) {
    ajaxPost(getUrl('/lab/protocol'), params, callback);
}

function sendAnswer(params, callback) {
    ajaxPost(getUrl('/lab/answer'), params, callback);
}