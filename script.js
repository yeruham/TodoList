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

    newTaskElement.id = taskLocalStorage.addValue(listTasksId, newTask)
}


function addTaskByEnter(key, inputId, listTaskId){
    if (key != "Enter"){
        return;
    }
    addNewTask( inputId, listTaskId);
}


export function deleteTasks(listTasksId){
    const doneTasks = document.getElementById(listTasksId);
    doneTasks.innerHTML = "";
}


function tasksFromLocalStorage(key){
    let listOfValues = localStorage.getItem(key);
    if (listOfValues == null){
        return;
    }
    listOfValues = JSON.parse(listOfValues);
    const listTasks = document.getElementById(key);
    listOfValues.forEach((value) => {
        const textTask = value.task;
        const newTaskElement = elements.createTaskElement(textTask);
        newTaskElement.id = value.id;
        listTasks.appendChild(newTaskElement);
    });
}



const listTasksId = "todo-tasks"
const listDoneTasksId = "done-tasks"
const tasksKey = listTasksId
const doneTasksKey = listDoneTasksId
const inputId = "input-task"



const saveNewTask = document.getElementById("add-button");
saveNewTask.addEventListener('click', () => { addNewTask(inputId, listTasksId) });


const inputTask = document.getElementById("input-task");
inputTask.addEventListener('keydown', (event) => { addTaskByEnter(event.key, inputId, listTasksId) });


const deleteAll = document.getElementById("delete-all-tasks");
deleteAll.addEventListener('click', () => {
    deleteTasks(listTasksId);
    deleteTasks(listDoneTasksId);
    localStorage.clear(); 
});


const deleteDoneTasks = document.getElementById("delete-done-tasks");
deleteDoneTasks.addEventListener('click', () => {
    deleteTasks(listTasksId);
    localStorage.removeItem(doneTasksKey); 
});


tasksFromLocalStorage(tasksKey)
tasksFromLocalStorage(doneTasksKey)