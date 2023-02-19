const dom = {
    new: document.getElementById('new'),
    add: document.getElementById('add'),
    tasks: document.getElementById('tasks')
}
const tasks = [];

// task on click
dom.add.onclick = () => {
    const newTaskText = dom.new.value;
    if (newTaskText && isNotHaveTask(newTaskText, tasks)) {
        addTask(newTaskText, tasks);
        dom.new.value = '';
        tasksRender(tasks);

    }
}

// add task function

function addTask(text, list) {
    const timestamp = Date.now();
    const task = {
        id: timestamp,
        text,
        isComplete: false
    }
    list.push(task);

}

// check if task already exists
function isNotHaveTask(text, list) {
    let isNotHave = true;
    if (!list.length) {
        return true;
    }

    list.forEach((task) => {
        if (task.text === text) {
            alert('Task exists.');
            isNotHave = false;
        }
    })
    return isNotHave;
}

//function to show tasks
function tasksRender(list) {
    let htmlList = '';
    list.forEach(task => {
        const cls = task.isComplete ? 'todo__task todo__task_complete' : 'todo__task';
        const checked = task.isComplete ? 'checked' : '';
        const taskHtml = `
        <div id ="${task.id}" class="${cls}">
        <label class="todo__checkbox">
            <input type="checkbox" ${checked}><div class = "todo__checkbox-div"></div>
        </label>
        <div class="todo__task-text">${task.text}</div>
        <div class="todo__task-del">-</div>
    </div>
        `;
        htmlList = htmlList + taskHtml;
    })
    dom.tasks.innerHTML = htmlList;
}

// click on checkbox

dom.tasks.onclick = (event) => {
    const target = event.target;
    const isCheckboxEl = target.classList.contains('todo__checkbox-div');
    const deleteEl = target.classList.contains('todo__task-del');
    if (isCheckboxEl) {
        //const isComplete = target.previousElementSibling.checked;
        const task = target.parentElement.parentElement;
        const taskId = task.getAttribute('id');
        changeTaskStatus(taskId, tasks);
        tasksRender(tasks);
    }
    if (deleteEl) {
        const task = target.parentElement;
        const taskId = task.getAttribute('id');
        deleteTask(taskId, tasks);
        tasksRender(tasks);
    }
}
function changeTaskStatus(id, list) {
    list.forEach((task) => {
        if (task.id == id) {
            task.isComplete = !task.isComplete;
        }
    })
}

// delete task
function deleteTask(id, list) {
    list.forEach((task, i) => {
        if (task.id == id) {
            delete list[i];
            console.log(list[i]);
        }
    })
}
