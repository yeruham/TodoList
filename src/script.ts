import * as taskLocalStorage from './taskLocalStorage.js';
import * as elements from './elements.js';
import { moveDoneTask } from './buttonsFunctions.js';


function readInput(id: string): string | null{
    const taskInput: HTMLElement | null = document.getElementById(id);
    if (taskInput instanceof HTMLInputElement ){
        const value = taskInput.value;
        taskInput.value = "";
        return value;
    }
    return null;
}


function addNewTask(inputId: string, listTasksId: string): void{
    const newTask: string | null = readInput(inputId);
    const listTasks: HTMLElement | null = document.getElementById(listTasksId)!;
    if (!newTask || !listTasks){
        return;
    }
    const newTaskElement: HTMLLIElement = elements.createTaskElement(newTask);
    listTasks.appendChild(newTaskElement);

    newTaskElement.id = taskLocalStorage.addValue(false, newTask)
}



function addTaskByEnter(key: string, inputId: string, listTaskId: string): void{
    if (key != "Enter"){
        return;
    }
    addNewTask( inputId, listTaskId);
}


function deleteTasks(listTasksId: string): void{
    const doneTasks: HTMLElement| null = document.getElementById(listTasksId);
    if (doneTasks){
        doneTasks.innerHTML = "";
    }
}


function dragAnsDropTask(e: DragEvent, TasksFrame: HTMLElement): void{
    const draggedId: string = e.dataTransfer!.getData("text");
    const draggedElement: HTMLElement = document.getElementById(draggedId)!;
    const tasks: HTMLCollection =  TasksFrame.getElementsByClassName("task");
    let distance: number = Number.POSITIVE_INFINITY;
    let elementIndex: number = 0;
    for (let i = 0; i < tasks.length; i++){
        const box: DOMRect = tasks[i]!.getBoundingClientRect();
        const offset: number = Math.abs(e.clientY - box.top - box.height / 2);
        if (offset < distance){
            distance = offset;
            elementIndex = i;
        }
    }
    const afterElement = tasks[elementIndex];
    if (!afterElement){
        return;
    }
    else if (afterElement.getBoundingClientRect().y > draggedElement.getBoundingClientRect().y){
        TasksFrame.insertBefore(draggedElement, afterElement.nextSibling);
    }
    else{
        TasksFrame.insertBefore(draggedElement, afterElement);
    }
    
    taskLocalStorage.updateOrderTasks(false, tasks);
}


const listTasksId: string = "todo-tasks";
const listDoneTasksId: string = "done-tasks";
const inputId: string = "input-task";


// create click evenet on add-task button - for add text from input button
const saveNewTask: HTMLElement = document.getElementById("add-button")!;
saveNewTask.addEventListener('click', () => { addNewTask(inputId, listTasksId) });

// create keydown evenet on input text - add text by Enter key
const inputTask: HTMLElement = document.getElementById("input-task")!;
inputTask.addEventListener('keydown', (event) => { addTaskByEnter(event.key, inputId, listTasksId) });

// create click evenet on delete-all button - to delete all the tasks
const deleteAll: HTMLElement = document.getElementById("delete-all-tasks")!;
deleteAll.addEventListener('click', () => {
    deleteTasks(listTasksId);
    deleteTasks(listDoneTasksId);
    localStorage.clear(); 
});

// create click evenet on delete-done-tasks button - to dealte all done tasks
const deleteDoneTasks: HTMLElement = document.getElementById("delete-done-tasks")!;
deleteDoneTasks.addEventListener('click', () => {
    deleteTasks(listDoneTasksId);
    taskLocalStorage.deleteTasks(true);
});

// pulls out all the exist task from the local storage 
taskLocalStorage.tasksFromLocalStorage(listTasksId, listDoneTasksId);


// create event for drag & drop tasks in list task to do - listens to all task-container
const taskContainer: HTMLElement = document.getElementById("to-do-container")!;
const tasksFrame: HTMLElement = document.getElementById(listTasksId)!;
taskContainer.addEventListener("dragover", (e) => { e.preventDefault(); });
taskContainer.addEventListener("drop", (e) => { dragAnsDropTask(e, tasksFrame); });



// create event for drag & drop tasks in list done task - listens to all done-task-container 
const doneTasksFrame: HTMLElement = document.getElementById("done-container")!;
doneTasksFrame.addEventListener("dragover", (e) => { e.preventDefault(); });
doneTasksFrame.addEventListener("drop", (e) => {
    const draggedElement = document.getElementById(e.dataTransfer!.getData("text"))!;
    moveDoneTask(draggedElement); 
});