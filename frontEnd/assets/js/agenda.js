document.addEventListener("DOMContentLoaded", () => {
    generateCalendar(new Date().getFullYear());
});

function generateCalendar(year) {
    const calendar = document.getElementById("calendar");
    calendar.innerHTML = '';

    const months = [
        "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
        "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
    ];

    months.forEach((month, monthIndex) => {
        const monthDiv = document.createElement("div");
        monthDiv.className = "month";

        const monthHeader = document.createElement("div");
        monthHeader.className = "month-header";
        monthHeader.textContent = `${month} ${year}`;
        monthDiv.appendChild(monthHeader);

        const daysDiv = document.createElement("div");
        daysDiv.className = "days";

        const daysInMonth = new Date(year, monthIndex + 1, 0).getDate();

        for (let day = 1; day <= daysInMonth; day++) {
            const date = new Date(year, monthIndex, day);
            const dayDiv = document.createElement("div");
            dayDiv.className = "day";
            dayDiv.dataset.date = date.toISOString().split('T')[0];

            const dayHeader = document.createElement("div");
            dayHeader.className = "day-header";
            dayHeader.textContent = `${month} ${day}, ${year}`;
            dayDiv.appendChild(dayHeader);

            const taskInputDiv = document.createElement("div");
            taskInputDiv.className = "task-input";

            const taskInput = document.createElement("input");
            taskInput.type = "text";
            taskInput.placeholder = "Nueva tarea";
            taskInputDiv.appendChild(taskInput);

            const addButton = document.createElement("button");
            addButton.textContent = "Agregar";
            addButton.onclick = () => addTask(dayDiv, taskInput.value);
            taskInputDiv.appendChild(addButton);

            dayDiv.appendChild(taskInputDiv);

            daysDiv.appendChild(dayDiv);
        }

        monthDiv.appendChild(daysDiv);
        calendar.appendChild(monthDiv);
    });
}

function addTask(dayDiv, taskText) {
    if (taskText.trim() === "") {
        alert("Por favor, ingresa una tarea.");
        return;
    }

    const taskDiv = document.createElement("div");
    taskDiv.className = "task";

    const taskInputField = document.createElement("input");
    taskInputField.type = "text";
    taskInputField.value = taskText;
    taskInputField.disabled = true;

    const editButton = document.createElement("button");
    editButton.textContent = "Editar";
    editButton.onclick = () => editTask(taskInputField, editButton);
    editButton.className = "task-button";

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Eliminar";
    deleteButton.onclick = () => deleteTask(taskDiv);
    deleteButton.className = "task-button";

    taskDiv.appendChild(taskInputField);
    taskDiv.appendChild(editButton);
    taskDiv.appendChild(deleteButton);

    dayDiv.appendChild(taskDiv);
}

function editTask(taskInputField, editButton) {
    if (taskInputField.disabled) {
        taskInputField.disabled = false;
        editButton.textContent = "Guardar";
        taskInputField.focus();
    } else {
        taskInputField.disabled = true;
        editButton.textContent = "Editar";
    }
}

function deleteTask(taskDiv) {
    taskDiv.remove();
}

