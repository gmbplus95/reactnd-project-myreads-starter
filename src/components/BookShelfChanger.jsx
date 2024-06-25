import {useEffect, useState} from "react";

export default function BookShelfChanger(props) {
    const shelf = props.shelf || "none";
    const {onChangeBookShelf, bookId, isAdd} = props;
    const [selected, setSelected] = useState("");
    const options = [{
        val: '',
        label: isAdd ? 'Add to...' : 'Move to...'
    }, {
        val: 'currentlyReading',
        label: 'Currently Reading'
    }, {
        val: 'wantToRead',
        label: 'Want to Read'
    }, {
        val: 'read',
        label: 'Read'
    }, {
        val: 'none',
        label: 'None'
    }]

    const handleSelect = (e) => {
        if (e.target.value === 'none') {
            return;
        }
        setSelected(e.target.value);
    }

    useEffect(() => {
        setSelected(shelf)
    }, [shelf])

    useEffect(() => {
        if (selected && selected !== shelf && selected !== 'none') {
            onChangeBookShelf(selected);
        }
        /* eslint-disable react-hooks/exhaustive-deps */
    }, [selected])
    return (
        <div className="book-shelf-changer">
            <select onChange={handleSelect} value={selected} title={selected}>
                {options.filter(j => !j.invisible).map((item, idx) => {
                    return (
                        <option disabled={item.val === ""} value={item.val}
                                key={bookId + idx}>
                            {item.label}
                        </option>
                    )
                })}
            </select>
        </div>
    )
}
