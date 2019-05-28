function renderItem(item, type) {
    return `
        <div class="lab-item">
            <h2 class="title">${item.labwork.title}</h2>
            <p class="description">${item.labwork.description}</p>
            <p class="protokol">${item.madeLabwork.protocol}</p>
            ${renderInfo(item, type)}
        </div>
    `;
}

function renderInfo(item, type) {
    switch(type) {
        case 0: 
            return `
            <button class="send" onclick="${null}">Отправить отчет</button>
            `;
        case 1: 
            return `
                <p class="answer">${item.madeLabwork.answer}</p>
            `;
        case 2:
            return `
                <p class="answer">${item.madeLabwork.answer}</p>
                <p class="mark">${item.madeLabwork.mark}</p>
            `;
    }
}

function renderList(data) {
    return `
        <div class="container">
            <h1 class="title lab-theme">${getNameByType(data.type)}</h1>
            <div class="lab-list">
                ${data.labworks.map(function (item) {
                    return renderItem(item, data.type);
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

function getNameByType(type) {
    switch(type) {
        case 0: return 'открытые';
        case 1: return 'неоценненые';
        case 2: return 'закрытые';
    }
}

document.addEventListener("DOMContentLoaded", function (event) {
    getMyLabsList(function (data) {
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