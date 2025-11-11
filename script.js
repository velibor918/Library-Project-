let formTitle = document.querySelector('#title');
let formAuthor = document.querySelector('#author');
let formPageCount = document.querySelector('#pgCount');
let formRead = document.querySelector('#read');
let formBtn = document.querySelector('#newBookBtn');
let mainForm = document.querySelector('#mainForm');
let container = document.querySelector(".placeholder");
let openFormBtn = document.querySelector('#openForm');
let cancelFormBtn = document.querySelector('#cancelForm');
let dialog = document.querySelector('dialog');

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
    book.createDiv();
    e.preventDefault();
    mainForm.reset();
    dialog.close();
}

formBtn.addEventListener('click', addBook);

Book.prototype.checkRead = function (e) {
  if (e.target.checked) {
    this.read = true;
  }
  else {
    this.read = false;
  }
}

Book.prototype.createDiv = function() {
  let createDiv = document.createElement('div');
  createDiv.setAttribute("id", this.id);
  createDiv.setAttribute("class", 'card');

  let titleP = document.createElement('p');
  titleP.textContent = `Title: ${this.title}`;
  createDiv.appendChild(titleP);

  let authorP = document.createElement('p');
  authorP.textContent = `Author: ${this.author}`;
  createDiv.appendChild(authorP);

  let pgCountPara = document.createElement('p');
  pgCountPara.textContent = `Page Count: ${this.pgCount}`;
  createDiv.appendChild(pgCountPara);

  let readP = document.createElement('p');
  readP.textContent = `Have you read this book? ${this.read}`;
  createDiv.appendChild(readP);
  
  let readCheck = document.createElement("input");
  readCheck.setAttribute("type", "checkbox");
  if (this.read == true) {
      readCheck.checked = true;;
     };
  createDiv.appendChild(readCheck);
  readCheck.addEventListener("change", (e) => {
    if (e.target.checked) {
      this.read = true;
    }
    else {
      this.read = false;
    }
  });

  let removeBtn = document.createElement('button');
  removeBtn.textContent = `Remove Book`;
  createDiv.appendChild(removeBtn);
  removeBtn.addEventListener('click', (e) => {
    let containerChildren = container.querySelectorAll('div');
    containerChildren.forEach( (child) => {
      if(child["id"] === this.id) {
        container.removeChild(child);
      }
    })

    let removedIndex = library.indexOf(this);
    library.splice(removedIndex, 1);
  })


  container.appendChild(createDiv);
}

openFormBtn.addEventListener('click', (e) => {
  dialog.showModal();
});

cancelFormBtn.addEventListener('click', (e) => {
  dialog.close();
})

