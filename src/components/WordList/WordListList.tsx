import React, { useState, useCallback } from 'react';
import { Link } from "react-router-dom";
import styles from './WordListStyle.module.scss';
import { BiMessageSquare, BiMessageSquareCheck, BiMessageSquareError } from "react-icons/bi";
import Speaker from '../common/Speaker';
import WordAddButton from '../common/WordAddButton';

//단어장 이름, 단어 국적(populate), 단어, 뜻, 상태, 생성시간
const dummyList = [
    {
        shortId: 1,
        name: "영어 단어장",
        word: "apple",
        meanings: ["애플", "사과", "사과나무", "뉴욕"],
        status: 0,
        start_lang: "english",
        createdAt: "2023-05-10"
    },
    {
        shortId: 2,
        name: "영어 단어장",
        word: "사과",
        meanings: ["apple", "apologize"],
        status: 1,
        start_lang: "korean",
        createdAt: "2023-05-11"
    },
    {
        shortId: 3,
        name: "영어 단어장",
        word: "help",
        meanings: ["도움", "돕다", "도와주다", "기여하다"],
        status: 2,
        start_lang: "english",
        createdAt: "2023-05-12"
    },
    {
        shortId: 4,
        name: "영어 단어장",
        word: "help",
        meanings: ["도움", "돕다", "도와주다", "기여하다"],
        status: 2,
        start_lang: "english",
        createdAt: "2023-05-12"
    },
    {
        shortId: 5,
        name: "영어 단어장",
        word: "help",
        meanings: ["도움", "돕다", "도와주다", "기여하다"],
        status: 2,
        start_lang: "english",
        createdAt: "2023-05-12"
    },
    {
        shortId: 6,
        name: "영어 단어장",
        word: "help",
        meanings: ["도움", "돕다", "도와주다", "기여하다"],
        status: 2,
        start_lang: "english",
        createdAt: "2023-05-12"
    },
    {
        shortId: 7,
        name: "영어 단어장",
        word: "체크 박스",
        meanings: ["checkbox"],
        status: 2,
        start_lang: "korean",
        createdAt: "2023-05-12"
    },
    {
        shortId: 8,
        name: "영어 단어장",
        word: "help",
        meanings: ["도움", "돕다", "도와주다", "기여하다"],
        status: 2,
        start_lang: "english",
        createdAt: "2023-05-12"
    }
]

const WordListList = () => {
    const [status, setStatus] = useState(0);
    const [checkedList, setCheckedList] = useState<Array<number>>([]);

    const handleStatus = () => {
        //누를때마다 0:미분류(BiMessageSquare) 1:외움(BiMessageSquareCheck) 2:헷갈림(BiMessageSquareError)으로 변경되게
        if (status === 0) {
            setStatus(1);
            return (<BiMessageSquareCheck />);
        } else if (status === 1) {
            setStatus(2);
            return (<BiMessageSquareError />);
        } else if (status === 2) {
            setStatus(0);
            return (<BiMessageSquare />);
        }
    };

    const onCheckedItem = useCallback(
        (checked: boolean, item: number) => {
            if (checked) {
                setCheckedList((prev) => [...prev, item]);
                console.log(checkedList);
            } else if (!checked) {
                setCheckedList(checkedList.filter((el) => el !== item));
            }

        },
        [checkedList]
    )

    return (
        <>
            <div>
                <div className={styles.count}>전체 {dummyList.length}</div>
                <hr />
                {dummyList.map((item) => (
                    <div key={item.shortId} className={styles.box}>
                        <div className={styles.menus}>
                            <div className={styles.list}>
                                <input type='checkbox' value={item.shortId} onChange={(e) => {
                                    onCheckedItem(e.target.checked, Number(e.target.value));
                                }} />&nbsp;
                                {item.shortId}. {item.createdAt}
                            </div>
                            <div className={styles.status} onClick={handleStatus}>
                                {item.status === 0 && <BiMessageSquare />}
                                {item.status === 1 && <BiMessageSquareCheck />}
                                {item.status === 2 && <BiMessageSquareError />}
                            </div>
                            <Speaker text={item.word} lang={item.start_lang} />
                        </div>
                        <div className={styles.word}>{item.word}</div>
                        <div className={styles.meanings}>
                            {item.meanings.join(', ')}
                        </div>
                    </div>
                ))}
                    <WordAddButton />
            </div>
        </>
    )
}

export default WordListList;