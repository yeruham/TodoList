function createTextElement(text){
    const newTextElement  = document.createElement("span");
    newTextElement.innerText = text;
    newTextElement.className = "text-task";
    return newTextElement;
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


function createEditButton(){
    const newEditElement = document.createElement("button");
    newEditElement.setAttribute("type", "submit");
    newEditElement.className = "edit-task";
    newEditElement.innerText = "edit";
    newEditElement.addEventListener('click', (e) => { editTask(e) });
    return newEditElement;
}


function createTaskElement(text){
    const taskElement = createTextElement(text);
    const editElement = createEditButton();
    const deleteElement = createDeleteButton();
    const doneElement = createDoneButton();

    const fullTaskElement = document.createElement("li");
    fullTaskElement.className = "task";
    
    fullTaskElement.appendChild(taskElement);
    fullTaskElement.appendChild(editElement);
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
    const newTaskElement = createTaskElement(newTask);
    listTasks.appendChild(newTaskElement);
}


function addTaskByEnter(key, inputId, listTaskId){
    if (key != "Enter"){
        return;
    }
    addNewTask( inputId, listTaskId);
}


function editTask(e){
    const currentTaskElement = e.target.parentElement;
    const currentTextElement = currentTaskElement.getElementsByClassName("text-task")[0]

    const editButton = document.createElement("input")
    editButton.className = "input-text"
    editButton.value = currentTextElement.innerText

    currentTaskElement.replaceWith(editButton)
    editButton.addEventListener("keydown", (e) => 
        {
            if (e.key == "Enter"){
                currentTextElement.innerText = editButton.value 
                editButton.replaceWith(currentTaskElement)
            }else if (e.key == "Escape"){
                editButton.replaceWith(currentTaskElement)
            }else{
                return;
            }
        })
}



const saveNewTask = document.getElementById("add-button");
saveNewTask.addEventListener('click', () => { addNewTask("input-task", "list-tasks") });


const inputTask = document.getElementById("input-task");
inputTask.addEventListener('keydown', (event) => { addTaskByEnter(event.key, "input-task", "list-tasks") });
inputTask.innerHTML