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
      book: '.book',
      image: 'book__image',
      id: 'data-id',
    },
    form: '.filters form',
  };

  const classNames = {
    book: {
      favoriteBook: 'favorite',
      hidden: 'hidden',
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
  const filters = [];

  const initActions = function(){
    const booksList = document.querySelector(select.listOf.books);
    const form = document.querySelector(select.form);

    booksList.addEventListener('dblclick', function(event){
      event.preventDefault();

      const bookImage = event.target.offsetParent;
      //console.log(bookImage);

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

    form.addEventListener('click', function(event){
      //event.preventDefault();

      const checkbox = event.target;
      //console.log(checkbox);

      if(checkbox.tagName === 'INPUT' && checkbox.type === 'checkbox' && checkbox.name === 'filter'){
        console.log(checkbox.value);
        if(checkbox.checked === true){
          filters.push(checkbox.value);
        } else if(checkbox.checked === false){
          filters.splice(filters.indexOf(checkbox.value), 1);
        }
      }

      console.log(filters);
      filterBooks();
    });
  };

  initActions();

  const filterBooks = function(){

    for(let book of dataSource.books){

      let hiddenBook = false;
      const bookImage = document.querySelector('.book__image[data-id="' + book.id + '"]');
      console.log(bookImage);

      for(let filter of filters){
        if(!book.details[filter]){
          hiddenBook = true;
          break;
        }
      }

      if(hiddenBook){
        bookImage.classList.add(classNames.book.hidden);
      } else if(!hiddenBook){
        bookImage.classList.remove(classNames.book.hidden);
      }
    }
  };
}
