// Book Constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
}

// UI Constructor
function UI() {}

// Add Book To List
UI.prototype.addBookToList = function(book){
    const list = document.getElementById('book-list');
    // Create tr element
    const row = document.createElement('tr');
    // Insert columns
    row.innerHTML = `
    <td>${book.title}</td>
    <td>${book.author}</td>
    <td>${book.isbn}</td>
    <td><a href="#" class="delete">X</a></td>
    `;

    // Then to add it to the table we have to append it
    list.appendChild(row);
}

// Clear Fields
UI.prototype.clearFields = function(){
    //so get the element by id and set the value to nothing
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}


// Event Listeners
document.getElementById('book-form').addEventListener('submit', function(e){
    //Get form values
    const title = document.getElementById('title').value,
    author = document.getElementById('author').value,
    isbn = document.getElementById('isbn').value

    // Instantiate book
    //So when we press submit we want to instantiate the book constructor
    const book = new Book(title, author, isbn);

    // Instantiate UI
    //Then when we want the book to be added to the table below, and the UI object is gonna take care of that, so right now we want to instantiate the UI object
    const ui = new UI();

    // Add book to list
    ui.addBookToList(book);

    // Clear fields 
    ui.clearFields();


    e.preventDefault();
});