import { deleteTask, moveDoneTask, editTaskByKeys, displayEditButton, nonDisplayEditButton, styleOfTaskElement } from './buttonsFunctions.js';


export function createTextElement(text: string): HTMLSpanElement {
    const newTextElement: HTMLSpanElement  = document.createElement("span");
    newTextElement.innerText = text;
    newTextElement.className = "text-task";
    return newTextElement;
}


export function createDeleteButton(): HTMLButtonElement{
    const newDeleteElement : HTMLButtonElement = document.createElement("button");
    newDeleteElement.setAttribute("type", "submit");
    newDeleteElement.className = "delete-task";
    newDeleteElement.innerText = "delete";
    newDeleteElement.addEventListener('click', (e: Event) => {
        const target = e.currentTarget as HTMLButtonElement;
        deleteTask(target.parentElement!)
        })
    return newDeleteElement;
}


export function createDoneButton(done: boolean = false): HTMLButtonElement{
    const newDoneElement: HTMLButtonElement = document.createElement("button");
    newDoneElement.setAttribute("type", "submit");
    if (!done){
        newDoneElement.className = "done-task";
        newDoneElement.innerText = "mark as done";
        newDoneElement.addEventListener('click', (e: Event) => {
            const target = e.currentTarget as HTMLButtonElement; 
            moveDoneTask(target.parentElement!); 
        })
    }
    else{
        newDoneElement.className="done"; 
        newDoneElement.innerText="done";
    }

    return newDoneElement;
}


export function createEditButton(): HTMLButtonElement{
    const newEditElement: HTMLButtonElement = document.createElement("button");
    newEditElement.setAttribute("type", "submit");
    newEditElement.className = "edit-task";
    newEditElement.innerText = "edit";
    newEditElement.addEventListener('click', (e: Event) => { editTaskByKeys(e.currentTarget as HTMLButtonElement) });
    return newEditElement;
}


export function createTaskFrame(isDone: boolean = false): HTMLLIElement{
    const taskFrame: HTMLLIElement = document.createElement("li");
    taskFrame.className = "task";
    if (!isDone){
        taskFrame.setAttribute("draggable", "true");
        taskFrame.addEventListener("dragstart", (e: DragEvent) => { 
            const target = e.currentTarget as HTMLLIElement; 
            e.dataTransfer?.setData("text", target.id);
            })
        taskFrame.addEventListener("mouseenter", (e: Event) => { displayEditButton(e.target as HTMLElement) });
        taskFrame.addEventListener("mouseleave", (e: Event) => { nonDisplayEditButton(e.target as HTMLElement) });
    }else{
        styleOfTaskElement(taskFrame, true);
    }
    return taskFrame;
}


export function createTaskElement(text: string, done: boolean = false): HTMLLIElement {
    const textElement: HTMLSpanElement = createTextElement(text);
    const deleteElement: HTMLButtonElement = createDeleteButton();
    const doneElement: HTMLButtonElement = createDoneButton(done);

    const fullTaskElement: HTMLLIElement = createTaskFrame(done);
    
    fullTaskElement.appendChild(textElement);
    fullTaskElement.appendChild(deleteElement);
    fullTaskElement.appendChild(doneElement);

    if (!done){
        const editElement: HTMLButtonElement = createEditButton();
        fullTaskElement.appendChild(editElement);
    }

    return fullTaskElement;
}