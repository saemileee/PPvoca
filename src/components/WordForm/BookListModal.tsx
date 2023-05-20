import React from 'react'
import styles from './WordForm.module.scss'
import { BsJournalBookmark } from 'react-icons/bs';

type Book = {
    name: string;
    startLang: string;
    endLang: string;
    short_id: string;
};

type BookListModalProps = {
    bookList: Book[];
    bookInfo: Book;
    setBookInfo: (book: Book) => void;
    setShowModal: (show: boolean) => void;
};

function BookListModal({ setShowModal, bookList, bookInfo, setBookInfo }: BookListModalProps) {
    return (
        <ul className={styles.modalBookList}>
            {bookList.map(({ name, startLang, endLang, short_id }, index) => (
                <li
                    key={index}
                    className={`${styles.modalBookItem} ${short_id === bookInfo.short_id ? styles.selected : ''
                        }`}
                    onClick={() => {
                        setShowModal(false);
                        setBookInfo({
                            name: name,
                            startLang: startLang,
                            endLang: endLang,
                            short_id: short_id,
                        });
                    }}
                >
                    <div>
                        <BsJournalBookmark className={styles.icon} />
                    </div>
                    {name}
                </li>
            ))}
        </ul>
    );
}

export default BookListModal;