const myLibrary = [];
const libraryDiv = document.querySelector(".library");
const submitButton = document.querySelector(".submit-button");
const bookFormDialog = document.querySelector(".form-dialog");
const bookForm = document.querySelector(".book-form");
const formCancel = document.querySelector(".cancel-button");

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}
Book.prototype.toggleReadStatus = function() {
    this.read = !(this.read);
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function removeBookFromLibrary(index) {
    myLibrary.splice(index, 1);
}

function makeBookCard(book, index) {
    const bookCard = document.createElement("div");
    bookCard.classList.add("book-card")

    bookCard.dataset.index = index;

    const bookText = document.createElement("div");
    const bookButtons = document.createElement("div");

    bookText.classList.add("book-text");
    bookButtons.classList.add("book-buttons");
        
    const bookTitle = document.createElement("h2");
    bookTitle.textContent = `${book.title}`;
    bookText.appendChild(bookTitle);

    const bookAuthor = document.createElement("h3");
    bookAuthor.textContent = `By ${book.author}`;
    bookText.appendChild(bookAuthor);

    const bookPages = document.createElement("p");
    bookPages.textContent = `${book.pages} Pages`;
    bookText.appendChild(bookPages);

    const bookRead = document.createElement("p");
    bookRead.textContent = book.read ? "Read" : "In Progress";
    bookText.appendChild(bookRead);

    const bookReadButton = document.createElement("button");
    bookReadButton.classList.add("book-button");
    bookReadButton.textContent = book.read ? "Mark Incomplete" : "Mark Complete";
    bookButtons.appendChild(bookReadButton);

    const bookDeleteButton = document.createElement("button");
    bookDeleteButton.classList.add("book-button");
    bookDeleteButton.classList.add("red-button");
    bookDeleteButton.textContent = "Remove";
    bookButtons.appendChild(bookDeleteButton);

    bookCard.appendChild(bookText);
    bookCard.appendChild(bookButtons);

    bookReadButton.addEventListener('click', () => {
        book.toggleReadStatus();
        displayLibrary();
    } )

    bookDeleteButton.addEventListener('click', () => {
        removeBookFromLibrary(bookCard.dataset.index);
        displayLibrary();
    } )

    return bookCard;
}

function makeBookForm() {
    const title = document.querySelector(".book-title").value;
    const author = document.querySelector(".book-author").value;
    const pages = document.querySelector(".book-pages").value;
    const read = document.querySelector(".book-read").checked;
    const book = new Book(title, author, pages, read);
    clearForm();
    return book;
}

function clearForm(){
    document.querySelector(".book-title").value = "";
    document.querySelector(".book-author").value = "";
    document.querySelector(".book-pages").value = "";
    document.querySelector(".book-read").checked = false;
}

function makeAddBookCard() {
    const addBookCard = document.createElement("div");
    addBookCard.classList.add("add-card");
    const addBookText = document.createElement("h2");
    addBookText.innerText = "Add Book";
    const addBookPlus = document.createElement("p");
    addBookPlus.innerText = "+";

    addBookCard.appendChild(addBookText);
    addBookCard.appendChild(addBookPlus);
    libraryDiv.appendChild(addBookCard);
    
    addBookCard.addEventListener("click", () => {
        bookFormDialog.showModal();
    });
}

function displayLibrary() {
    libraryDiv.innerHTML = "";
    myLibrary.forEach((book, index) => {
        const bookCard = makeBookCard(book, index);
        libraryDiv.appendChild(bookCard);
    });
    makeAddBookCard();
}

bookForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const book = makeBookForm();
    addBookToLibrary(book);
    bookFormDialog.close();
    displayLibrary();
});

formCancel.addEventListener("click", () => {
    clearForm();
    bookFormDialog.close();
});

testBook = new Book("testTitle", "testAuthor", 32, true);
addBookToLibrary(testBook);
displayLibrary();