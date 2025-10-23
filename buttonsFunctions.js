import * as taskLocalStorage from './taskLocalStorage.js';


export function editTaskByKeys(e){
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
            taskLocalStorage.editValue(localStorageKey, taskId, editButton.value);

        }else if (e.key == "Escape"){
            editButton.replaceWith(currentTaskElement);
        }else{
            return;
        } 
    })
}


export function moveDoneTask(taskElement){
    let localStorageKey = taskElement.parentElement.id
    console.log(localStorageKey)
    taskLocalStorage.deleteValue(localStorageKey, taskElement.id)

    const doneTasks = document.getElementById("done-tasks");
    doneTasks.appendChild(taskElement);

    localStorageKey = doneTasks.id;
    const textTask = taskElement.getElementsByClassName("text-task")[0].innerText;
    taskElement.id = taskLocalStorage.addValue(localStorageKey, textTask);
}


export function deleteTask(taskElement){
    const taskId = taskElement.id
    const localStorageKey = taskElement.parentElement.id
    taskElement.remove();
    taskLocalStorage.deleteValue(localStorageKey, taskId);
}