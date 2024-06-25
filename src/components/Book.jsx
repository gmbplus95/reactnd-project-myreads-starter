import BookShelfChanger from "./BookShelfChanger";
import PropTypes from 'prop-types';

export function Book(props) {
    const {title, author, bgUrl, width, height, description, shelf, id, isAdd, onChangeBookShelf} = props;
    return (
        <div className="book">
            <div className="book-top" title={description}>
                <div
                    className="book-cover"
                    style={{
                        width: `${width || 128}px`,
                        height: `${height || 192}px`,
                        backgroundImage: `url(${bgUrl})`,
                    }}
                />
                <BookShelfChanger
                    shelf={shelf}
                    bookId={id}
                    isAdd={isAdd}
                    onChangeBookShelf={onChangeBookShelf}
                />
            </div>
            <div className="book-title">{title}</div>
            <div className="book-authors">{author}</div>
        </div>
    )
}

Book.propTypes = {
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    bgUrl: PropTypes.string.isRequired,
    isAdd: PropTypes.bool.isRequired,
    onChangeBookShelf: PropTypes.func.isRequired
}
