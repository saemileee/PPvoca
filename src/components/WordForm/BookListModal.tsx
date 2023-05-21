import React from 'react'
import styles from './WordForm.module.scss'
import { BsJournalBookmark } from 'react-icons/bs';


function BookListModal({ setShowModal, bookList, bookInfo, setBookInfo }) {
    return (
        <ul className={styles.modalBookList}>
            {bookList.map(({ name, start_lang, end_lang, short_id }, index) => (
                <li
                    key={index}
                    className={`${styles.modalBookItem} ${short_id === bookInfo.short_id ? styles.selected : ''}`}
                    onClick={() => {
                        setShowModal(false);
                        setBookInfo({
                            name: name,
                            startLang: start_lang,
                            endLang: end_lang,
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