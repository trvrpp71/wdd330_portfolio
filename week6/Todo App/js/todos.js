import utils from './utils.js';
import ls from './ls.js';


loadTodos();
//add event listeners
document.querySelector('#addBtn').onclick = newTodo;
document.querySelector('#all').onclick = applyFilter;
document.querySelector('#completed').onclick = applyFilter;
document.querySelector('#active').onclick = applyFilter;


function loadTodos(){
    const todoList = ls.getTodoList();

    todoList.forEach(todo => {
        const el = createTodoElement(todo);
        addTodoList(el);
    });

    countTodos();
}


function newTodo() {
    const input = document.querySelector('#formInput').value.trim();
    if(input.length > 0) {
        const todo = createTodo(input);
        const todoDiv = createTodoElement(todo);
        ls.saveTodo(todo);
        countTodos();
    }
}


function createTodo(input){
    let newTodoItem = {};
    
    newTodoItem = {id: Date.now(), content: input, complete:false}
    document.querySelector('#formInput').value = '';
 
    return newTodoItem;
}

function createTodoElement(todo){
    //create a todo div
    const todoDiv = document.createElement('div');
    todoDiv.classList.add('todo');
    //append the new div to the container
    const todoContainer = document.querySelector('.todo-container');
    todoContainer.appendChild(todoDiv);

    //create the complete button
    const completeBtn = document.createElement('checkbox');
    completeBtn.classList.add('complete-btn');
    completeBtn.id ="check-btn";
    completeBtn.setAttribute('data-id', todo.id);
    completeBtn.onclick = checkedTodo;
    if(todo.complete){
        completeBtn.classList.add('checked-done');
    }

    //create li elements
    const todoContent = document.createElement('li');
    todoContent.innerText = todo.content;
    todoContent.classList.add('todo-content');

    //create the delete button
    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('far');
    deleteBtn.classList.add('fa-trash-alt');
    deleteBtn.classList.add('delete');
    deleteBtn.setAttribute('data-id', todo.id);
    deleteBtn.onclick = deleteTodo;

    todoDiv.appendChild(completeBtn);
    todoDiv.appendChild(todoContent);
    todoDiv.appendChild(deleteBtn);

    return todoDiv;
}

function addTodoList(todoDiv){
    document.querySelector('#todos').appendChild(todoDiv);
}

function countTodos(){
    const todoList = ls.getTodoList();
    let c = 0;
    todoList.forEach(todo => {
        if(!todo.complete){
            c++;
        };
    });


    const counter = document.querySelector('.counter');
    if (c > 1){
        counter.innerHTML = `${c} tasks left`;
    } else {
        counter.innerHTML = `${c} task left`;
    }
}

//event handlers

function deleteTodo(e) {
    const btn = (e.currentTarget.getAttribute('data-id'));
    ls.deleteTodo(btn);
    document.querySelector('#todos').innerHTML = ''; //clear out the div
    //now reload from local storage
    loadTodos();
}

function checkedTodo(e){
    e.currentTarget.classList.toggle('checked-done');
    const btn = (e.currentTarget.getAttribute('data-id'));
    ls.checkedTodo(btn);
    countTodos();

}

function applyFilter(e){

    //clear out the div
    document.querySelector('#todos').innerHTML = ''; 

    //declare variables
    let filteredTodos = [];
    const allTodos = ls.getTodoList();

    //determine which filter to apply
    if (e.currentTarget.id == 'active'){
        filteredTodos = utils.activeFilter(allTodos);
 
    } else if (e.currentTarget.id == 'all'){
        filteredTodos = allTodos;

    } else if (e.currentTarget.id == 'completed') {
        filteredTodos = utils.completedFilter(allTodos);

    }
    
    //draw the list
    filteredTodos.forEach(todo => {
        const el = createTodoElement(todo);
        addTodoList(el);
    });
}
