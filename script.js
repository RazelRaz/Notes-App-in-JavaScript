const add_box = document.querySelector('.add_box');
const popup_box = document.querySelector('.popup_box');
const close = document.querySelector('.close');
const addNoteBtn = document.querySelector('button');
const titleTag = document.querySelector('input');
const descTag = document.querySelector('textarea');

const popupTitle = document.querySelector('header p');

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// open popup
add_box.addEventListener('click', () => {
    titleTag.focus()
    popup_box.classList.add("show")
})

//getting localstorage notes if exist and parsing them
//to js object else passing an empty array to notes
const notes = JSON.parse(localStorage.getItem('notes') || '[]');
let isUpdate = false, updateId;


//remove popup
close.addEventListener('click', () => {
    isUpdate = false
    titleTag.value = ''
    descTag.value = ''
    addNoteBtn.innerText = 'Publish'
    popupTitle.innerText = 'Add New Notes'
    popup_box.classList.remove("show")
})


// show notes data
function showNotes(){
    document.querySelectorAll('.note').forEach(note => note.remove());
    notes.forEach((note, index) => {
        let noteDiv = `
            <div class="note">
                <div class="details">
                    <p>${note.title}</p>
                    <span>${note.description}</span>
                </div>
                <div class="bottom_content">
                    <span>${note.date}</span>
                    <div class="settings">
                        <img src="images/more.png" alt="more" onclick='showMenu(this)'>
                        <ul class="menu">
                            <li onclick="updateNote(${index}, '${note.title}', '${note.description}')"><img src="images/pen.png" alt="pen">Edit</li>
                            <li onclick='deleteNote(${index})'><img src="images/delete.png" alt="delete" >Delete</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
        add_box.insertAdjacentHTML("afterend", noteDiv)
    });
}
showNotes()

// show menu
function showMenu(elem) {
    // console.log(elem.parentElement);
    elem.parentElement.classList.add('show');
    //removeing show class from the settings menu on document click
    // document.addEventListener('click', e => {
    //     if(e.target.tagName != 'I' || e.target != elem){
    //         elem.parentElement.classList.remove('show')
    //     }
    // })
}

function deleteNote(noteId){
    let confirmDel = confirm('Are You Sure?? This will be removed forever..');
    if(!confirmDel) return;

    console.log(noteId)
    notes.splice(noteId, 1) //removing selected note from array/tasks
    //saving updated notes to localstorage
    localStorage.setItem('notes', JSON.stringify(notes))
    showNotes()
}

// edit
function updateNote(noteId, title, desc) {
    isUpdate = true
    updateId = noteId
    add_box.click();
    titleTag.value = title
    descTag.value = desc
    addNoteBtn.innerText = 'Update Note'
    popupTitle.innerText = 'Edit Note'
    console.log(noteId, title, desc);
}



// get all data from the popup
addNoteBtn.addEventListener('click', (e) => {
    e.preventDefault();
    let title = titleTag.value;
    let description = descTag.value;
    
    if(title || description){
        //getting month, day, year from the current date
        let dateObj = new Date(),
        month = months[dateObj.getMonth()],
        day = dateObj.getDate(),
        year = dateObj.getFullYear();

        let noteInfo = {
            title: title,
            description: description,
            date: `${month} ${day}, ${year}`
        }

        // for updated id
        if(!isUpdate) {
            notes.push(noteInfo); // adding new note to notes
        } else {
            isUpdate = false;
            notes[updateId] = noteInfo; //updating notes
        }

        // console.log(noteInfo);
        
        //saving notes to localstorage
        //convert object into string to store in local storage
        localStorage.setItem('notes', JSON.stringify(notes))
        close.click();
        showNotes()
    }
    
})


