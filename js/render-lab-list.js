function renderItem(item) {
    return `
        <div class="lab-item">
            <h2 class="title">${item.title}</h2>
            <p class="description">${item.description}</p>
            <input id="file-upload${item.id}" type="file"/>
            <div>
                <a class="link" href="${item.link}">Открыть работу</a>
                <button class="send" onclick="sendProtokol(${item.id})">Отправить протокол</button>
            </div>
        </div>
    `;
}

function sendProtokol(id) {
    var file = document.querySelector(`#file-upload${id}`).files[0];
    if (typeof file == 'undefined') {
        return;
    }
    console.log(file);
}

function renderList(data) {
    return `
        <div class="container">
            <h1 class="title lab-theme">${data.theme}</h1>
            <div class="lab-list">
                ${data.list.map(function (item) {
                    return renderItem(item);
                }).join('')}
            </div>
        </div>
    `;
}

function renderSections(sections) {
    return sections
        .map(function (section) {
            return renderList(section);
        })
        .join('');
}



document.addEventListener("DOMContentLoaded", function (event) {
    getLabsList(function (data) {
        if (xmlHttp.status === 200 && xmlHttp.readyState === 4) {
            try {
                var data = JSON.parse(xmlHttp.responseText);
                var element = document.querySelector('.labs');
                element.innerHTML = renderSections(data.list);
            } catch (err) {
                console.log(err.message + " in " + xmlHttp.responseText);
            }
        } else {
            console.log("error");
        }
    });
});
