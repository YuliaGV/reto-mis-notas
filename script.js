const createButton = document.getElementById('createButton');
const noteList = document.getElementById('noteList');
const newNote = document.getElementById('newNote');


let notes = [];

const loadNotes = () => {
    notes = JSON.parse(localStorage.getItem('notes')) || [];
    notes.forEach(note => {
        createNoteElement(note);
    });
};


const createNoteElement = (noteObj) => {
    const note = document.createElement('div');
    note.className = 'note';

    const p = document.createElement('p');
    p.textContent = noteObj.text

    const d = document.createElement('p');
    d.textContent = noteObj.date

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Borrar';
    deleteButton.addEventListener('click', () => {
        noteList.removeChild(note);

        //notes = notes.filter(note => note.date != noteObj.date)

        let index = notes.findIndex(note => note.date == noteObj.date)
        notes.splice(index, 1)



        saveNotes();
    });


    const editButton = document.createElement('button');
    editButton.textContent = 'Editar';
    editButton.addEventListener('click', () => {
        
        noteObj.text = 'Text'
        p.textContent = noteObj.text
        console.log(notes)
        saveNotes();
    });

    note.appendChild(p);
    note.appendChild(d)
    note.appendChild(deleteButton);
    note.appendChild(editButton);
    noteList.appendChild(note);
};


const saveNotes = () => {
    localStorage.setItem('notes', JSON.stringify(notes));
};

createButton.addEventListener('click', () => {
    const noteText = newNote.value.trim();
    if (noteText !== '') {
        let date = new Date()
        let newNoteObj = {
            text: noteText,
            date: date
        }
        createNoteElement(newNoteObj);
        notes.push(newNoteObj)
        saveNotes();
        newNote.value = '';
    }
});


loadNotes();