import * as taskLocalStorage from './taskLocalStorage.js';
import * as elements from './elements.js';


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
    const newTaskElement = elements.createTaskElement(newTask);
    listTasks.appendChild(newTaskElement);

    newTaskElement.id = taskLocalStorage.addValue(false, newTask)
}



function addTaskByEnter(key, inputId, listTaskId){
    if (key != "Enter"){
        return;
    }
    addNewTask( inputId, listTaskId);
}


function deleteTasks(listTasksId){
    const doneTasks = document.getElementById(listTasksId);
    doneTasks.innerHTML = "";
}


function dragAnsDropTask(e, TasksFrame){
    const draggedElement = document.getElementById(e.dataTransfer.getData("text"));
    const tasks =  TasksFrame.getElementsByClassName("task");
    let distance = Number.POSITIVE_INFINITY;
    let elementIndex;
    for (let i = 0; i < tasks.length; i++){
        const box = tasks[i].getBoundingClientRect();
        const offset = Math.abs(e.clientY - box.top - box.height / 2);
        if (offset < distance){
            distance = offset;
            elementIndex = i;
        }
    }
    const afterElement = tasks[elementIndex]
    if (!afterElement){
        return;
    }
    else if (afterElement.getBoundingClientRect().y > draggedElement.getBoundingClientRect().y){
        TasksFrame.insertBefore(draggedElement, afterElement.nextSibling);
    }
    else{
        TasksFrame.insertBefore(draggedElement, afterElement);
    }
}


const listTasksId = "todo-tasks"
const listDoneTasksId = "done-tasks"
const inputId = "input-task"


// create click evenet on add-task button - for add text from input button
const saveNewTask = document.getElementById("add-button");
saveNewTask.addEventListener('click', () => { addNewTask(inputId, listTasksId) });

// create keydown evenet on input text - add text by Enter key
const inputTask = document.getElementById("input-task");
inputTask.addEventListener('keydown', (event) => { addTaskByEnter(event.key, inputId, listTasksId) });

// create click evenet on delete-all button - to delete all the tasks
const deleteAll = document.getElementById("delete-all-tasks");
deleteAll.addEventListener('click', () => {
    deleteTasks(listTasksId);
    deleteTasks(listDoneTasksId);
    localStorage.clear(); 
});

// create click evenet on delete-done-tasks button - to dealte all done tasks
const deleteDoneTasks = document.getElementById("delete-done-tasks");
deleteDoneTasks.addEventListener('click', () => {
    deleteTasks(listDoneTasksId);
    taskLocalStorage.deleteDoneTasks();
});

// pulls out all the exist task from the local storage 
taskLocalStorage.tasksFromLocalStorage(listTasksId, listDoneTasksId)


// create event for drag & drop tasks in list task to do 
const TasksFrame = document.getElementById(listTasksId)
TasksFrame.addEventListener("dragover", (e) => { e.preventDefault(); })
TasksFrame.addEventListener("drop", (e) => { dragAnsDropTask(e, TasksFrame); })