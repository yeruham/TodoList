function createTaskElement(text, id){
    const newTaskElement = document.createElement("li")
    newTaskElement.className = "task"

    const newSpanElement = document.createElement("span")
    newSpanElement.innerText = text
    newSpanElement.className = "text-task"
    newSpanElement.id = id

    newTaskElement.appendChild(newSpanElement)
    return newTaskElement
}



function createDeleteElement(){
    const newTaskElement = document.createElement("button")
    newTaskElement.setAttribute("type", "submit")
    newTaskElement.className = "delete-task"
    newTaskElement.innerText = "delete"
    newTaskElement.addEventListener('click', (e) => { deleteTaskElement(e) })
    return newTaskElement 
}


function readInput(id){
    const taskInput = document.getElementById(id)
    const value = taskInput.value
    taskInput.value = ""
    return value
}


function addNewTask(inputId, listTaskId, newId){
    const newTask = readInput(inputId)
    if (!newTask){
        return
    }
    const listTasks = document.getElementById(listTaskId)
    const newTaskElement = createTaskElement(newTask, newId)
    const newDeleteElement = createDeleteElement()
    newTaskElement.appendChild(newDeleteElement)
    listTasks.appendChild(newTaskElement)
}


function addTaskByEnter(key, inputId, listTaskId, newId){
    if (key != "Enter"){
        return
    }
    addNewTask( inputId, listTaskId)
}


function deleteTaskElement(e){
    console.log("deleted")
    console.log(e)
}


const saveNewTask = document.getElementById("add-button")
saveNewTask.addEventListener('click', () => { addNewTask("input-task", "list-tasks", Date.now()) })


const inputTask = document.getElementById("input-task")
inputTask.addEventListener('keydown', (event) => { addTaskByEnter(event.key, "input-task", "list-tasks", Date.now()) })