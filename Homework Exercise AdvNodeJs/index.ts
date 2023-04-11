interface IAuthor {
  firstName: string;
  lastName: string;
}

interface IBook {
  title: string;
  author: IAuthor;
}

interface ILibrary {
  booksCatalog: IBook[];
  addBook(book: IBook): void;
}

class Author implements IAuthor {
  constructor(public firstName: string, public lastName: string) {}
}

class Book implements IBook {
  constructor(public author: IAuthor, public title: string) {}
}

class Library implements ILibrary {
  booksCatalog: IBook[] = [];

  constructor() {}

  addBook(book: IBook) {
    this.booksCatalog.push(book);
    console.log(
      `${book.title} by ${book.author.firstName} ${book.author.lastName} was added to the library.`
    );
  }

  removeBook(title: string) {
    const index = this.booksCatalog.findIndex((book) => book.title === title);
    if (index >= 0) {
      const book = this.booksCatalog[index];
      this.booksCatalog.splice(index, 1);
      console.log(
        `${book.title} by ${book.author.firstName} ${book.author.lastName} was removed from the library.`
      );
    } else {
      console.log(`Book ${title} not found in the library.`);
    }
  }

  listBooks(): void {
    console.log(this.booksCatalog);
  }
}

// TESTING

const johnAuthor = new Author("John", "Doe");

const johnBook = new Book(johnAuthor, "Hello World");

const johnSecondBook = new Book(johnAuthor, "Goodbye World");

const johnThirdBook = new Book(johnAuthor, "New World");

const newLibrary = new Library();

newLibrary.addBook(johnBook);
newLibrary.addBook(johnSecondBook);
newLibrary.removeBook("Hello World");
newLibrary.addBook(johnThirdBook);
newLibrary.removeBook("World World");

newLibrary.listBooks();
