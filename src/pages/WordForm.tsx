import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from '../components/WordForm/wordform.module.scss';
import WordformLayout from '../components/WordForm/WordformLayout';
import { BsJournalBookmark } from 'react-icons/bs';
import { MdArrowBackIosNew } from 'react-icons/md';

import Modal from '../components/common/Modal/Modal';

const mockData = {
	word: 'word',
	meanings: ['이야기', '말을 쓰다', '단어'],
	book: '영단어',
};



function WordForm() {
	const [buttonText, setButtonText] = useState('');
	const [bookName, setBookName] = useState(mockData.book);
	const [word, setWord] = useState('');
	const [meaning, setMeaning] = useState<string[]>([]);
	const [meaningInput, setMeaningInput] = useState('');
	const [showModal, setShowModal] = useState(false);
	const navigate = useNavigate();

	const location = useLocation();
	const editPage = location.pathname === '/word/edit';
	const addPage = location.pathname === '/word/add';

	useEffect(() => {
		if (addPage) {
			setButtonText('추가');
		} else if (editPage) {
			setButtonText('수정');
			setMeaning(mockData.meanings);
			setWord(mockData.word);
		}
	}, []);

	const handleSearch = () => {
		if (word === mockData.word) {
			setMeaning(mockData.meanings);
		} else {
			setMeaning([]);
		}
	};

	const handleMeaningInput = (e: React.ChangeEvent<HTMLInputElement>) => {
		setMeaningInput(e.target.value);
	};

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		if (meaningInput.trim() !== '') {
			setMeaning([meaningInput.trim(), ...meaning]);
			setMeaningInput('');
		}
	};

	const handleRemoveItem = (itemToRemove: string) => {
		const newMeaning = meaning.filter(item => item !== itemToRemove);
		setMeaning(newMeaning);
	};

	function handleAddBtn() {
		if (!word || !meaning.length) {
			return;
		}
		const wordData = {
			word: word,
			meanings: meaning,
			book: bookName,
		};
		console.log(wordData);
	}

	return (
		<main>
			<div className={styles.container}>
				<div className={styles.wordHeader}>
					{addPage ? (
						<span>
							<p>선택된 단어장</p>
							<h1 className={styles.bookTitle}>{bookName}</h1>
						</span>
					) : editPage ? (
						<div className={styles.editHeader}>
							<button className={styles.arrowBtn} onClick={() => navigate(-1)}>
								<MdArrowBackIosNew className={styles.icon} />
							</button>
							<h1 className={styles.bookTitle}>단어</h1>
						</div>
					) : null}
					<div className={styles.submitBtn} onClick={handleAddBtn}>
						{buttonText}
					</div>
				</div>

				<WordformLayout
					handleSubmit={handleSubmit}
					word={word}
					handleSearch={handleSearch}
					meaning={meaning}
					meaningInput={meaningInput}
					handleMeaningInput={handleMeaningInput}
					setWord={setWord}
					handleRemoveItem={handleRemoveItem}
				/>

				{addPage && (
					<div className={styles.bookBtn}>
						<button
							className={styles.bookBtn_circle}
							onClick={() => setShowModal(true)}
						>
							<BsJournalBookmark className={styles.icon} />
						</button>
						<Modal
							showModal={showModal}
							setShowModal={setShowModal}
							title='단어장 선택'
						>
							<ul>
								<li>dsfjkfhs</li>
							</ul>

						</Modal>

					</div>
				)}
			</div>
		</main>
	);
}

export default WordForm;
