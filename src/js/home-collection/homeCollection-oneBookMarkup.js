function createBookMarkup(book) {
  const { author, title, list_name, book_image = defaultBookImage } = book;
  return `  
    <li class="book">
        <div class="book__image-frame">
            <img class="book__image" src="${book_image}" ></img>
        </div>
        <p class="book__title">${title}</p>
        <p class="book__author">${author}</p> 
    </li> 
    `;
}

export { createBookMarkup };
