class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class UI {
    addBookToList(book) {
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

    showAlert(message, className) {
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

    deleteBook(target) {
        if(target.className === 'delete') {
            //we want to target the parent element of the <a>(link) which is the td, then we want to target the parent of the td which is tr, and that's what we want to remove, so: 
            target.parentElement.parentElement.remove();
        }
    }

    clearFields() {
        //so get the element by id and set the value to nothing
        document.getElementById('title').value = '';
        document.getElementById('author').value = '';
        document.getElementById('isbn').value = '';
    }
}

// Local Storage Class
class Store {
    // We want them all static, so we put the static keyword in front of them all:
    // getBooks is gonna fetch the books from local storage
    static getBooks() {
        // Initialize a local var called books
        let books;
        //check local storage
        if(localStorage.getItem('books') === null) {
            //if it's not there, let books equal an empty array
            books = [];
        } else {
            // We need this to be a JavaScript object so we need to run this true JSON.parse function
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }
    // We gonna have a method displayBooks, which displays the books in the UI:
    static displayBooks() {
        //get the books
        const books = Store.getBooks();
        //Then we are going to loop true the books with forEach
        books.forEach(function(book){
            const ui = new UI;

            // Add book to UI
            ui.addBookToList(book);
        });
    }
    // Add to local storage
    static addBook(book) {
        //get the books
        const books = Store.getBooks();
        //We want to push on to it
        books.push(book);
        //Then save it to local storage
        localStorage.setItem('books', JSON.stringify(books));
    }
    // Remove book
    static removeBook(isbn) {
        //get the books
        const books = Store.getBooks();

        //Then we are going to loop true the books with forEach
        books.forEach(function(book, index){
            if(book.isbn === isbn) {
                //then we want to splice out the index, and remove 1 
                books.splice(index, 1);
            }
        });

        //Then save it to local storage
        localStorage.setItem('books', JSON.stringify(books));
    }
}

// DOM Load Event
//When the dom content is loaded then we want to call the function store.displaybooks
document.addEventListener('DOMContentLoaded', Store.displayBooks);

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

        // Add to local storage
        Store.addBook(book);

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

    // Remove from local storage
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

    // Show alert when delete, class will be succes
    ui.showAlert('Book Removed!', 'succes');

    e.preventDefault();
});