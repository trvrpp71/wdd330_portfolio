function activeFilter(todos){
    return todos.filter(todo => {
        return !todo.complete
    });
}

function completedFilter(todos){
    return todos.filter(todo => {
        return todo.complete
    });
}


export default {
    activeFilter,
    completedFilter
}