document.addEventListener('DOMContentLoaded', function() {
    const taskForm = document.getElementById('task-form');
    const taskList = document.getElementById('task-list');
    const taskModal = document.getElementById('task-modal');
    const openModalButton = document.getElementById('open-modal');
    const closeModalButton = document.querySelector('.close');
    let tasks = [];
    let editingTaskId = null;

    openModalButton.addEventListener('click', function() {
        taskModal.style.display = 'block';
    });

    closeModalButton.addEventListener('click', function() {
        taskModal.style.display = 'none';
    });

    window.addEventListener('click', function(event) {
        if (event.target === taskModal) {
            taskModal.style.display = 'none';
        }
    });

    taskForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const taskId = document.getElementById('task-id').value;
        const taskDate = document.getElementById('task-date').value;
        const taskTimeStart = document.getElementById('task-time-start').value;
        const taskTimeEnd = document.getElementById('task-time-end').value;
        const taskName = document.getElementById('task-name').value;
        const taskPriority = document.getElementById('task-priority').value;

        const task = {
            id: taskId || Date.now().toString(),
            date: taskDate,
            timeStart: taskTimeStart,
            timeEnd: taskTimeEnd,
            name: taskName,
            priority: taskPriority
        };

        if (editingTaskId) {
            tasks = tasks.map(t => t.id === editingTaskId ? task : t);
            editingTaskId = null;
        } else {
            tasks.push(task);
        }

        renderTasks();
        taskForm.reset();
        document.getElementById('task-id').value = '';
        taskModal.style.display = 'none';
    });

    function renderTasks() {
        taskList.innerHTML = '<h2>Tareas</h2>';
        tasks.forEach(task => {
            const taskElement = document.createElement('div');
            taskElement.className = 'task';

            const taskDetails = document.createElement('div');
            taskDetails.className = 'details';
            taskDetails.innerHTML = `
                <strong>${task.name}</strong><br>
                ${task.date} ${task.timeStart} - ${task.timeEnd}<br>
                Prioridad: ${task.priority}
            `;

            const taskActions = document.createElement('div');
            taskActions.className = 'actions';

            const editButton = document.createElement('button');
            editButton.className = 'edit-btn';
            editButton.innerText = 'Editar';
            editButton.addEventListener('click', () => editTask(task.id));

            const deleteButton = document.createElement('button');
            deleteButton.className = 'delete-btn';
            deleteButton.innerText = 'Eliminar';
            deleteButton.addEventListener('click', () => deleteTask(task.id));

            taskActions.appendChild(editButton);
            taskActions.appendChild(deleteButton);

            taskElement.appendChild(taskDetails);
            taskElement.appendChild(taskActions);

            taskList.appendChild(taskElement);
        });
    }

    function editTask(taskId) {
        const task = tasks.find(t => t.id === taskId);
        if (task) {
            document.getElementById('task-id').value = task.id;
            document.getElementById('task-date').value = task.date;
            document.getElementById('task-time-start').value = task.timeStart;
            document.getElementById('task-time-end').value = task.timeEnd;
            document.getElementById('task-name').value = task.name;
            document.getElementById('task-priority').value = task.priority;
            editingTaskId = taskId;
            taskModal.style.display = 'block';
        }
    }

    function deleteTask(taskId) {
        tasks = tasks.filter(task => task.id !== taskId);
        renderTasks();
    }
    renderTasks();
});




