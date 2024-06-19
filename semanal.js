let tasks = JSON.parse(localStorage.getItem('tasks')) || {};

        document.addEventListener("DOMContentLoaded", () => {
            generateCalendar(new Date().getFullYear(), new Date().getMonth());
            updateTaskList();
        });

        function generateCalendar(year, month) {
            const calendar = document.getElementById("calendar");
            calendar.innerHTML = '';

            let weekNumber = 1;
            let currentWeek = createWeekDiv(weekNumber);

            const startDate = new Date(year, month, 1);
            const endDate = new Date(year, month + 1, 0);

            for (let day = startDate; day <= endDate; day.setDate(day.getDate() + 1)) {
                if (day.getDay() === 1 || day.getDate() === 1) {
                    if (currentWeek.childElementCount > 1) {
                        calendar.appendChild(currentWeek);
                    }
                    currentWeek = createWeekDiv(weekNumber);
                    weekNumber++;
                }

                const dayDiv = createDayDiv(day);
                currentWeek.querySelector('.week').appendChild(dayDiv);
            }

            if (currentWeek.childElementCount > 1) {
                calendar.appendChild(currentWeek);
            }
        }

        function createWeekDiv(weekNumber) {
            const weekContainer = document.createElement("div");
            weekContainer.className = "week-container";

            const weekLabel = document.createElement("div");
            weekLabel.className = "week-label";
            weekLabel.textContent = `Semana ${weekNumber}`;
            weekContainer.appendChild(weekLabel);

            const weekDiv = document.createElement("div");
            weekDiv.className = "week";
            weekContainer.appendChild(weekDiv);

            return weekContainer;
        }

        function createDayDiv(date) {
            const dayDiv = document.createElement("div");
            dayDiv.className = "day";
            dayDiv.dataset.date = date.toISOString().split('T')[0];

            const dayHeader = document.createElement("div");
            dayHeader.className = "day-header";
            dayHeader.textContent = `${date.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}`;
            dayDiv.appendChild(dayHeader);

            const taskInputDiv = document.createElement("div");
            taskInputDiv.className = "task-input";

            const taskInput = document.createElement("input");
            taskInput.type = "text";
            taskInput.placeholder = "Nueva tarea";
            taskInputDiv.appendChild(taskInput);

            const prioritySelect = document.createElement("select");
            ["Baja", "Media", "Alta"].forEach(priority => {
                const option = document.createElement("option");
                option.value = priority;
                option.textContent = priority;
                prioritySelect.appendChild(option);
            });
            taskInputDiv.appendChild(prioritySelect);

            const startTimeInput = document.createElement("input");
            startTimeInput.type = "time";
            taskInputDiv.appendChild(startTimeInput);

            const endTimeInput = document.createElement("input");
            endTimeInput.type = "time";
            taskInputDiv.appendChild(endTimeInput);

            const addButton = document.createElement("button");
            addButton.textContent = "Agregar";
            addButton.onclick = () => addTask(dayDiv, taskInput.value, prioritySelect.value, startTimeInput.value, endTimeInput.value);
            taskInputDiv.appendChild(addButton);

            dayDiv.appendChild(taskInputDiv);

            return dayDiv;
        }

        function addTask(dayDiv, taskText, taskPriority, startTime, endTime) {
            if (taskText.trim() === "") {
                alert("Por favor, ingresa una tarea.");
                return;
            }

            if (startTime.trim() === "" || endTime.trim() === "") {
                alert("Por favor, ingresa la hora de inicio y finalización de la tarea.");
                return;
            }

            const date = dayDiv.dataset.date;
            if (!tasks[date]) {
                tasks[date] = [];
            }

            const task = {
                id: new Date().getTime(),
                text: taskText,
                priority: taskPriority,
                startTime: startTime,
                endTime: endTime
            };

            tasks[date].push(task);
            saveTasks();
            alert(`Tarea agregada para el ${date}`);
            updateTaskList();
        }

        function updateTaskList() {
            const taskList = document.getElementById("task-list-items");
            taskList.innerHTML = "";

            for (const [date, tasksArray] of Object.entries(tasks)) {
                tasksArray.forEach(task => {
                    const listItem = document.createElement("li");
                    listItem.textContent = `${date}: ${task.text} (Prioridad: ${task.priority}, De: ${task.startTime} a ${task.endTime})`;

                    const editButton = document.createElement("button");
                    editButton.textContent = "Editar";
                    editButton.onclick = () => editTask(date, task.id);
                    editButton.className = "task-button";

                    const deleteButton = document.createElement("button");
                    deleteButton.textContent = "Eliminar";
                    deleteButton.onclick = () => deleteTask(date, task.id);
                    deleteButton.className = "task-button";

                    listItem.appendChild(editButton);
                    listItem.appendChild(deleteButton);
                    taskList.appendChild(listItem);
                });
            }
        }

        function editTask(date, taskId) {
            const task = tasks[date].find(task => task.id === taskId);
            if (task) {
                const newTaskText = prompt("Editar tarea:", task.text);
                const newPriority = prompt("Editar prioridad (Baja, Media, Alta):", task.priority);
                const newStartTime = prompt("Editar hora de inicio:", task.startTime);
                const newEndTime = prompt("Editar hora de fin:", task.endTime);

                if (newTaskText !== null && newPriority !== null && newStartTime !== null && newEndTime !== null) {
                    task.text = newTaskText;
                    task.priority = newPriority;
                    task.startTime = newStartTime;
                    task.endTime = newEndTime;

                    saveTasks();
                    updateTaskList();
                }
            }
        }

        function deleteTask(date, taskId) {
            tasks[date] = tasks[date].filter(task => task.id !== taskId);
            if (tasks[date].length === 0) {
                delete tasks[date];
            }

            saveTasks();
            updateTaskList();
        }

        function saveTasks() {
            localStorage.setItem('tasks', JSON.stringify(tasks));
        }
        