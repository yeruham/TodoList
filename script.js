import * as taskLocalStorage from './taskLocalStorage.js';
import * as elements from './elements.js';


function readInput(id){
    const taskInput = document.getElementById(id);
    const value = taskInput.value;
    taskInput.value = "";
    return value;
}


function addNewTask(inputId, listTasksId){
    const newTask = readInput(inputId);
    if (!newTask){
        return;
    }
    const listTasks = document.getElementById(listTasksId);
    const newTaskElement = elements.createTaskElement(newTask);
    listTasks.appendChild(newTaskElement);

    newTaskElement.id = taskLocalStorage.addValue(false, newTask)
}



function addTaskByEnter(key, inputId, listTaskId){
    if (key != "Enter"){
        return;
    }
    addNewTask( inputId, listTaskId);
}


function deleteTasks(listTasksId){
    const doneTasks = document.getElementById(listTasksId);
    doneTasks.innerHTML = "";
}


const listTasksId = "todo-tasks"
const listDoneTasksId = "done-tasks"
const inputId = "input-task"


// create click evenet on add-task button - for add text from input button
const saveNewTask = document.getElementById("add-button");
saveNewTask.addEventListener('click', () => { addNewTask(inputId, listTasksId) });

// create keydown evenet on input text - add text by Enter key
const inputTask = document.getElementById("input-task");
inputTask.addEventListener('keydown', (event) => { addTaskByEnter(event.key, inputId, listTasksId) });

// create click evenet on delete-all button - to delete all the tasks
const deleteAll = document.getElementById("delete-all-tasks");
deleteAll.addEventListener('click', () => {
    deleteTasks(listTasksId);
    deleteTasks(listDoneTasksId);
    localStorage.clear(); 
});

// create click evenet on delete-done-tasks button - to dealte all done tasks
const deleteDoneTasks = document.getElementById("delete-done-tasks");
deleteDoneTasks.addEventListener('click', () => {
    deleteTasks(listDoneTasksId);
    taskLocalStorage.deleteDoneTasks();
});

// pulls out all the exist task from the local storage 
taskLocalStorage.tasksFromLocalStorage(listTasksId, listDoneTasksId)


const listTasks = document.getElementById(listTasksId)
listTasks.addEventListener("dragover", (e) => { 
        e.preventDefault();
       })


listTasks.addEventListener("drop", (e) => {
    // console.log(e.target);
    const draggedElement = document.getElementById(e.dataTransfer.getData("text"));
    // listTasks.appendChild(draggedElement);
    const afterElement = getDragAfterElement(listTasks, e.clientY)
    // console.log(afterElement)
    // if (afterElement == undefined){
    //     listTasks.appendChild(draggedElement) // add to the end
    // }else{
        if (afterElement.getBoundingClientRect().y > draggedElement.getBoundingClientRect().y){
            console.log("down")
            listTasks.insertBefore(draggedElement, afterElement.nextSibling) 
        }
        else{
            console.log("up")
            listTasks.insertBefore(draggedElement, afterElement)
        }
})


// const getDragAfterElement = (container, y) => {
//   const notDraggedCards =
//     [...container.querySelectorAll(".task:not(.dragging)")]
  
//   return notDraggedCards.reduce((closest, child) => {
//     console.log()
//     const box = child.getBoundingClientRect()
//     const offset = y - box.top - box.height / 2
//     console.log(offset)
//     if (offset < 0 && offset > closest.offset) {
//       return { offset, element: child }
//     } else return closest
//   }, { offset: Number.NEGATIVE_INFINITY }).element
// }


function getDragAfterElement(listTasks, clientY){
    const notDraggedTasks =  listTasks.getElementsByClassName("task");
    let x = Number.POSITIVE_INFINITY;
    let elementIndex;
    for (let i = 0; i < notDraggedTasks.length; i++){
        const box = notDraggedTasks[i].getBoundingClientRect();
        const offset = clientY - box.top - box.height / 2
        console.log(notDraggedTasks[i], offset)
        const distance = Math.abs(offset)
        if (distance < x){
            x = distance
            elementIndex = i;
        }
    }
        return notDraggedTasks[elementIndex] 
}

// const a = [1, 2, 3, 4, 5]
// console.log(a.reduce((sum, num) => { return sum -= num }, 0))


//   const notDraggedCards = [...listTasks.querySelectorAll(".task")];
//   for (let element of notDraggedCards){
//     console.log(element)
//     console.log(element.getBoundingClientRect())
//   }
