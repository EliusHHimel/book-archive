// Search Button Click Handler

document.getElementById('search-button').addEventListener('click', function () {

    const searchText = document.getElementById('search-field').value;

    document.getElementById('search-field').value = ''; //clear search field
    toggleSpinner('block', 'none') //show the toggle spinner

    fetch(`https://openlibrary.org/search.json?q=${searchText}`)
        .then(Response => Response.json())
        .then(data => displayBook(data))
})

const toggleSpinner = (displayStyle, resultDisplayStyle) => {
    document.getElementById('spinner').style.display = displayStyle;
    document.getElementById('result-container').style.display = resultDisplayStyle;
}

// Display Books in Search Result
function displayBook(books) {
    const resultContainer = document.getElementById('result-container');
    resultContainer.textContent = ''; //clear the previous results
    books = books.docs;
    console.log(books) //temporary console view

    for (const book of books) {
        const column = document.createElement('div');
        column.classList.add('col-3', 'g-4', 'd-flex', 'justify-content-center')
        // console.log(book.title)
        column.innerHTML = `
        <div class='card' style="width: 18rem;">
        <img src="${book.cover_i ? 'https://covers.openlibrary.org/b/id/' + book.cover_i + '-M.jpg' : 'https://www.forewordreviews.com/books/covers/networking-for-people-who-hate-networking.jpg'}" class="card-img-top" alt="">
        <div class="card-body">
                <h5 class="card-title">${book.title}</h5>
            </div>
            <ul class="list-group list-group-flush">
            <li class="list-group-item">Author: ${book.author_name ? book.author_name[0] : 'Author name not found'}</li >
            <li class="list-group-item">First Published: ${book.first_publish_year ? book.first_publish_year : 'First publish year not found'}</li >
        <li class="list-group-item">A third item</li>
        </ul>
        </div>
        `;
        resultContainer.appendChild(column);
        toggleSpinner('none', 'flex');
    }

}