const myLibrary = [];
const libraryDiv = document.querySelector(".library");
const submitButton = document.querySelector(".submit-button");

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(book) {
    myLibrary.push(book);
}

function makeBookCard(book, index) {
    const bookCard = document.createElement("div");

    bookCard.dataset.index = index;

    //temp index for debugging
    const bookIndex = document.createElement("p");
    bookIndex.textContent = `${bookCard.dataset.index}`;
    bookCard.appendChild(bookIndex);
        
    const bookTitle = document.createElement("h2");
    bookTitle.textContent = `${book.title}`;
    bookCard.appendChild(bookTitle);

    const bookAuthor = document.createElement("h2");
    bookAuthor.textContent = `${book.author}`;
    bookCard.appendChild(bookAuthor);

    const bookPages = document.createElement("p");
    bookPages.textContent = `${book.pages}`;
    bookCard.appendChild(bookPages);

    const bookRead = document.createElement("p");
    bookRead.textContent = `${book.read}`;
    bookCard.appendChild(bookRead);

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

function displayLibrary() {
    libraryDiv.innerHTML = "";
    myLibrary.forEach((book, index) => {
        const bookCard = makeBookCard(book, index);
        libraryDiv.appendChild(bookCard);
    });
}

submitButton.addEventListener("click", (event) => {
    event.preventDefault();
    const book = makeBookForm();
    addBookToLibrary(book);
    displayLibrary();
});

testBook = new Book("testTitle", "testAuthor", 32, "testRead");
addBookToLibrary(testBook);
displayLibrary();