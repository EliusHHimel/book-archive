// Search Button Click Handler

document.getElementById('search-button').addEventListener('click', function () {

    const searchText = document.getElementById('search-field').value;

    fetch(`https://openlibrary.org/search.json?q=${searchText}`)
        .then(Response => Response.json())
        .then(data => displayBook(data))
})

// Display Books in Search Result
function displayBook(books) {
    const resultContainer = document.getElementById('result-container');
    books = books.docs;
    console.log(books)

    for (const book of books) {
        const column = document.createElement('div');
        column.classList.add('col-4', 'g-4')
        // console.log(book.title)
        column.innerHTML = `
        <div class='card' style="width: 18rem;">
        <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top" alt="">
        <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
            </div>
            <ul class="list-group list-group-flush">
            <li class="list-group-item">Author: ${book.author_name[0]}</li >
            <li class="list-group-item">First Published: ${book.first_publish_year}</li >
        <li class="list-group-item">A third item</li>
        </ul>
        </div>
        `;
        resultContainer.appendChild(column)
    }
}