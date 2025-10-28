import * as elements from './elements.js';


type Task = {
    "task": string,
    "done": boolean
}


export function addValue(isDone: boolean, value: string): string{
    let valueId = Date.now();
    let valueIdExist: string | null  = localStorage.getItem(valueId.toString()); 
    while(valueIdExist){
        valueId += 1;
        valueIdExist = localStorage.getItem(valueId.toString()); 
    };
    const newValue: Task = {"task": value, "done": isDone};
    const localStorageValue: string = JSON.stringify(newValue);
    localStorage.setItem(valueId.toString(), localStorageValue);
    return valueId.toString();
}


export function editValue(id: string, newValue: string): void{
    let value: string | null = localStorage.getItem(id);
    if (value == null){
        return;
    }
    const task: Task = JSON.parse(value);
    task.task = newValue;
    value = JSON.stringify(task);
    localStorage.setItem(id, value);
}


export function deleteTasks(done: boolean): void{
    const tasks: [string, string][] | null = Object.entries(localStorage);
    if (tasks == null){
        return;
    }
    for (let [key, value] of tasks){
        const valueObject: Task  = JSON.parse(value);
        if (valueObject.done == done){
            localStorage.removeItem(key);
        }
    }
}


export function tasksFromLocalStorage(listTasksId: string, listDoneTasksId: string): void{
    const tasks: [string, string][] | null = Object.entries(localStorage);
    if (tasks == null){
        return;
    }
    tasks.sort((a, b) => +a[0] - +b[0]);
    const listTasks: HTMLElement | null = document.getElementById(listTasksId);
    const listDoneTasks: HTMLElement | null = document.getElementById(listDoneTasksId);
    if (!listTasks || !listDoneTasks){
        return;
    }
    for (let [key, value] of tasks){
        const valueObject: Task = JSON.parse(value);
        const textTask: string = valueObject.task;
        const newTaskElement = elements.createTaskElement(textTask, valueObject.done);
        newTaskElement.id = key;
        if (valueObject.done){
            listDoneTasks.prepend(newTaskElement)
        }
        else{
            listTasks.appendChild(newTaskElement);
        }
    }
}


export function updateOrderTasks(done: boolean, tasks: HTMLCollection){
    deleteTasks(done);
    for (let i = 0; i < tasks.length; i++){
        const task = tasks[i]!.getElementsByClassName("text-task")[0] as HTMLElement;
        tasks[i]!.id = addValue(false, task.innerText);
    };
}
