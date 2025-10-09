let formTitle = document.querySelector('#title');
let formAuthor = document.querySelector('#author');
let formPageCount = document.querySelector('#pgCount');
let formRead = document.querySelector('#read');
let formBtn = document.querySelector('#newBookBtn');
let mainForm = document.querySelector('#mainForm');

let library = [];

function Book (title, author, pgCount, read) {
    if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
    this.title = title;
    this.author = author;
    this.pgCount = pgCount;
    this.read = read;
    this.id = crypto.randomUUID();
}

function addBook (e) {
    let book = new Book(formTitle.value, formAuthor.value, formPageCount.value, formRead.checked);
    library.push(book);
    e.preventDefault();
}

formBtn.addEventListener('click', addBook);