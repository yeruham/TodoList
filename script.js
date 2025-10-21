function createTaskElement(text){
    const newTaskElement = document.createElement("li")
    newTaskElement.className = "task"
    newTaskElement.innerText = text
    return newTaskElement
}


function readInput(id){
    const taskInput = document.getElementById(id)
    const value = taskInput.value
    taskInput.value = ""
    return value
}


function addNewTask(inputId, listTaskId){
    const newTask = readInput(inputId)
    if (!newTask){
        return
    }
    const listTasks = document.getElementById(listTaskId)
    const newTaskElement = createTaskElement(newTask)
    listTasks.appendChild(newTaskElement)
}


function addTaskByEnter(key, inputId, listTaskId){
    if (key != "Enter"){
        return
    }
    addNewTask( inputId, listTaskId)
}



const saveNewTask = document.getElementById("add-button")
saveNewTask.addEventListener('click', () => { addNewTask("input-task", "list-tasks") })


const inputTask = document.getElementById("input-task")
inputTask.addEventListener('keydown', (event) => {addTaskByEnter(event.key, "input-task", "list-tasks")})