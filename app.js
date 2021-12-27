const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");


document.addEventListener('DOMContentLoaded',getTodo);
todoButton.addEventListener('click',addTodo);
todoList.addEventListener('click',checkDelete);
filterOption.addEventListener('click',filterTodo);

function addTodo(event){
    event.preventDefault();

    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    newTodo.innerText = todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    saveLocal(todoInput.value);

    const check = document.createElement("button");
    check.innerHTML = `<i class="ri-check-line"></i></i>`;
    check.classList.add("todo-check");
    todoDiv.appendChild(check);

    const remove = document.createElement("button");
    remove.innerHTML = `<i class="ri-delete-bin-line"></i>`;
    remove.classList.add("todo-delete");
    todoDiv.appendChild(remove);

    todoList.appendChild(todoDiv);

    todoInput.value = "";
}

function checkDelete(e){
    const items = e.target;
    if(items.classList[0] === "todo-delete"){
        const temp = items.parentElement;
        temp.classList.add("fall");
        removeLocal(temp);
        temp.addEventListener('transitionend',() =>{
            temp.remove();
        });
    }
    if(items.classList[0] === "todo-check"){
        const temp = items.parentElement;
        temp.classList.toggle("completed");
    }
}

function filterTodo(e){
    const todos = todoList.childNodes; //childNode returns NodeList object and first element of the Nodelist is a text. 
    for(let i=1;i<todos.length;i++){ //Thats Why we starts from 1st index
        let todo = todos[i];
        switch(e.target.value){
            case "all":
                console.log("all");
                todo.style.display='flex';
                break;
            case "completed":
                if(todo.classList.contains('completed')){
                    console.log("complete if");
                    todo.style.display='flex';
                }
                else{
                    console.log("complete");
                    todo.style.display='none';
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains('completed')){
                    todo.style.display='flex';
                }
                else{
                    todo.style.display='none';
                }
                break;
        }
    }
}

function saveLocal(todo){
    let todos;
    if(localStorage.getItem("todos") == null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    todos.push(todo);
    localStorage.setItem("todos",JSON.stringify(todos));
}


function getTodo(){
    let todos;
    if(localStorage.getItem("todos") == null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    todos.forEach(function(todo){
        const todoDiv = document.createElement("div");
        todoDiv.classList.add("todo");

        const newTodo = document.createElement("li");
        newTodo.innerText = todo;
        newTodo.classList.add("todo-item");
        todoDiv.appendChild(newTodo);

        const check = document.createElement("button");
        check.innerHTML = `<i class="ri-check-line"></i></i>`;
        check.classList.add("todo-check");
        todoDiv.appendChild(check);

        const remove = document.createElement("button");
        remove.innerHTML = `<i class="ri-delete-bin-line"></i>`;
        remove.classList.add("todo-delete");
        todoDiv.appendChild(remove);

        todoList.appendChild(todoDiv);
    });
}

function removeLocal(todo){
    let todos;
    if(localStorage.getItem("todos") == null){
        todos = [];
    }
    else{
        todos = JSON.parse(localStorage.getItem("todos"));
    }
    const index = todo.children[0].innerText;
    todos.splice(todos.indexOf(index),1);
    localStorage.setItem("todos",JSON.stringify(todos));
}