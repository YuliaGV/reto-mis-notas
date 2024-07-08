const createButton = document.getElementById('createButton');
const noteList = document.getElementById('noteList');
const newNote = document.getElementById('newNote');


const loadNotes = () => {
    const notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.forEach(note => {
        createNoteElement(note);
    });
};


const createNoteElement = (noteText) => {
    const note = document.createElement('div');
    note.className = 'note';

    const p = document.createElement('p');
    p.textContent = noteText;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Borrar';
    deleteButton.addEventListener('click', () => {
        noteList.removeChild(note);
        saveNotes();
    });

    note.appendChild(p);
    note.appendChild(deleteButton);
    noteList.appendChild(note);
};


const saveNotes = () => {
    const notes = [];
    document.querySelectorAll('.note p').forEach(note => {
        notes.push(note.textContent);
    });
    localStorage.setItem('notes', JSON.stringify(notes));
};

createButton.addEventListener('click', () => {
    const noteText = newNote.value.trim();
    if (noteText !== '') {
        createNoteElement(noteText);
        saveNotes();
        newNote.value = '';
    }
});


loadNotes();