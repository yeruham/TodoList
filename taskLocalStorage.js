import * as elements from './elements.js';


export function addValue(isDone, value){
    const valueId = Date.now() + performance.now();
    let localStorageValue = {"task": value, "done": isDone};
    localStorageValue = JSON.stringify(localStorageValue);
    localStorage.setItem(valueId, localStorageValue);
    return valueId;
}


export function editValue(id, newValue){
    let value = localStorage.getItem(id);
    if (value == null){
        return;
    }
    value = JSON.parse(value);
    value.task = newValue;
    value = JSON.stringify(value);
    localStorage.setItem(id, value);
}


export function deleteTasks(done){
    const tasks = Object.entries(localStorage);
    for (let [key, value] of tasks){
        value = JSON.parse(value);
        if (value.done == done){
            localStorage.removeItem(key);
        }
    }
}


export function tasksFromLocalStorage(listTasksId, listDoneTasksId){
    const tasks = Object.entries(localStorage)
    tasks.sort((a, b) => a[0] - b[0])
    if (tasks == null){
        return;
    }
    const listTasks = document.getElementById(listTasksId);
    const listDoneTasks = document.getElementById(listDoneTasksId)
    for (let [key, value] of tasks){
        value = JSON.parse(value);
        const textTask = value.task;
        const newTaskElement = elements.createTaskElement(textTask, value.done);
        newTaskElement.id = key;
        if (value.done){
            listDoneTasks.prepend(newTaskElement)
        }
        else{
            listTasks.appendChild(newTaskElement);
        }
    }
}