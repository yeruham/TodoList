function createTaskElement(text){
    const newTaskElement  = document.createElement("span");
    newTaskElement.innerText = text;
    newTaskElement.className = "text-task";
    return newTaskElement;
}


function createDeleteButton(){
    const newDeleteElement = document.createElement("button");
    newDeleteElement.setAttribute("type", "submit");
    newDeleteElement.className = "delete-task";
    newDeleteElement.innerText = "delete";
    newDeleteElement.addEventListener('click', (e) => {  e.target.parentElement.remove(); })
    return newDeleteElement;
}


function createDoneButton(){
    const newDoneElement = document.createElement("button");
    newDoneElement.setAttribute("type", "submit");
    newDoneElement.className = "done-task";
    newDoneElement.innerText = "mark as done";
    newDoneElement.addEventListener('click', (e) => {  e.target.className="done"; e.target.innerText="done"; })
    return newDoneElement;
}


function createFullTaskElement(text){
    const taskElement = createTaskElement(text);
     const deleteElement = createDeleteButton();
    const doneElement = createDoneButton();
   

    const fullTaskElement = document.createElement("li");
    fullTaskElement.className = "task";
    
    fullTaskElement.appendChild(taskElement);
    fullTaskElement.appendChild(deleteElement);
    fullTaskElement.appendChild(doneElement);

    return fullTaskElement;
}



function readInput(id){
    const taskInput = document.getElementById(id);
    const value = taskInput.value;
    taskInput.value = "";
    return value;
}


function addNewTask(inputId, listTaskId){
    const newTask = readInput(inputId);
    if (!newTask){
        return;
    }
    const listTasks = document.getElementById(listTaskId);
    const newTaskElement = createFullTaskElement(newTask);
    listTasks.appendChild(newTaskElement);
}


function addTaskByEnter(key, inputId, listTaskId){
    if (key != "Enter"){
        return;
    }
    addNewTask( inputId, listTaskId);
}


const saveNewTask = document.getElementById("add-button");
saveNewTask.addEventListener('click', () => { addNewTask("input-task", "list-tasks") });


const inputTask = document.getElementById("input-task");
inputTask.addEventListener('keydown', (event) => { addTaskByEnter(event.key, "input-task", "list-tasks") });