import { createDoneButton } from './elements.js';
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
            taskLocalStorage.editValue(localStorageKey, taskId, editButton.value);

        }else if (e.key == "Escape"){
            editButton.replaceWith(currentTaskElement);
        }else{
            return;
        } 
    })
}


export function moveDoneTask(taskElement){
    // move done task from tasks element to done-tasks element and from tasks key to done-tasks in local storage.
    // accepts as a parameter event of done button. \
    taskElement.getElementsByClassName("done-task")[0].remove()
    taskElement.appendChild(createDoneButton(true))
    let localStorageKey = taskElement.parentElement.id;
    taskLocalStorage.deleteValue(localStorageKey, taskElement.id);

    const doneTasks = document.getElementById("done-tasks");
    doneTasks.appendChild(taskElement);
    localStorageKey = doneTasks.id;
    const textTask = taskElement.getElementsByClassName("text-task")[0].innerText;
    taskElement.id = taskLocalStorage.addValue(localStorageKey, textTask);
}


export function deleteTask(taskElement){
    // delete one task from the page and local storage.  
    const taskId = taskElement.id
    const localStorageKey = taskElement.parentElement.id
    taskElement.remove();
    taskLocalStorage.deleteValue(localStorageKey, taskId);
}