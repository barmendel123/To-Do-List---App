'use strict'

var gTodos
var gFilterBy = 'ALL'
_createTodos()

function getTodosForDisplay() {
    var todos
    switch (gFilterBy) {
        case 'ALL':
            todos = gTodos
            break;
        case 'ACTIVE' : 
            todos = gTodos.filter(todo => {
                return !todo.isDone
            })   
            break;
        case 'DONE':
            todos = gTodos.filter(todo => {
                return todo.isDone
            })
            break;
        case 'NAME':
            todos = gTodos.filter(todo => !todo.isDone)
            todos.sort(function(a,b) {
                return ('' + a.txt).localeCompare(b.txt)
            })
            break;
        case 'IMPORTANCE':
            todos = gTodos.filter(todo => !todo.isDone) 
            todos.sort(function (a, b) {
                return a.importance - b.importance
            })
            break;       
    }
    return todos
}

function removeTodo(todoId) {
    const idx = gTodos.findIndex(todo => todo.id === todoId)
    gTodos.splice(idx, 1)
    _saveTodosToStorage()
}

function toggleTodo(todoId) {
    const todo = gTodos.find(todo => todo.id === todoId)
    todo.isDone = !todo.isDone
    _saveTodosToStorage()
}


function addTodo(txt, importance) {
    const todo = _createTodo(txt, importance)
    gTodos.unshift(todo)
    _saveTodosToStorage()

}

function setFilter(filterBy) {
    gFilterBy = filterBy
}

function getTotalCount() {
    return gTodos.length
}
function getActiveCount() {
    const activeTodos = gTodos.filter(todo => !todo.isDone)
    return activeTodos.length
}

// Private functions - used only by the service itself
function _createTodos() {

    var todos = loadFromStorage('todoDB')
    if (!todos || !todos.length) {
        todos = [
            _createTodo('Learn HTML', 3),
            _createTodo('Study CSS', 2),
            _createTodo('Master JS', 1)
        ]
    }

    gTodos = todos
    _saveTodosToStorage()
}

function _createTodo(txt, importance) {
    const todo = {
        id: makeId(),
        txt: txt,
        isDone: false,
        importance: importance,
    }
    //console.log('todo : ' , todo);
    return todo
}

function _saveTodosToStorage() {
    saveToStorage('todoDB', gTodos)
}
