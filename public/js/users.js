function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

const table = document.getElementById("users-insert");

function addRow(data, lastRow) {
    let row = document.getElementById("templateUser").content.cloneNode(true);
    row = row.children[0];
    row.children[0].innerText = data.name;
    row.children[1].innerText = data.username;
    row.children[2].innerText = data.email;
    row.children[3].innerText = data.phone;
    table.replaceChild(row, lastRow);
}

function exceptionRow(lastRow) {
    let row = document.getElementById("templateRow").content.cloneNode(true);
    row = row.children[0];
    row.children[0].innerText = "⚠ Что-то пошло не так";
    table.replaceChild(row, lastRow);
}

function waitingRow(lastRow) {
    let row = document.getElementById("templateRow").content.cloneNode(true);
    row = row.children[0];
    row.children[0].innerHTML = "<img src='pic/loading.gif' width='40' height='40' alt='loading'/>";
    table.replaceChild(row, lastRow);
    return row;
}

async function generate() {
    const min = 1, max = 10;
    const requestValue = Math.floor(Math.random() * (max - min) + min);
    let lastRow = table.insertRow(0);
    lastRow = waitingRow(lastRow);
    await sleep(3000);
    fetch("https://jsonplaceholder.typicode.com/users/" + requestValue)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            addRow(data, lastRow);
        })
        .catch(() => {
            exceptionRow(lastRow);
        });
}