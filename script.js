const saveNewTask = document.getElementById("add-button")
// console.log(saveNewTask)
saveNewTask.addEventListener('click', addNewTask)

function addNewTask(){
    const listTask = document.getElementById("body")
    // console.log(listTask)
    const newTask = document.getElementById("input-task")
    // console.log(newTask)
    if (!newTask.value){
        return
    }
    const tasks = document.getElementById("list-tasks")
    // console.log(tasks)
    const task = document.createElement("li")
    task.className = "task"
    task.innerText = newTask.value
    tasks.appendChild(task)
    newTask.value = ""
}



