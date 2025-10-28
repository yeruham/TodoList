import * as elements from './elements.js';


export function addValue(isDone, value){
    let valueId = Date.now();
    let valueIdExist = localStorage.getItem(valueId); 
    while(valueIdExist){
        valueId += 1;
        valueIdExist = localStorage.getItem(valueId); 
    };
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


export function updateOrderTasks(done, tasks){
    deleteTasks(done);
    for (let i = 0; i < tasks.length; i++){
        const textTask = tasks[i].getElementsByClassName("text-task")[0].innerText;
        tasks[i].id = addValue(false, textTask);
    };
}