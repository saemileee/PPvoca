import React, { useState } from 'react';
import { Link } from "react-router-dom";
import styles from './WordListStyle.module.scss';
import { IoSearchOutline } from "react-icons/io5";

const WordListSearch = () => {
    function handleSearch() {
        //input창 단어 검색
        alert("검색 버튼");
    }
    return (
        <>
            <div className={styles.head}>
                <input className={styles.input} placeholder='검색어를 입력해 주세요!' />
                <div onClick={handleSearch}>
                    <IoSearchOutline />
                </div>
            </div>
        </>
    )
}

export default WordListSearch;