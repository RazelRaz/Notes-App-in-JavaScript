const add_box = document.querySelector('.add_box');
const popup_box = document.querySelector('.popup_box');
const close = document.querySelector('.close');
const addNoteBtn = document.querySelector('button');
const titleTag = document.querySelector('input');
const descTag = document.querySelector('textarea');

var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

// open popup
add_box.addEventListener('click', () => {
    popup_box.classList.add("show")
})

//getting localstorage notes if exist and parsing them
//to js object else passing an empty array to notes
const notes = JSON.parse(localStorage.getItem('notes') || '[]');


//remove popup
close.addEventListener('click', () => {
    popup_box.classList.remove("show")
})

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

        // console.log(noteInfo);
        notes.push(noteInfo); // adding new note to notes
        //saving notes to localstorage
        //convert object into string to store in local storage
        localStorage.setItem('notes', JSON.stringify(notes))
        

    }
    
})


