{
  'use strict';

  const select = {
    templatesOf: {
      book: '#template-book',
    },
    listOf: {
      books: '.books-panel .books-list',
    },
    bookProperties: {
      image: 'book__image',
      id: 'data-id',
    },
  };

  const classNames = {
    book: {
      favoriteBook: 'favorite',
    },
  };

  const templates = {
    bookLink: Handlebars.compile(document.querySelector(select.templatesOf.book).innerHTML),
  };


  const render = function(){

    for(let book in dataSource.books){
      /* generate HTML based on template */
      const generatedHTML = templates.bookLink(dataSource.books[book]);
      //console.log(`generatedHTML:`, generatedHTML);
      /* create element using utils.createDOMFromHTML */
      book = utils.createDOMFromHTML(generatedHTML);
      //console.log(`bookHTML:`, book);
      /* find books list container */
      const booksList = document.querySelector(select.listOf.books);
      /* add element to list */
      booksList.appendChild(book);
    }

  };

  render();

  const favoriteBooks = [];

  const initActions = function(){
    const booksList = document.querySelector(select.listOf.books);

    booksList.addEventListener('dblclick', function(event){
      event.preventDefault();

      const bookImage = event.target.offsetParent;
      console.log(bookImage);

      if(bookImage.classList.contains(select.bookProperties.image)){
        const favoriteBook = bookImage.classList.contains(classNames.book.favoriteBook);

        if(!favoriteBook){
          bookImage.classList.add(classNames.book.favoriteBook);
          favoriteBooks.push(bookImage);
        } else {
          bookImage.classList.remove(classNames.book.favoriteBook);
          favoriteBooks.splice(favoriteBooks.indexOf(bookImage), 1);
        }
      }

      console.log(favoriteBooks);
    });
  };

  initActions();
}
