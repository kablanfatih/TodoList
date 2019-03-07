const form = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo");
const todoList = document.querySelector(".list-group");
const firstCardBody = document.querySelectorAll(".card-body")[0];

eventListeners();

function eventListeners() { //Tüm event Listenerlar
    form.addEventListener("submit", addTodo);
    document.addEventListener("DOMContentLoaded", loadAllTodosToUI);

}

function loadAllTodosToUI() {
    let todos = getTodosFromStorage();

    todos.forEach(function (todo) {
        addTodoToUI(todo);
    });
}

function addTodo(i) {

    const newTodo = todoInput.value.trim();

    if (newTodo === "") {

        showAlert("danger", "Lütfen Bir Todo Girin");

    } else {

        addTodoToUI(newTodo);
        addTodoToStorage(newTodo);
        showAlert("success", "Todo Başarılı Bir Şekilde Eklendi");
    }

    i.preventDefault();
}

function showAlert(type, messagge) {
    const alert = document.createElement("div");

    alert.className = `alert alert-${type}`;
    alert.textContent = messagge;

    firstCardBody.appendChild(alert);

    setTimeout(function () {
        alert.remove();
    }, 1000)
}

function getTodosFromStorage() {
    let todos;

    if (localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    return todos;
}

function addTodoToStorage(newTodo) {
    let todos = getTodosFromStorage();

    todos.push(newTodo);

    localStorage.setItem("todos", JSON.stringify(todos));
}

function addTodoToUI(newTodo) {

    const listItem = document.createElement("li");
    const link = document.createElement("a");
    link.href = "#";
    link.className = "delete-item";
    link.innerHTML = "<i class = 'fa fa-remove'></i>";


    listItem.className = "list-group-item d-flex justify-content-between";

    listItem.appendChild(document.createTextNode(newTodo));
    listItem.appendChild(link);

    todoList.appendChild(listItem);
    todoInput.value = "";
}
