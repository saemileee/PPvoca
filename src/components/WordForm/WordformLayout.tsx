import React, { FormEvent, Dispatch, SetStateAction, ChangeEvent } from 'react'
import styles from './wordform.module.scss';

import { IoSearchOutline } from 'react-icons/io5';
import { HiOutlinePencil } from 'react-icons/hi'
import { IoIosCloseCircleOutline } from 'react-icons/io'

interface WordformLayoutProps {
    handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
    handleMeaningInput: (event: ChangeEvent<HTMLInputElement>) => void;
    handleSearch: () => void;
    handleRemoveItem: (item: string) => void;
    setWord: Dispatch<SetStateAction<string>>;
    word: string;
    meaning: string[];
    meaningInput: string;
}

function WordformLayout({
    handleSubmit,
    handleSearch,
    handleRemoveItem,
    handleMeaningInput,
    word,
    meaning,
    meaningInput,
    setWord,
}: WordformLayoutProps) {

    return (
        <form className={styles.wordForm} onSubmit={handleSubmit}>
            <label htmlFor="word">English</label>
            <div className={`${styles.wordInput} ${styles.margin}`}>
                <input
                    id="word"
                    type="text"
                    placeholder="단어를 입력해 주세요 (필수)"
                    value={word}
                    onChange={(e) => setWord(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter") {
                            handleSearch();
                            e.preventDefault();
                        }
                    }}
                />
                <button
                    type="button"
                    onClick={handleSearch}
                    className={styles.searchBtn}
                >
                    <IoSearchOutline className={styles.icon} />
                </button>
            </div>

            <label htmlFor="meaning">Korean</label>
            <div className={styles.wordInput}>
                <input
                    id="meaning"
                    type="text"
                    placeholder="의미를 입력해 주세요 (필수)"
                    value={meaningInput}
                    onChange={handleMeaningInput}
                />
            </div>
            <ul className={styles.meanList}>
                {meaning.map((item) => (
                    <li className={styles.meanItem} key={item}>
                        {item}
                        <button className={styles.editBtn}><HiOutlinePencil className={styles.icon} /></button>
                        <button className={styles.cancelBtn} onClick={() => handleRemoveItem(item)}><IoIosCloseCircleOutline className={styles.icon} /></button>
                    </li>
                ))}
            </ul>
        </form>
    )
}

export default WordformLayout