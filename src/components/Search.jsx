import {useEffect, useState} from "react";
import {getAll, search, update} from "../BooksAPI";
import {Book} from "./Book";

export default function Search() {
    const [myBooks, setMyBooks] = useState([]);
    const [loading, setIsLoadding] = useState(false);
    useEffect(() => {
        //get all books
        getAll().then((data) => {
            setMyBooks(data);
        })
    }, []);
    const [searchedBooks, setSearchedBooks] = useState([]);
    let timer;
    const debounce = (func, delay) => {
        return (...arg) => {
            if (timer) clearTimeout(timer);
            timer = setTimeout(() => {
                setIsLoadding(true);
                func(...arg);
            }, delay);
        };
    };
    const handleInputChange = (e) => {
        const searchVal = e.target.value;
        if (!searchVal) {
            setSearchedBooks([]);
            return;
        }
        debounce(() => search(searchVal, 5000).then(data => {
            setIsLoadding(false);
            if (data.error) {
                setSearchedBooks([]);
                return;
            }
            setSearchedBooks(data);
        }), 800)();
    }

    const onChangeBookShelf = (id, shelf) => {
        update({id}, shelf).then(() => {
            getAll().then((data) => {
                setMyBooks(data);
            })
        })
    }
    return (
        <div className="search-books">
            <div className="search-books-bar">
                <a
                    className="close-search"
                    href="/"
                >
                    Close
                </a>
                <div className="search-books-input-wrapper">
                    <input
                        type="text"
                        placeholder="Search by title, author, or ISBN"
                        onChange={handleInputChange}
                    />
                </div>
            </div>
            <div className="search-books-results">
                {searchedBooks.length === 0 ?
                    (loading ? <div>Searching.... </div> : <div>No Books found</div>) :
                    <ol className="books-grid">
                        {searchedBooks.map((book, idx2) => {
                            const bookInBothPage = myBooks.find(e => e.id === book.id);
                            return (
                                <Book
                                    title={book.title}
                                    author={book.authors ? book.authors.join(",") : ""}
                                    description={book.description}
                                    bgUrl={book.imageLinks ? (book.imageLinks.thumbnail || book.imageLinks.smallThumbnail) : ""}
                                    key={book.id + idx2}
                                    shelf={bookInBothPage?.shelf}
                                    id={book.id}
                                    onChangeBookShelf={(val) => onChangeBookShelf(book.id, val)}
                                    isAdd={!bookInBothPage?.shelf}
                                />
                            )
                        })}
                    </ol>
                }
            </div>
        </div>
    )
}
