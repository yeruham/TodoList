import { createDoneButton, createTaskElement } from './elements.js';
import * as taskLocalStorage from './taskLocalStorage.js';


export function editTaskByKeys(taskElement: HTMLElement): void{
    // edit text of task element in page and local storage - replace current element with button element.
    // accepts as a parameter event of edit button.
    const currentTaskElement: HTMLElement = taskElement.parentElement!;
    const currentTextElement: HTMLElement = currentTaskElement.getElementsByClassName("text-task")[0] as HTMLElement;

    const editButton: HTMLInputElement = document.createElement("input")
    editButton.className = "input-text"
    editButton.value = currentTextElement.innerText

    currentTaskElement.replaceWith(editButton)

    // listens to the computer keys. by Enter key saving the changes on the original element - 
    // loads it to the page again, and in local storage.
    // by Escape key cancels changes and return original element as it was. 
    editButton.addEventListener("keydown", (e: KeyboardEvent) => {     
        if (e.key == "Enter"){
            currentTextElement.innerText = editButton.value;
            editButton.replaceWith(currentTaskElement);

            const taskId: string = currentTaskElement.id;
            taskLocalStorage.editValue(taskId, editButton.value);

        }else if (e.key == "Escape"){
            editButton.replaceWith(currentTaskElement);
        }else{
            return;
        } 
    })
}


export function moveDoneTask(taskElement: HTMLElement): void{
    // move done task from tasks element to done-tasks element and from tasks key to done-tasks in local storage.
    // accepts as a parameter event of done button. 

    const task: HTMLElement = taskElement.getElementsByClassName("text-task")[0] as HTMLElement;
    const doneTaskElement: HTMLElement = createTaskElement(task.innerText, true);
    const doneTasks = document.getElementById("done-tasks")!;
    doneTasks.prepend(doneTaskElement);

    doneTaskElement.id = taskLocalStorage.addValue(true, task.innerText);
    localStorage.removeItem(taskElement.id);
    taskElement.remove();
}


export function deleteTask(taskElement: HTMLElement): void{
    // delete one task from the page and local storage.
    const taskId = taskElement.id
    taskElement.remove();
    localStorage.removeItem(taskId)
}


export function displayEditButton(taskElement: HTMLElement): void{
    const editeButton = taskElement.getElementsByClassName("edit-task")[0] as HTMLElement;
    editeButton.style.display = "inline";
    styleOfTaskElement(taskElement, false)
}


export function nonDisplayEditButton(taskElement: HTMLElement): void{
    const editeButton = taskElement.getElementsByClassName("edit-task")[0] as HTMLElement;
    editeButton.style.display = "none";
    styleOfTaskElement(taskElement, true)
}


export function styleOfTaskElement(taskElement: HTMLElement, normal=true): void{
    if (normal){
        taskElement.style.backgroundColor = "rgb(249, 252, 228)";
        taskElement.style.border = "1px solid black";
    }
    else{
        taskElement.style.backgroundColor = "rgb(252, 252, 252)";
        taskElement.style.border = "40px";
    }
}