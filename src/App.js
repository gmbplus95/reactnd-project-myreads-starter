import "./App.css";
import {useEffect, useState} from "react";
import {BookShelf} from "./components/BookShelf";
import {Book} from "./components/Book";
import {getAll, update} from "./BooksAPI";

export function App() {
  const [books, setBooks] = useState([]);

  useEffect(() => {
    //get all books
    getAll().then((data) => {
      setBooks(data);
    })
  }, []);

  const bookShelves = [
    {title: "Currently Reading", val: "currentlyReading"},
    {title: "Want To Read", val: "wantToRead"},
    {title: "Read", val: "read"},
  ]

  const onChangeBookShelf = (id, shelf) => {
    update({id}, shelf).then(() => {
      getAll().then((data) => {
        setBooks(data);
      })
    })
  }
  return (
    <div className="app">
        <div className="list-books">
          <div className="list-books-title">
            <h1>MyReads</h1>
          </div>
          <div className="list-books-content">
            <div>
              {bookShelves.map((shelf, idx) => {
                const bookInShelf = books.filter(i => i.shelf === shelf.val);
                return <BookShelf title={shelf.title} key={idx}>
                  {bookInShelf.length === 0
                      ? <div>No items found</div>
                      : bookInShelf.map((book, idx2) => {
                    return (
                        <Book
                            title={book.title}
                            author={book.authors ? book.authors.join(",") : ""}
                            description={book.description}
                            bgUrl={book.imageLinks ? (book.imageLinks.thumbnail || book.imageLinks.smallThumbnail) : ""}
                            key={book.id + idx2}
                            shelf={shelf.val}
                            id={book.id}
                            onChangeBookShelf={(val) => onChangeBookShelf(book.id, val)}
                            isAdd={false}
                        />
                    )
                  })}
                </BookShelf>
              })}
            </div>
          </div>
          <div className="open-search">
            <a href="search">Add a book</a>
          </div>
        </div>
      )}
    </div>
  );
}
