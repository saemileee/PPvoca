import React, { useState, useEffect, FormEvent, MouseEvent } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from '../components/WordForm/wordform.module.scss';
import BookSelectionModal from '../components/WordForm/BookListModal';
import WordInput from '../components/WordForm/WordInput';

import { MdArrowBackIosNew } from 'react-icons/md';
import { HiOutlinePencil } from 'react-icons/hi';
import { IoIosCloseCircleOutline } from 'react-icons/io';

const wordData = [
	{
		word: 'apple',
		meanings: ['사과'],
		book: '영단어',
	},
	{
		word: 'book',
		meanings: ['책', '소설'],
		book: '해리포터와 마법사의 돌',
	},
	{
		word: 'computer',
		meanings: ['컴퓨터'],
		book: '코딩 입문',
	},
	{
		word: 'happy',
		meanings: ['행복한'],
		book: '영단어',
	},
	{
		word: 'water',
		meanings: ['물'],
		book: '영단어',
	},
];

const bookList = [
	{
		name: '영단어',
		start_lang: 'English',
		end_lang: 'Korean',
	},
	{
		name: '해리포터와 마법사의 돌',
		start_lang: 'English',
		end_lang: 'Korean',
	},
	{
		name: '코딩 입문',
		start_lang: 'Korean',
		end_lang: 'English',
	},
];

function WordForm() {
	const [buttonText, setButtonText] = useState('');
	const [bookName, setBookName] = useState('영단어');
	const [startLang, setStartLang] = useState('');
	const [endLang, setEndLang] = useState('');
	const [word, setWord] = useState('');
	const [newMeaning, setNewMeaning] = useState('');
	const [foundWords, setFoundWords] = useState<string[]>([]);

	const navigate = useNavigate();
	const location = useLocation();
	const editPage = location.pathname === '/word/edit';
	const addPage = location.pathname === '/word/add';

	// 임시
	const targetWord = wordData[1].word;
	useEffect(() => {
		if (addPage) {
			setButtonText('추가');
		} else if (editPage) {
			setButtonText('수정');
			const foundWord = wordData.find(data => data.word === targetWord);
			if (foundWord) {
				setFoundWords(foundWord.meanings);
				setWord(foundWord.word);
			}
		}
	}, []);

	useEffect(() => {
		const book = bookList.find(item => item.name === bookName);
		setStartLang(book?.start_lang || '');
		setEndLang(book?.end_lang || '');
	}, [bookName]);

	const handleSearch = () => {
		if (startLang === 'Korean') {
			const foundWord = wordData.find(data => data.meanings.includes(word));
			if (foundWord) {
				setFoundWords([foundWord.word]);
			}
		} else if (startLang === 'English') {
			const foundWord = wordData.find(data => data.word === word);
			if (foundWord) {
				setFoundWords(foundWord.meanings);
			}
		}
	};

	const handleSubmit = async () => {
		try {
			let meanings = foundWords;
			if (newMeaning) {
				meanings = [newMeaning, ...foundWords];
			}
			const formData = {
				book: bookName,
				word: word,
				meanings: meanings,
			};
			console.log(formData);
			alert(`${word} 단어 추가 완료`);
			setWord('');
			setNewMeaning('');
			setFoundWords([]);
		} catch (error) {
			console.error(error);
		}
	};

	const handleCancelClick = (index: number) => {
		setFoundWords(prevWords => prevWords.filter((_, i) => i !== index));
	};

	const handleAddMeaning = (
		e: FormEvent<HTMLFormElement> | MouseEvent<HTMLButtonElement>,
		newMeaning: string,
	) => {
		e.preventDefault();
		if (newMeaning !== '') {
			setFoundWords(prevWords => [newMeaning, ...prevWords]);
			setNewMeaning('');
		}
	};

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

					<div
						className={`${styles.submitBtn} ${
							word && (foundWords.length || newMeaning) ? styles.active : ''
						}`}
						onClick={handleSubmit}
					>
						{buttonText}
					</div>
				</div>

				<form
					className={styles.wordForm}
					onSubmit={e => handleAddMeaning(e, newMeaning)}
				>
					<label htmlFor='word'>{startLang}</label>
					<WordInput
						value={word}
						onKeyDown={e => {
							if (e.key === 'Enter') {
								handleSearch();
							}
						}}
						onChange={e => setWord(e.target.value)}
						placeholder='단어를 입력해 주세요 (필수)'
						onClick={handleSearch}
						className={styles.margin}
					/>
					<label htmlFor='meaning'>{endLang}</label>
					<WordInput
						value={newMeaning}
						onChange={e => setNewMeaning(e.target.value)}
						placeholder='의미를 입력해 주세요 (필수)'
					/>

					<ul className={styles.meanList}>
						{foundWords.map((word, index) => (
							<li key={index} className={styles.meanItem}>
								{word}
								<button className={styles.editBtn}>
									<HiOutlinePencil className={styles.icon} />
								</button>
								<button
									className={styles.cancelBtn}
									onClick={() => handleCancelClick(index)}
								>
									<IoIosCloseCircleOutline className={styles.icon} />
								</button>
							</li>
						))}
					</ul>
				</form>

				<BookSelectionModal
					addPage={addPage}
					bookList={bookList}
					bookName={bookName}
					setBookName={setBookName}
				/>
			</div>
		</main>
	);
}

export default WordForm;
