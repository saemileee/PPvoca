import React from 'react';
import styles from './Style.module.scss';
import { IoSearchOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

function WordSearch() {
	const navigate = useNavigate();

	function handleSearchClick() {
		navigate('/word/all');
	}

	return (
		<div className={styles.inputContainer} onClick={handleSearchClick}>
			<div className={styles.input}>단어 검색</div>
			<div className={styles.searchIcon}>
				<IoSearchOutline size={24} />
			</div>
		</div>
	);
}

export default WordSearch;
