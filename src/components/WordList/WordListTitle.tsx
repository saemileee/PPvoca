import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './WordListStyle.module.scss';
import { MdArrowBackIosNew } from 'react-icons/md';
import { CiMenuKebab } from 'react-icons/ci';
import { GiSettingsKnobs } from 'react-icons/gi';
import WordListOptionsModal from './WordListOptionsModal';

interface Props {
	setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const WordListTitle = ({ setModalOpen }: Props) => {
	const [optionsModalOpen, setOptionsModalOpen] = useState(false);
	const nav = useNavigate();

	function handleBack() {
		nav('/book/list');
	}

	function handleFilter() {
		setModalOpen(true);
	}

	function handleOptions() {
		setOptionsModalOpen(true);
	}

	return (
		<>
			<div className={styles.head}>
				<div className={styles.back} onClick={handleBack}>
					<MdArrowBackIosNew />
				</div>
				<div className={styles.title}>단어장 제목</div>
				<div className={styles.filter} onClick={handleFilter}>
					<GiSettingsKnobs />
				</div>
				<div className={styles.options} onClick={handleOptions}>
					<CiMenuKebab />
				</div>
				{optionsModalOpen && (
					<WordListOptionsModal setModalOpen={setOptionsModalOpen} />
				)}
			</div>
		</>
	);
};

export default WordListTitle;
