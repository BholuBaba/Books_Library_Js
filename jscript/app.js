//Implementing a Library Class in JavaScript Prototype:

//Book function
function Book(name, author, type) {
    this.name = name;
    this.author = author;
    this.type = type;
}

//Display Constructor
function Display() {

}

//Add Method to display prototype
Display.prototype.add = function (book) {
    if (book == null) {
        let notes = localStorage.getItem("Books");
        if (notes == null) {
            noteObj = [];
        } else {
            noteObj = JSON.parse(notes);
        }
        let html = "";
        noteObj.forEach(function (element, index) {
            tablebody = document.getElementById("tableBody");
            html += `<tr>
                    <td>${element.name}</td>
                    <td>${element.author}</td>
                    <td>${element.type}</td>
                </tr>`
            tablebody.innerHTML += uiString;
        });

    }
    else {
        console.log("Adding to UI");
        tablebody = document.getElementById("tableBody");
        let uiString = `<tr>
                        <td>${book.name}</td>
                        <td>${book.author}</td>
                        <td>${book.type}</td>
                    </tr>`
        tablebody.innerHTML += uiString;
    }
}

//To Clear Display
Display.prototype.clear = function () {
    let libraryForm = document.getElementById("libraryForm");
    libraryForm.reset();
}

//To Validate the inputs
Display.prototype.validate = function (book) {
    if (book.name.length < 2 || book.author.length < 2) {
        return false;
    }
    else {
        return true;
    }
}

//To Show the error message
Display.prototype.show = function (type, displayMessage) {
    let message = document.getElementById("message");
    message.innerHTML = `<div class="alert alert-${type} alert-dismissible fade show" role="alert">
                            <strong>Message:</strong> ${displayMessage}
                            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                        </div> `
    setTimeout(function () {
        message.innerHTML = '';
    }, 2000);
}

//Add submit event to listner to Libraryform
let libraryForm = document.getElementById("libraryForm");
libraryForm.addEventListener("submit", listenFormSubmit);

function listenFormSubmit(e) {
    console.log("You have submkted Library form");
    let name = document.getElementById("bookName").value;
    let author = document.getElementById("author").value;

    let type;
    let fiction = document.getElementById("fiction");
    let prog = document.getElementById("programming");
    let cook = document.getElementById("cooking");

    if (fiction.checked) {
        type = fiction.value;
    } else if (prog.checked) {
        type = prog.value;
    } else if (cook.checked) {
        type = cook.value;
    }

    let book = new Book(name, author, type);
    console.log(book);

    let display = new Display();
    if (display.validate(book)) {
        display.add(book);
        display.clear();
        let notes = localStorage.getItem("Books");
        if (notes == null) {
            noteObj = [];
        } else {
            noteObj = JSON.parse(notes);
        }
        let myobj = {
            name: name,
            author: author,
            type: type
        }
        noteObj.push(myobj);
        localStorage.setItem("Books", JSON.stringify(noteObj));
        console.log(noteObj);
        display.show('success', ' Your file has been saved');
    } else {
        display.show('danger', ' You cannot save the data');
    }
    e.preventDefault();
}