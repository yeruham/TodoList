import { createDoneButton, createTaskElement } from './elements.js';
import * as taskLocalStorage from './taskLocalStorage.js';


export function editTaskByKeys(e){
    // edit text of task element in page and local storage - replace current element with button element.
    // accepts as a parameter event of edit button.
    const currentTaskElement = e.target.parentElement;
    const currentTextElement = currentTaskElement.getElementsByClassName("text-task")[0]

    const editButton = document.createElement("input")
    editButton.className = "input-text"
    editButton.value = currentTextElement.innerText

    currentTaskElement.replaceWith(editButton)

    // listens to the computer keys. by Enter key saving the changes on the original element - 
    // loads it to the page again, and in local storage.
    // by Escape key cancels changes and return original element as it was. 
    editButton.addEventListener("keydown", (e) => {     
        if (e.key == "Enter"){
            currentTextElement.innerText = editButton.value;
            editButton.replaceWith(currentTaskElement);

            const localStorageKey = currentTaskElement.parentElement.id;
            const taskId = currentTaskElement.id;
            taskLocalStorage.editValue(taskId, editButton.value);

        }else if (e.key == "Escape"){
            editButton.replaceWith(currentTaskElement);
        }else{
            return;
        } 
    })
}


export function moveDoneTask(taskElement){
    // move done task from tasks element to done-tasks element and from tasks key to done-tasks in local storage.
    // accepts as a parameter event of done button. 

    const textTask = taskElement.getElementsByClassName("text-task")[0].innerText;
    const doneTaskElement = createTaskElement(textTask, true);
    const doneTasks = document.getElementById("done-tasks");
    doneTasks.prepend(doneTaskElement);

    doneTaskElement.id = taskLocalStorage.addValue(true, textTask);
    localStorage.removeItem(taskElement.id);
    taskElement.remove();
}


export function deleteTask(taskElement){
    // delete one task from the page and local storage.
    const taskId = taskElement.id
    taskElement.remove();
    localStorage.removeItem(taskId)
}


export function displayEditButton(taskElement){
    const editeButton = taskElement.getElementsByClassName("edit-task")[0]
    editeButton.style.display = "inline";
    styleOfTaskElement(taskElement, false)
}


export function nonDisplayEditButton(taskElement){
    const editeButton = taskElement.getElementsByClassName("edit-task")[0]
    editeButton.style.display = "none";
    styleOfTaskElement(taskElement, true)
}


export function styleOfTaskElement(taskElement, normal=true){
    if (normal){
        taskElement.style.backgroundColor = "rgb(249, 252, 228)";
        taskElement.style.border = "1px solid black";
    }
    else{
        taskElement.style.backgroundColor = "rgb(252, 252, 252)";
        taskElement.style.border = "40px";
    }
}