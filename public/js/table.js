let AddButton = document.getElementById('insertButton'), table = document.getElementById("insertForm");

function addRow(tasks, i) {
    var temp = document.getElementById('InsertRow');
    var tempRow = table.insertRow(i);
    var row = temp.content.cloneNode(true);
    row = row.children[0];
    row.children[0].innerText = tasks[i]._name;
    row.children[1].innerText = tasks[i]._description;
    row.children[2].children[0].onclick = function () {
        removeRow(tasks, row);
    }
    table.replaceChild(row, tempRow);



}

function getTable() {

    var items = [];
    if (localStorage.key('tasks')){
        try {
            items = JSON.parse(localStorage.getItem('tasks'));
            if (items.length === undefined) {
                items = [];
            }
            for (let i = 0; i < items.length; i++){
                if (items[i]._name === undefined || items[i]._description === undefined)
                    items.removeItem(i);
            }
            if (items.length === 0) {
                items = [];
            }
            localStorage.setItem('tasks', JSON.stringify(items));
        } catch (e) {
            localStorage.removeItem('tasks')
            items = [];
        }
    }

    for (let i = 0; i < items.length; i++) {
        addRow(items, i);
    }
    var addNameCell = document.getElementById('insertName');
    var addDescriptionCell = document.getElementById('insertDescription');
    AddButton.onclick = function () {
        addTable(addNameCell, addDescriptionCell, items);
    }
}
getTable()

class Task
{
    constructor(name, description) {
        this.name = name;
        this.description = description;
    }
    get name() {
        return this._name;
    }
    set name(value) {
        this._name = value;
    }
    set description(value) {
        this._description = value;
    }
    get description() {
        return this._description;
    }
}

function addTable(name, description, tasks) {
    if (name.value.length < 3 || name.value.length > 20)
    {
        alert(" 3 < len(Название) < 20");
        return;
    }
    let task = new Task(name.value, description.value);
    tasks.push(task);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    addRow(tasks, tasks.indexOf(task));
    document.getElementById("insertName").value = "";
    document.getElementById("insertDescription").value = "";
}

function removeRow(tasks, row) {
    tasks.splice(row.rowIndex - 1, 1);
    localStorage.setItem('tasks', JSON.stringify(tasks));
    table.deleteRow(row.rowIndex - 1);
}