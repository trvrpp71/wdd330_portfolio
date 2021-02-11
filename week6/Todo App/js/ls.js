function saveTodo(todo) {

    const toDoList = getTodoList();
    toDoList.push(todo);
    localStorage.setItem('toDoList', JSON.stringify(toDoList));
}


function getTodoList() {
    const toDoListString = localStorage.getItem('toDoList');
    
    let toDoList = [];

    if (toDoListString) {
        toDoList = JSON.parse(toDoListString);
    }
    return toDoList;
}


function deleteTodo(id) {
    const toDoList = getTodoList();
    const updatedTodos = toDoList.filter(todo => todo.id != id );
    localStorage.setItem('toDoList', JSON.stringify(updatedTodos));
}

function checkedTodo(id) {

    const toDoList = getTodoList();
 
    toDoList.forEach(todo => {
        if(todo.id == id) {
            todo.complete = !todo.complete;
        //     if(todo.complete == false) {
        //         todo.complete = true;
        //     } else {
        //         todo.complete = false;
        //     }
        }
    });
    localStorage.setItem('toDoList', JSON.stringify(toDoList));
}

export default {
 saveTodo,
 getTodoList,
 deleteTodo,
checkedTodo
}

