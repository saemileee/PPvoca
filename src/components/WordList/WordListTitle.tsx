import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import styles from './WordListStyle.module.scss';
import { MdArrowBackIosNew } from "react-icons/md";
import { CiMenuKebab } from "react-icons/ci";
import { AiOutlinePlus } from "react-icons/ai";
import { GiSettingsKnobs } from "react-icons/gi";
import WordListModal from '../common/WordListModal';

const WordListTitle = () => {
    const [modalOpen, setModalOpen] = useState(false);
    const nav = useNavigate();

    function handleBack() {
        nav('/book/list');
    }

    function handleFilter() {
        setModalOpen(true);
    }

    function handleOptions() {
        //옵션 모달 뜨게
        alert("옵션 버튼");
    }

    function handlePlus() {
        nav('/word/add');
    }

    return (
        <>
            <div className={styles.head}>
                <div className={styles.back} onClick={handleBack}>
                    <MdArrowBackIosNew />
                </div>
                <div className={styles.title}>
                    단어장 제목
                </div>
                <div className={styles.filter} onClick={handleFilter}>
                    <GiSettingsKnobs />
                </div>
                <div className={styles.options} onClick={handleOptions}>
                    <CiMenuKebab />
                </div>
                <div className={styles.plus} onClick={handlePlus}>
                    <AiOutlinePlus />
                </div>
                {modalOpen && <WordListModal setModalOpen={setModalOpen} />}
            </div>
        </>
    )
}

export default WordListTitle;