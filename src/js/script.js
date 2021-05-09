{
  'use strict';

  const select = {
    templatesOf: {
      book: '#template-book',
    },
    listOf: {
      books: '.books-panel .books-list',
    }
  }

  const templates = {
    bookLink: Handlebars.compile(document.querySelector(select.templatesOf.book).innerHTML),
  }


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

  }

  render();



}
