// Get modal elements
const modal = document.getElementById('myModal');
const openModalBtn = document.getElementById('openModal');
const closeModalBtn = document.getElementsByClassName('close')[0];

// Open modal
openModalBtn.onclick = function() {
    modal.style.display = 'block';
}

// Close modal
closeModalBtn.onclick = function() {
    modal.style.display = 'none';
}

// Close modal when clicking outside of it
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
}

let editMode = false;
let currentEditItem = null;

document.getElementById('webForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const pageName = document.getElementById('pageName').value;
    const pageURL = document.getElementById('pageURL').value;
    const timeLimitHours = parseInt(document.getElementById('timeLimitHours').value);
    const timeLimitMinutes = parseInt(document.getElementById('timeLimitMinutes').value);

    const totalMinutes = (timeLimitHours * 60) + timeLimitMinutes;
    const remainingHours = Math.floor(totalMinutes / 60);
    const remainingMinutes = totalMinutes % 60;

    if (editMode) {
        // Update the current item
        currentEditItem.innerHTML = `
            <span><strong>${pageName}</strong> (${pageURL}): ${remainingHours} horas y ${remainingMinutes} minutos restantes</span>
            <div>
                <button class="edit">Editar</button>
                <button class="delete">Eliminar</button>
            </div>
        `;
        addEventListeners(currentEditItem);
        editMode = false;
        currentEditItem = null;
    } else {
        // Create a new item
        const webListItems = document.getElementById('webListItems');
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            <span><strong>${pageName}</strong> (${pageURL}): ${remainingHours} horas y ${remainingMinutes} minutos restantes</span>
            <div>
                <button class="edit">Editar</button>
                <button class="delete">Eliminar</button>
            </div>
        `;
        webListItems.appendChild(listItem);
        addEventListeners(listItem);
    }

    // Mostrar la lista
    document.getElementById('webList').classList.remove('hidden');

    // Limpiar el formulario
    document.getElementById('webForm').reset();
    modal.style.display = 'none';
});

function addEventListeners(listItem) {
    listItem.querySelector('.delete').addEventListener('click', function() {
        listItem.remove();
    });

    listItem.querySelector('.edit').addEventListener('click', function() {
        const parts = listItem.querySelector('span').innerText.split(': ');
        const nameAndURL = parts[0].split(' (');
        const timeParts = parts[1].split(' y ');
        const hours = parseInt(timeParts[0]);
        const minutes = parseInt(timeParts[1]);

        document.getElementById('pageName').value = nameAndURL[0];
        document.getElementById('pageURL').value = nameAndURL[1].slice(0, -1); // Remove the closing parenthesis
        document.getElementById('timeLimitHours').value = hours;
        document.getElementById('timeLimitMinutes').value = minutes;

        editMode = true;
        currentEditItem = listItem;

        // Open modal for editing
        modal.style.display = 'block';
    });
}