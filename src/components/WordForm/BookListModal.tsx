import React from 'react'
import styles from './WordForm.module.scss'
import { BsJournalBookmark } from 'react-icons/bs';


interface Book {
    name: string;
    start_lang: string;
    end_lang: string;
    short_id: string;
}

interface BookListModalProps {
    setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
    bookList: Book[];
    bookInfo: {
        name: string;
        startLang: string;
        endLang: string;
        short_id: string;
    };
    setBookInfo: React.Dispatch<
        React.SetStateAction<{
            name: string;
            startLang: string;
            endLang: string;
            short_id: string;
        }>
    >;
}

const BookListModal: React.FC<BookListModalProps> = ({
    setShowModal,
    bookList,
    bookInfo,
    setBookInfo,
}) => {
    return (
        <ul className={styles.modalBookList}>
            {bookList.map(({ name, start_lang, end_lang, short_id }, index) => (
                <li
                    key={index}
                    className={`${styles.modalBookItem} ${short_id === bookInfo.short_id ? styles.selected : ''
                        }`}
                    onClick={() => {
                        setShowModal(false);
                        setBookInfo({
                            name,
                            startLang: start_lang,
                            endLang: end_lang,
                            short_id,
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
};

export default BookListModal;