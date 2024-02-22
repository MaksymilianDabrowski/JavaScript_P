/*
1. Aplikacja ma wyświetlać notatki
2. Zaimplementować przyciski dodaj, edytuj, usuń
3. atrybuty notatek - tytuł, zawartość, kolor, przypięcie i data
4. localStorage? 

Przycisk edytuj i usuń musi być przy istniejącej notatce!
*/

// główne odświeżenie zawartości
document.addEventListener("DOMContentLoaded", function () {
    displayNotes();
});


// dodaj
function addNote() {
    const title = document.getElementById('title').value;
    const content = document.getElementById('content').value;
    const color = document.getElementById('color').value;
    const pin = document.getElementById('pin').checked;
    const date = new Date().toLocaleString();

    const note = {
        title: title,
        content: content,
        color: color,
        pin: pin,
        date: date
    };

    const notes = JSON.parse(localStorage.getItem('notes')) || [];

    notes.push(note);

    localStorage.setItem('notes', JSON.stringify(notes));

    displayNotes();
}

// wyświetlanie notatek na stronie w osobnej funkcji
function displayNotes() {
    const notesContainer = document.getElementById('notesContainer');
    notesContainer.innerHTML = '';

    // notatki z localStorage
    const notes = JSON.parse(localStorage.getItem('notes')) || [];

    // wyświetlanie
    notes.forEach((note, index) => {
        const noteElement = document.createElement('div');
        noteElement.classList.add('note');
        noteElement.style.backgroundColor = note.color;

        const titleElement = document.createElement('h3');
        titleElement.textContent = note.title;
        noteElement.appendChild(titleElement);

        const contentElement = document.createElement('p');
        contentElement.textContent = note.content;
        noteElement.appendChild(contentElement);

        const colorElement = document.createElement('p');
        colorElement.textContent = 'Kolor: ' + note.color;
        noteElement.appendChild(colorElement);

        const pinElement = document.createElement('p');
        pinElement.textContent = 'Przypięcie: ' + (note.pin ? 'Yes' : 'No');
        noteElement.appendChild(pinElement);

        const dateElement = document.createElement('p');
        dateElement.textContent = 'Data: ' + note.date;
        noteElement.appendChild(dateElement);

        // Przycisk edytuj i usuń musi być przy istniejącej notatce!
        const editButton = document.createElement('button');
        editButton.textContent = 'Edytuj';
        editButton.addEventListener('click', () => editNote(index));
        noteElement.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Usuń';
        deleteButton.addEventListener('click', () => deleteNote(index));
        noteElement.appendChild(deleteButton);

        notesContainer.appendChild(noteElement);
    });

    // edytuj
    function editNote(index) {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        const noteToEdit = notes[index];

        // edytor
        const modal = document.createElement('div');
        modal.classList.add('modal');
        const header = document.createElement('h2');
        header.textContent = 'Edit Note';
        modal.appendChild(header);

        const titleLabel = document.createElement('label');
        titleLabel.textContent = 'Tytuł:';
        const titleInput = document.createElement('input');
        titleInput.type = 'text';
        titleInput.id = 'editTitle';
        titleInput.value = noteToEdit.title;
        modal.appendChild(titleLabel);
        modal.appendChild(titleInput);
        modal.appendChild(document.createElement('br'));

        const contentLabel = document.createElement('label');
        contentLabel.textContent = 'Kontent:';
        const contentTextarea = document.createElement('textarea');
        contentTextarea.id = 'editContent';
        contentTextarea.textContent = noteToEdit.content;
        modal.appendChild(contentLabel);
        modal.appendChild(contentTextarea);
        modal.appendChild(document.createElement('br'));

        const colorLabel = document.createElement('label');
        colorLabel.textContent = 'Kolor:';
        const colorInput = document.createElement('input');
        colorInput.type = 'color';
        colorInput.id = 'editColor';
        colorInput.value = noteToEdit.color;
        modal.appendChild(colorLabel);
        modal.appendChild(colorInput);
        modal.appendChild(document.createElement('br'));

        const pinLabel = document.createElement('label');
        pinLabel.textContent = 'Przypięcie:';
        const pinCheckbox = document.createElement('input');
        pinCheckbox.type = 'checkbox';
        pinCheckbox.id = 'editPin';
        pinCheckbox.checked = noteToEdit.pin;
        modal.appendChild(pinLabel);
        modal.appendChild(pinCheckbox);
        modal.appendChild(document.createElement('br'));

        const saveButton = document.createElement('button');
        saveButton.textContent = 'Zapisz';
        saveButton.addEventListener('click', () => saveEdit(index));
        const cancelButton = document.createElement('button');
        cancelButton.textContent = 'Cofnij';
        cancelButton.addEventListener('click', closeModal);

        modal.appendChild(saveButton);
        modal.appendChild(cancelButton);

        document.body.appendChild(modal);
    }
    function saveEdit(index) {
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        const editedNote = notes[index];

        editedNote.title = document.getElementById('editTitle').value;
        editedNote.content = document.getElementById('editContent').value;
        editedNote.color = document.getElementById('editColor').value;
        editedNote.pin = document.getElementById('editPin').checked;

        localStorage.setItem('notes', JSON.stringify(notes));

        closeModal();
        displayNotes();
    }

    // usuwa edytor 
    function closeModal() {
        const modal = document.querySelector('.modal');
        if (modal) {
            modal.remove();
        }
    }
    // usuń
    function deleteNote(index) {
        // usunięcie z localStorage
        const notes = JSON.parse(localStorage.getItem('notes')) || [];
        notes.splice(index, 1);
        localStorage.setItem('notes', JSON.stringify(notes));

        // display
        displayNotes();
    }
}    
