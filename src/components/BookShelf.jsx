import {Children} from "react";

export function BookShelf(props) {
    const {title} = props;
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{title}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {Children.toArray(props.children).map((e, idx) => {
                        return (
                            <li key={idx}>
                                {e}
                            </li>
                        )
                    })}
                </ol>
            </div>
        </div>
    )
}
