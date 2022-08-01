'use strict'

function onInit() {
    console.log('Document is ready')
    renderTodos()
}

function renderTodos() {
    const todos = getTodosForDisplay()
    // console.log(todos);

    if(getTotalCount() === 0 ){
        document.querySelector('.no-todo').innerText = 'No Task To Do!'        
    } else document.querySelector('.no-todo').innerText = ''
    const strHTMLs = todos.map(todo =>
        `
        <li onclick="onToggleTodo('${todo.id}')" class="${(todo.isDone) ? 'done' : ''}">
            ${todo.txt} ,  Importance: ${todo.importance}
            <button onclick="onRemoveTodo(event, '${todo.id}')">x</button>
        </li>
        `
    )
    document.querySelector('.todo-list').innerHTML = strHTMLs.join('')
    document.querySelector('.todo-total-count').innerText = getTotalCount()
    document.querySelector('.todo-active-count').innerText = getActiveCount()
        
    
}

function onRemoveTodo(ev, todoId) {
    if (!confirm('Are you sure?')) return
    ev.stopPropagation()
    // console.log('Removing', todoId)

    removeTodo(todoId)
    renderTodos()
}

function onToggleTodo(todoId) {
    // console.log('Toggling', todoId)
    toggleTodo(todoId)
    renderTodos()
}

function onAddTodo(ev) {
    ev.preventDefault()
    const elImportanceNumber = document.querySelector('[name=importance]')
    const elTxt = document.querySelector('[name=todo-txt]')
    if (!elTxt.value || elTxt.value === ' ') {
        alert('no wrriten data')
        return
    }
    // console.log('Adding todo', elTxt.value)
    addTodo(elTxt.value, elImportanceNumber.value)
    renderTodos()
    elTxt.value = ''
    elImportanceNumber.value = ''
}

function onSetFilter(filterBy) {
    // console.log('Setting filter', filterBy)
    setFilter(filterBy)
    renderTodos()

}