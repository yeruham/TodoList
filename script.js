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
    newDeleteElement.addEventListener('click', (e) => { deleteTask(e.target.parentElement) })
    return newDeleteElement;
}


function createDoneButton(){
    const newDoneElement = document.createElement("button");
    newDoneElement.setAttribute("type", "submit");
    newDoneElement.className = "done-task";
    newDoneElement.innerText = "mark as done";
    newDoneElement.addEventListener('click', (e) => { 
        e.target.className="done"; 
        e.target.innerText="done"; 
        moveDoneTask(e.target.parentElement) 
    })
    return newDoneElement;
}


function createEditButton(){
    const newEditElement = document.createElement("button");
    newEditElement.setAttribute("type", "submit");
    newEditElement.className = "edit-task";
    newEditElement.innerText = "edit";
    newEditElement.addEventListener('click', (e) => { editTaskByKeys(e) });
    return newEditElement;
}


function createTaskElement(text){
    const textElement = createTextElement(text);
    const editElement = createEditButton();
    const deleteElement = createDeleteButton();
    const doneElement = createDoneButton();

    const fullTaskElement = document.createElement("li");
    fullTaskElement.className = "task";
    
    fullTaskElement.appendChild(textElement);
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


function addNewTask(inputId, listTasksId){
    const newTask = readInput(inputId);
    if (!newTask){
        return;
    }
    const listTasks = document.getElementById(listTasksId);
    const newTaskElement = createTaskElement(newTask);
    listTasks.appendChild(newTaskElement);

    newTaskElement.id = addValueToLocalStorage(listTasksId, newTask)
}


function addTaskByEnter(key, inputId, listTaskId){
    if (key != "Enter"){
        return;
    }
    addNewTask( inputId, listTaskId);
}


function editTaskByKeys(e){
    const currentTaskElement = e.target.parentElement;
    const currentTextElement = currentTaskElement.getElementsByClassName("text-task")[0]

    const editButton = document.createElement("input")
    editButton.className = "input-text"
    editButton.value = currentTextElement.innerText

    currentTaskElement.replaceWith(editButton)
    editButton.addEventListener("keydown", (e) => {     
        if (e.key == "Enter"){
            currentTextElement.innerText = editButton.value;
            editButton.replaceWith(currentTaskElement);
            
            const localStorageKey = currentTaskElement.parentElement.id;
            const taskId = currentTaskElement.id;
            editValueInLocalStorage(localStorageKey, taskId, editButton.value);

        }else if (e.key == "Escape"){
            editButton.replaceWith(currentTaskElement);
        }else{
            return;
        } 
    })
}


function moveDoneTask(taskElement){
    let localStorageKey = taskElement.parentElement.id
    console.log(localStorageKey)
    deleteValueFromLocalStorage(localStorageKey, taskElement.id)

    const doneTasks = document.getElementById("done-tasks");
    doneTasks.appendChild(taskElement);

    localStorageKey = doneTasks.id;
    const textTask = taskElement.getElementsByClassName("text-task")[0].innerText;
    taskElement.id = addValueToLocalStorage(localStorageKey, textTask);
}


function deleteTask(taskElement){
    const taskId = taskElement.id
    const localStorageKey = taskElement.parentElement.id
    taskElement.remove();
    deleteValueFromLocalStorage(localStorageKey, taskId);
}


function deleteTasks(listTasksId){
    const doneTasks = document.getElementById(listTasksId);
    doneTasks.innerHTML = "";
}


function addValueToLocalStorage(key, value){
    let listOfValues = localStorage.getItem(key);
    const valueId = Date.now()
    const localStorageValue = {"task": value, "id": valueId};
    if (listOfValues == null){
        newList = [];
        newList.push(localStorageValue);
        newList = JSON.stringify(newList);
        localStorage.setItem(key, newList);
    }
    else{
        listOfValues = JSON.parse(listOfValues);
        listOfValues.push(localStorageValue);
        listOfValues = JSON.stringify(listOfValues);
        localStorage.setItem(key, listOfValues);
    }
    return valueId
}


function deleteValueFromLocalStorage(key, id){
    let listOfValues = localStorage.getItem(key);
    if (listOfValues == null){
        return;
    }
    listOfValues = JSON.parse(listOfValues);
    for (let i = 0; i < listOfValues.length; i++){
        if (listOfValues[i].id == id){
            const deletedValue = listOfValues.splice(i, 1);
        }
    }
    listOfValues = JSON.stringify(listOfValues);
    localStorage.setItem(key, listOfValues);
}


function editValueInLocalStorage(key, id, newValue){
    let listOfValues = localStorage.getItem(key);
    if (listOfValues == null){
        return;
    }
    listOfValues = JSON.parse(listOfValues);
    for (let i = 0; i < listOfValues.length; i++){
        console.log(listOfValues[i])
        if (listOfValues[i].id == id){
            listOfValues[i].task = newValue;
        }
    }
    listOfValues = JSON.stringify(listOfValues);
    localStorage.setItem(key, listOfValues);
}


const tasksKey = "tasks"
const doneTasksKey = "done-tasks"


const saveNewTask = document.getElementById("add-button");
saveNewTask.addEventListener('click', () => { addNewTask("input-task", "todo-tasks") });


const inputTask = document.getElementById("input-task");
inputTask.addEventListener('keydown', (event) => { addTaskByEnter(event.key, "input-task", "todo-tasks") });


const deleteAll = document.getElementById("delete-all-tasks");
deleteAll.addEventListener('click', () => { deleteTasks("todo-tasks"); deleteTasks("done-tasks"); localStorage.clear(); });


const deleteDoneTasks = document.getElementById("delete-done-tasks");
deleteDoneTasks.addEventListener('click', () => { deleteTasks("done-tasks"); localStorage.removeItem(doneTasksKey); });