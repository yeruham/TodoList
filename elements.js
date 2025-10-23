import { deleteTask, moveDoneTask, editTaskByKeys } from './buttonsFunctions.js';


export function createTextElement(text){
    const newTextElement  = document.createElement("span");
    newTextElement.innerText = text;
    newTextElement.className = "text-task";
    return newTextElement;
}


export function createDeleteButton(){
    const newDeleteElement = document.createElement("button");
    newDeleteElement.setAttribute("type", "submit");
    newDeleteElement.className = "delete-task";
    newDeleteElement.innerText = "delete";
    newDeleteElement.addEventListener('click', (e) => { deleteTask(e.target.parentElement) })
    return newDeleteElement;
}


export function createDoneButton(){
    const newDoneElement = document.createElement("button");
    newDoneElement.setAttribute("type", "submit");
    newDoneElement.className = "done-task";
    newDoneElement.innerText = "mark as done";
    newDoneElement.addEventListener('click', (e) => { 
        e.target.className="done"; 
        e.target.innerText="done"; 
        moveDoneTask(e.target.parentElement) 
    })
    return newDoneElement;
}


export function createEditButton(){
    const newEditElement = document.createElement("button");
    newEditElement.setAttribute("type", "submit");
    newEditElement.className = "edit-task";
    newEditElement.innerText = "edit";
    newEditElement.addEventListener('click', (e) => { editTaskByKeys(e) });
    return newEditElement;
}


export function createTaskElement(text){
    const textElement = createTextElement(text);
    const editElement = createEditButton();
    const deleteElement = createDeleteButton();
    const doneElement = createDoneButton();

    const fullTaskElement = document.createElement("li");
    fullTaskElement.className = "task";
    
    fullTaskElement.appendChild(textElement);
    fullTaskElement.appendChild(editElement);
    fullTaskElement.appendChild(deleteElement);
    fullTaskElement.appendChild(doneElement);

    return fullTaskElement;
}