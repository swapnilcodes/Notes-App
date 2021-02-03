showNotes();
let addNoteButton= document.getElementById("add-note");
addNoteButton.addEventListener('click', function(e){
    e.preventDefault();
    let notes;
    let titles;
    if(localStorage.getItem("notes")== null){
        notes= [];
        titles= [];
    }
    else{
        notes= JSON.parse(localStorage.getItem('notes'));
        titles= JSON.parse(localStorage.getItem("titles"));
    }
    let newNote= document.getElementById("note").value;
    notes.push(newNote);
    let newTitle= document.getElementById('title').value;
    titles.push(newTitle);
    localStorage.setItem('notes', JSON.stringify(notes));
    localStorage.setItem("titles", JSON.stringify(titles));
    showNotes();
});

function showNotes(){
    let titles;
    let notes;
    let html= '';
    if(localStorage.getItem('notes')== null){
        notes= [];
        titles= [];
        html= '<h1 id= "no-notes-yet-title">No Notes yet</h1>';
    }
    else{
        notes= JSON.parse(localStorage.getItem('notes'));
        titles= JSON.parse(localStorage.getItem('titles'));
        notes.forEach(function(element, index){
            html+= `
                <div class= 'card note' style= 'display: block; margin: auto; width: 18rem; margin-bottom: 5px;'>
                    <div class= "card-body">
                        <h2 id= 'title-${index}' class= "titles"></h2>
                        <p>${element}</p>
                        <br>
                        <button id= "${index}" class= "btn btn-dark" onclick= "deleteNote(this.id)">Delete Note</button>
                    </div>
                </div>
            `;
        });

        document.querySelector('.notes').innerHTML= html;
        titles.forEach(function(element, index){
            document.querySelector(`#title-${index}`).innerText= element;
        });
    }
}

function deleteNote(index){
    let notes;
    let titles;
    if(localStorage.getItem('notes')== null){
        notes= [];
        titles= [];
    }
    else{
        notes= JSON.parse(localStorage.getItem('notes'));
        titles= JSON.parse(localStorage.getItem('titles'));
    }
    notes.splice(index, 1);
    titles.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notes));
    localStorage.setItem('titles', JSON.stringify(notes));
    showNotes();
}


let searchButton= document.getElementById("search");
searchButton.addEventListener("click", function(e){
    e.preventDefault();
    let query= document.getElementById("search-query").value.toLowerCase();
    if(query!= ''){
        let titles= document.getElementsByClassName('titles');
        Array.from(titles).forEach(function(element){
            title= element.innerText.toLowerCase();
            if(title.includes(query)){
                element.parentElement.parentElement.style.display= 'block';
            }
            else{
                element.parentElement.parentElement.style.display= 'none';
            }
        });
    }
    else{
        alert("Enter A Query TO Search");
    }
});