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

// Show Alert
UI.prototype.showAlert = function(message, className) {
    //Now we have to construct the elements, so lets create a div
    const div = document.createElement('div');
    // Add classes
    div.className = `alert ${className}`;
    // Add textnode
    div.appendChild(document.createTextNode(message));
    //Then we need to insert it to the dom, but first we need to get the parent
    const container = document.querySelector('.container');
    //Then we want to get the form, because we want to put it before the form
    const form = document.querySelector('#book-form');
    //Then we want to take the container which is the parent, and insert the div before the form
    container.insertBefore(div, form);

    //We want the alert to disappear after 3 seconds
    setTimeout(function(){
        document.querySelector('.alert').remove();
    }, 3000);
}

// Delete Book
UI.prototype.deleteBook = function(target){
    if(target.className === 'delete') {
        //we want to target the parent element of the <a>(link) which is the td, then we want to target the parent of the td which is tr, and that's what we want to remove, so: 
        target.parentElement.parentElement.remove();
    }
}

// Clear Fields
UI.prototype.clearFields = function(){
    //so get the element by id and set the value to nothing
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
}


// Event Listener for add book
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

    // Validating 
    if(title === '' || author === '' || isbn === '') {
        // Error alert in the UI, the message and the class of error
        ui.showAlert('Please fill in all fields', 'error');
    } else {
        // Add book to list
        ui.addBookToList(book);

        // Show message when book added to list
        ui.showAlert('Book Added!', 'succes');

        // Clear fields 
        ui.clearFields();
    }

    e.preventDefault();
});

// Event Listener for delete
document.getElementById('book-list').addEventListener('click', function(e){
    // Instantiate UI
    const ui = new UI();

    // Delete book
    ui.deleteBook(e.target);

    // Show alert when delete, class will be succes
    ui.showAlert('Book Removed!', 'succes');

    e.preventDefault();
});