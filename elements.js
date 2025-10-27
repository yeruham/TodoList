import { deleteTask, moveDoneTask, editTaskByKeys, displayEditButton, nonDisplayEditButton, styleOfTaskElement } from './buttonsFunctions.js';


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


export function createDoneButton(done=false){
    const newDoneElement = document.createElement("button");
    newDoneElement.setAttribute("type", "submit");
    if (!done){
        newDoneElement.className = "done-task";
        newDoneElement.innerText = "mark as done";
        newDoneElement.addEventListener('click', (e) => { 
        moveDoneTask(e.target.parentElement)  
    })
    }
    else{
        newDoneElement.className="done"; 
        newDoneElement.innerText="done";
    }

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


export function createTaskFrame(isDone=false){
    const taskFrame = document.createElement("li");
    taskFrame.className = "task";
    if (!isDone){
        taskFrame.setAttribute("draggable", true);
        taskFrame.addEventListener("dragstart", (e) => { 
        e.dataTransfer.setData("text", e.target.id);
        })
        taskFrame.addEventListener("mouseenter", (e) => { displayEditButton(e.target) });
        taskFrame.addEventListener("mouseleave", (e) => { nonDisplayEditButton(e.target) });
    }else{
        styleOfTaskElement(taskFrame, true);
    }
    return taskFrame;
}


export function createTaskElement(text, done=false){
    const textElement = createTextElement(text);
    const deleteElement = createDeleteButton();
    const doneElement = createDoneButton(done);

    const fullTaskElement = createTaskFrame(done);
    
    fullTaskElement.appendChild(textElement);
    fullTaskElement.appendChild(deleteElement);
    fullTaskElement.appendChild(doneElement);

    if (!done){
        const editElement = createEditButton();
        fullTaskElement.appendChild(editElement);
    }

    return fullTaskElement;
}