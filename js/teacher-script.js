let xmlHttp = new XMLHttpRequest();

// When our page is Ready
window.onload = onload_page();

function onload_page() {
    ajax_post("http://83.166.247.138:8080/api/teach", null, function () {
        if (xmlHttp.status === 200 && xmlHttp.readyState === 4) {
            try {
                let data = JSON.parse(xmlHttp.responseText);
                update_list(data.labworks)
            } catch (err) {
                console.log(err.message + " in " + xmlHttp.responseText);
            }
        } else {
            console.log("error");
        }
    });
    getLabsList();
}

function send_mark(id) {
    let jsonObject = {};
    jsonObject.id = id;
    jsonObject.mark = document.getElementById(id).value;
    console.log(jsonObject);

    ajax_post("http://83.166.247.138:8080/api/teach/mark", jsonObject, function () {
        if (xmlHttp.status === 200 && xmlHttp.readyState === 4) {
            onload_page()
        } else {
            console.log("error");
        }
    })
}



function update_list(data) {
    document.getElementById('list').innerHTML = '';

    document.getElementById('list').innerHTML += '<h3>Open</h3>';
    data.open.forEach(function (open) {
        document.getElementById('list').innerHTML += '<div class="card border-danger mb-3">' +
            '<div class="card-header" id="heading' + open.madeLabwork.id + '">' +
            '<h2 class="mb-0">' +
            open.user.groupNumber + ' ' + open.user.firstName + ' ' + open.user.lastName + ' ' + ' ' + open.labwork.title +
            '<button class="btn btn-danger btn-smbtn-danger " data-toggle="collapse" data-target="#collapse' + open.madeLabwork.id + '" aria-expanded="false" aria-controls="collapse' + open.madeLabwork.id + '">' +
            'Spoiler' +
            '</button>' +
            '</h2>' +
            '</div>' +
            '<div id="collapse' + open.madeLabwork.id + '" class="collapse" aria-labelledby="heading' + open.madeLabwork.id + '">' +
            '<div class="card-body">Протокол:<br>' + open.madeLabwork.protocol + '<br>Отчет:<br>' + open.madeLabwork.answer +
            '<div class="form-group">' +
            '<label for="' + open.madeLabwork.id + '">Выставление оценки:</label>' +
            '<input type="number" id="' + open.madeLabwork.id + '" class="form-control" required="">' +
            '</div>' +
            '<button onclick="send_mark(' + open.madeLabwork.id + ')" class="btn btn-primary">Подтвердить</button>' +
            '</div>' +
            '</div>' +
            '</div>'
    });

    document.getElementById('list').innerHTML += '<h3>Closed</h3>';
    data.close.forEach(function (close) {
        document.getElementById('list').innerHTML += '<div class="card border-danger mb-3">' +
            '<div class="card-header" id="heading' + close.madeLabwork.id + '">' +
            '<h2 class="mb-0">' +
            close.user.groupNumber + ' ' + close.user.firstName + ' ' + close.user.lastName + ' ' + ' ' + close.labwork.title + ' ' + close.madeLabwork.mark +
            '<button class="btn btn-danger btn-smbtn-danger " data-toggle="collapse" data-target="#collapse' + close.madeLabwork.id + '" aria-expanded="false" aria-controls="collapse' + close.madeLabwork.id + '">' +
            'Spoiler' +
            '</button>' +
            '</h2>' +
            '</div>' +
            '<div id="collapse' + close.madeLabwork.id + '" class="collapse" aria-labelledby="heading' + close.madeLabwork.id + '">' +
            '<div class="card-body">Протокол:<br>' + close.madeLabwork.protocol + '<br>Отчет:<br>' + close.madeLabwork.answer + '</div>' +
            '</div>' +
            '</div>'
    });
}