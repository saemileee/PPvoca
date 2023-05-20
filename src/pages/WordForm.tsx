import React, { useState, useEffect, ChangeEvent, useRef } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import {
	addedWord,
	selectedWord,
	crawlingWord,
	updatedWord,
} from '../apis/word';
import WordInput from '../components/WordForm/WordInput';
import WordHeader from '../components/WordForm/WordHeader';
import Modal from '../components/common/Modal/Modal';

import { bookListAll } from '../apis/book';
import styles from '../components/WordForm/wordform.module.scss';

import { IoIosCloseCircleOutline } from 'react-icons/io';
import { BsJournalBookmark } from 'react-icons/bs';
import { HiOutlinePencil } from 'react-icons/hi';

import { useRecoilValue } from 'recoil';
import { infoUser } from '../apis/user';
import { userTokenState } from '../recoil/userState';
import Navigation from '../components/common/Navigation/Navigation';

function WordForm() {
	const userToken = useRecoilValue(userTokenState);

	const [errorCaption, setErrorCaption] = useState('');
	const [showModal, setShowModal] = useState(false);
	const [buttonText, setButtonText] = useState('');
	const [meaning, setMeaning] = useState('');
	const [currMeaning, setCurrMeaning] = useState<string[]>([]);
	const [word, setWord] = useState('');
	const [bookList, setBookList] = useState([]);

	const [words, setWords] = useState({
		meaning: '',
		currMeaning: [],
		word: '',
	});

	// 기존 단어장 목록 불러오기 (모달)
	const [bookInfo, setBookInfo] = useState({
		bookName: '',
		startLang: '',
		endLang: '',
		short_id: '',
	});

	const navigate = useNavigate();
	const location = useLocation();
	const { wordId } = useParams();
	const editPage = location.pathname === `/word/edit/${wordId}`;
	const addPage = location.pathname === '/word/add';

	// 정규식
	const validateInput = (inputValue: string, startLang: string): string => {
		if (!inputValue) {
			return '';
		}

		if (startLang === 'korean' && !/^[ㄱ-ㅎㅏ-ㅣ가-힣]+$/.test(inputValue)) {
			return '한글로 입력해 주세요.';
		} else if (startLang === 'english' && !/^[a-zA-Z]+$/.test(inputValue)) {
			return '영어로 입력해 주세요.';
		}

		return '';
	};

	// 포커스 이동
	const inputRef = useRef<HTMLInputElement>(null);
	const focusInput = () => {
		if (inputRef.current) {
			inputRef.current.focus();
		}
	};

	/** 핸들링 함수 */

	// 단어 검색
	const handleSearch = async () => {
		if (bookInfo.startLang === 'korean') {
			const currMeaning = await crawledWord('ko', word);
			if (currMeaning && currMeaning.length > 0) {
				setCurrMeaning(currMeaning);
			} else {
				setCurrMeaning([]);
			}
		} else if (bookInfo.startLang === 'english') {
			const currMeaning = await crawledWord('en', word);
			if (currMeaning && currMeaning.length > 0) {
				setCurrMeaning(currMeaning);
			} else {
				setCurrMeaning([]);
			}
		}
	};

	// 의미 추가
	const handleMeaningChange = (e: ChangeEvent<HTMLInputElement>) => {
		setMeaning(e.target.value);
	};

	const handleAddMeaning = () => {
		if (meaning.trim() !== '') {
			setCurrMeaning(prevMeanings => [meaning, ...prevMeanings]);
			setMeaning('');
		}
	};

	// 의미 삭제
	const handleDeleteMeaning = (index: number) => {
		setCurrMeaning(prevMeanings => {
			const updatedMeanings = [...prevMeanings];
			updatedMeanings.splice(index, 1);
			return updatedMeanings;
		});
	};

	/** API 연결 */

	// 단어 크롤링
	const crawledWord = async (lang: string, searchWord: string) => {
		try {
			const response = await crawlingWord(lang, searchWord);
			if (response.status === 204) {
				setErrorCaption('검색 결과가 없습니다.');
			}
			focusInput();
			return response.data;
		} catch (error) {
			console.log(error);
		}
	};

	// 단어장 모두 검색
	const getBookList = async () => {
		try {
			const response = await bookListAll(userToken);
			if (response.status === 200) {
				const bookList = response.data;
				setBookList(bookList);
				if (bookList.length > 0) {
					const { name, start_lang, end_lang, short_id } = bookList[0];
					setBookInfo({
						bookName: name,
						startLang: start_lang,
						endLang: end_lang,
						short_id: short_id,
					});
				}
			}
		} catch (err) {
			console.log(err);
			// alert('단어장 정보를 불러오는데 실패하였습니다.');
		}
	};

	// 단어 불러오기
	const getWords = async () => {
		try {
			if (!wordId) {
				return;
			}
			const response = await selectedWord(wordId, userToken);
			const { word, meanings } = response.data;
			if (response.status === 200) {
				setWord(word);
				setCurrMeaning(meanings);
			}
		} catch (err) {
			console.log(err);
			// alert('단어를 불러올 수 없습니다.');
		}
	};

	// 단어 추가 및 수정
	const handleSubmit = async () => {
		if (!word || (!currMeaning.length && !meaning)) {
			return;
		}
		let meanings = currMeaning;
		if (meaning) {
			meanings = [meaning, ...currMeaning];
		}
		const addData = {
			word: word,
			meanings: meanings,
			bookId: bookInfo.short_id,
		};

		const editData = {
			word: word,
			meanings: meanings,
		};

		if (addPage) {
			try {
				if (!bookInfo.bookName) {
					alert('단어장을 선택해주세요.');
					return;
				}
				const response = await addedWord(userToken, addData);
				if (response.status === 200) {
					alert(`[${word}] 단어 추가 완료`);
					setWord('');
					setMeaning('');
					setCurrMeaning([]);
				}
			} catch (err) {
				console.log(err);
				alert('단어를 추가하지 못했습니다.');
			}
		} else if (editPage) {
			try {
				if (!wordId) {
					return;
				}
				console.log(wordId);
				const response = await updatedWord(wordId, userToken, editData);
				if (response.status === 200) {
					alert(`[${word}] 단어 수정 완료`);
					history.back();
				}
			} catch (err) {
				console.log(err);
			}
		}
	};

	useEffect(() => {
		if (editPage) {
			getWords();
		} else {
			clearData();
		}
		getBookList();
	}, [editPage]);

	// editPage에서 벗어날때 데이터 초기화
	const clearData = () => {
		setWord('');
		setCurrMeaning([]);
	};

	return (
		<>
			<Navigation></Navigation>
			<main>
				<div className={styles.container}>
					<WordHeader
						addPage={addPage}
						editPage={editPage}
						navigate={navigate}
						bookInfo={bookInfo}
						setShowModal={setShowModal}
						word={word}
						currMeaning={currMeaning}
						meaning={meaning}
						handleSubmit={handleSubmit}
						buttonText={buttonText}
					/>

					<form className={styles.wordForm} onSubmit={e => e.preventDefault()}>
						<div className={styles.wordInputWrap}>
							<label htmlFor='word'>{bookInfo.startLang}</label>
							<WordInput
								value={word}
								onKeyDown={e => {
									if (e.key === 'Enter') {
										handleSearch();
									}
								}}
								onChange={e => {
									const inputValue = e.target.value;
									const errorCaption = validateInput(
										inputValue,
										bookInfo.startLang,
									);
									setErrorCaption(errorCaption);
									setWord(inputValue);
								}}
								placeholder='단어를 입력해 주세요 (필수)'
								onClick={handleSearch}
								errorCaption={errorCaption}
							/>
						</div>
						<div className={styles.wordInputWrap}>
							<label htmlFor='meaning' className={styles.margin}>
								{bookInfo.endLang}
							</label>
							<input
								type='text'
								placeholder='의미를 입력해 주세요 (필수)'
								value={meaning}
								ref={inputRef}
								onChange={handleMeaningChange}
								onKeyPress={e => {
									if (e.key === 'Enter') {
										e.preventDefault();
										handleAddMeaning();
									}
								}}
							/>

							<ul className={styles.meanList}>
								{currMeaning.map((word, index) => (
									<li key={index} className={styles.meanItem}>
										<p>{word}</p>

										<div>
											{/* <button
										>
											<HiOutlinePencil className={styles.icon} />
										</button> */}
											<button
												className={styles.cancelBtn}
												onClick={() => handleDeleteMeaning(index)}
											>
												<IoIosCloseCircleOutline className={styles.icon} />
											</button>
										</div>
									</li>
								))}
							</ul>
						</div>
					</form>
				</div>
			</main>
			{addPage && (
				<div className={styles.bookBtn}>
					<Modal
						showModal={showModal}
						setShowModal={setShowModal}
						title='단어장 선택'
					>
						<ul className={styles.modalBookList}>
							{bookList.map(
								({ name, start_lang, end_lang, short_id }, index) => (
									<li
										key={index}
										className={`${styles.modalBookItem} ${
											short_id === bookInfo.short_id ? styles.selected : ''
										}`}
										onClick={() => {
											setShowModal(false);
											setBookInfo({
												bookName: name,
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
								),
							)}
						</ul>
					</Modal>
				</div>
			)}
		</>
	);
}

export default WordForm;
