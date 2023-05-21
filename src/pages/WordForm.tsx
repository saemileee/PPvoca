import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { addedWord, selectedWord, updatedWord } from '../apis/word';
import { bookListAll } from '../apis/book';
import { useRecoilValue } from 'recoil';
import { userTokenState } from '../recoil/userState';

import Navigation from '../components/common/Navigation/Navigation';
import WordHeader from '../components/WordForm/WordHeader';
import BookListModal from '../components/WordForm/BookListModal';
import LoginAlertModal from '../components/common/LoginAlertModal/LoginAlertModal';
import AlertModal from '../components/common/AlertModal/AlertModal';
import WordFormDetail from '../components/WordForm/WordFormDetail'
import Modal from '../components/common/Modal/Modal';
import styles from '../components/WordForm/WordForm.module.scss';


function WordForm() {
	const { wordId } = useParams();
	const userToken = useRecoilValue(userTokenState);
	const editPage = location.pathname === `/word/edit/${wordId}`;
	const addPage = location.pathname === '/word/add';

	/** State */
	const [showModal, setShowModal] = useState(false);
	const [alertModalOpen, setAlertModalOpen] = useState(false);
	const [shouldGoBack, setShouldGoBack] = useState(false);
	const [message, setMessage] = useState('');
	const [loginAlertModalOpen, setLoginAlertModalOpen] = useState(false);
	const [bookList, setBookList] = useState([]);
	const [bookInfo, setBookInfo] = useState({
		name: '',
		startLang: '',
		endLang: '',
		short_id: '',
	});
	const [words, setWords] = useState({
		meaning: '',
		currMeaning: [] as string[],
		word: '',
	});
	const [bookId, setBookId] = useState('')

	/** API 연결 */
	type Book = {
		name: string;
		startLang: string;
		endLang: string;
		short_id: string;
	};

	// 단어장 모두 검색 (로그인, 비로그인)
	const getBookList = async () => {
		if (userToken) {
			try {
				const response = await bookListAll(userToken);
				if (response.status === 200) {
					const bookLists = response.data;
					console.log(bookLists)
					setBookList(bookLists);
					if (bookLists.length > 0) {
						if (addPage) {
							const { name, start_lang, end_lang, short_id } = bookLists[0];
							setBookInfo({
								name: name,
								startLang: start_lang,
								endLang: end_lang,
								short_id: short_id,
							});
						} else if (editPage) {
							getWords();
						}
					}
				}
			} catch (err) {
				console.log(err);
			}
		}
	};

	// 단어 불러오기
	const getWords = async () => {
		try {
			if (!wordId) {
				return;
			}
			const response = await selectedWord(wordId, userToken);
			const { word, meanings, bookId } = response.data;
			if (response.status === 200) {
				// 단어에서 불러온 단어 bookId랑 단어장 목록에서 shortId 같은 거 비교해서 start_lang 찾기
				setBookId(bookId)

				setWords(prevWords => ({
					...prevWords,
					word: word,
					currMeaning: meanings,
				}));
			}
		} catch (err) {
			console.log(err);
		}
	};

	// 단어 추가 및 수정
	const handleSubmit = async () => {
		if (userToken) {
			if (!words.word || (!words.currMeaning.length && !words.meaning)) {
				return;
			}
			let meanings = words.currMeaning;
			if (words.meaning) {
				meanings = [words.meaning, ...words.currMeaning];
			}
			const addData = {
				word: words.word,
				meanings: meanings,
				bookId: bookInfo.short_id
			};

			const editData = {
				word: words.word,
				meanings: meanings
			};

			if (addPage) {
				try {
					if (!bookInfo.name) {
						alert('단어장을 선택해주세요.');
						return;
					}
					const response = await addedWord(userToken, addData);
					if (response.status === 200) {
						setMessage(`[${words.word}] 단어 추가 완료`)
						setAlertModalOpen(true);
						setWords(prevWords => ({
							...prevWords,
							word: '',
							meaning: '',
							currMeaning: []
						}));
						setShouldGoBack(false);
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
					const response = await updatedWord(wordId, userToken, editData);
					if (response.status === 200) {
						setMessage(`[${words.word}] 단어 수정 완료`);
						setAlertModalOpen(true);
						setShouldGoBack(true);
					}
				} catch (err) {
					console.log(err);
				}
			}
		} else {
			setLoginAlertModalOpen(true);

		}
	};

	useEffect(() => {
		getBookList();
		if (addPage) {
			clearData();
		}
	}, [editPage]);

	useEffect(() => {
		if (bookId && bookList.length > 0) {
			const selectedBook = bookList.find((book: Book) => book.short_id === bookId);
			if (selectedBook) {
				const { start_lang, end_lang } = selectedBook;
				setBookInfo((prevBookInfo) => ({
					...prevBookInfo,
					startLang: start_lang,
					endLang: end_lang,
				}));
			}
		}
	}, [bookId, bookList])


	const clearData = () => {
		setWords(prevWords => ({
			...prevWords,
			word: '',
			currMeaning: [],
		}));
	};

	return (
		<>
			<Navigation></Navigation>
			<main>
				<div className={styles.container}>
					{/* WordHeader */}
					<WordHeader
						bookInfo={bookInfo}
						setShowModal={setShowModal}
						words={words}
						handleSubmit={handleSubmit}
					/>

					{/* WordFormDetail */}
					<WordFormDetail
						bookInfo={bookInfo}
						words={words}
						setWords={setWords}
					/>
				</div>
				<AlertModal
					isOpen={alertModalOpen}
					onClose={() => {
						setAlertModalOpen(false);
						if (shouldGoBack) {
							history.back();
						}
					}}
					message={message}
				/>
				{
					loginAlertModalOpen && (
						<LoginAlertModal onClose={() => setLoginAlertModalOpen(false)} />
					)
				}
			</main>
			{/* BookListModal */}
			{addPage &&
				(<div className={styles.bookBtn}>
					<Modal
						showModal={showModal}
						setShowModal={setShowModal}
						title='단어장 선택'>
						<BookListModal
							setShowModal={setShowModal}
							bookList={bookList}
							bookInfo={bookInfo}
							setBookInfo={setBookInfo}
						/>
					</Modal>
				</div>)}
		</>
	);
}

export default WordForm;
