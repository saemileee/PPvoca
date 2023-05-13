import React, { useState, useEffect, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import BookHeader from '../components/BookForm/BookHeader';
import styles from '../components/BookForm/bookform.module.scss';
import { BsJournalBookmark } from 'react-icons/bs';
import { IoLanguageOutline } from 'react-icons/io5';
import { BsArrowDownUp } from 'react-icons/bs';

// 더미 데이터
const mockData = {
	description: '단어장 설명입니다',
	end_lang: 'English',
	name: '영단어',
	start_lang: 'Korean',
};

const editPage = location.pathname === '/book/edit';
const addPage = location.pathname === '/book/add';

function BookForm() {
	const navigate = useNavigate();

	const [buttonText, setButtonText] = useState('');
	const [bookName, setBookName] = useState('');
	const [bookDescription, setBookDescription] = useState('');
	const [bookLanguage, setBookLanguage] = useState({
		word: 'English',
		meaning: 'Korean',
	});

	// 생성, 수정 버튼 글자 바꾸기, 수정페이지면 데이터 가져오기
	useEffect(() => {
		if (addPage) {
			setButtonText('생성');
		} else if (editPage) {
			setButtonText('수정');
			setBookName(mockData.name);
			setBookDescription(mockData.description);
			setBookLanguage({
				word: mockData.start_lang,
				meaning: mockData.end_lang,
			});
		}
	}, []);

	// add, edit 다르게 처리
	function handleSubmit() {
		if (!bookName) {
			return;
		}
		const bookData = {
			name: bookName,
			description: bookDescription,
			start_lang: bookLanguage.word,
			end_lang: bookLanguage.meaning,
		};

		if (editPage) {
			if (
				bookData.name === mockData.name &&
				bookData.description === mockData.description &&
				bookData.start_lang === mockData.start_lang &&
				bookData.end_lang === mockData.end_lang
			) {
				return;
			}
		}
		console.log(bookData);
		if (editPage) {
			alert(`${bookName} 수정 완료`);
		} else if (addPage) {
			alert(`${bookName} 생성 완료`);
		}
		navigate('/book/list');
	}

	// if (addPage) {
	// 	axios.post('/api/books', bookData)
	// 		.then((response) => {
	// 		})
	// 		.catch((error) => {
	// 		});
	// } else if (editPage) {
	// 	axios.put(`/api/books/`, bookData)
	// 		.then((response) => {
	// 		})
	// 		.catch((error) => {
	// 			console.error(error);
	// 		});
	// }

	// 단어장
	function handleNameChange(event: ChangeEvent<HTMLInputElement>) {
		setBookName(event.target.value);
	}

	// 설명
	function handleDescChange(event: ChangeEvent<HTMLTextAreaElement>) {
		setBookDescription(event.target.value);
	}

	// 언어 토글
	function handleToggleLanguage() {
		setBookLanguage({ word: bookLanguage.meaning, meaning: bookLanguage.word });
	}

	return (
		<main>
			<div className={styles.container}>
				<BookHeader
					title='단어장'
					buttonText={buttonText}
					onButtonClick={handleSubmit}
				/>
				<form className={styles.bookForm}>
					<p>
						<BsJournalBookmark className={styles.icon} />
						이름 & 설명
					</p>
					<input
						type='text'
						placeholder='단어장 이름을 입력해 주세요!'
						value={bookName}
						onChange={handleNameChange}
					/>
					<textarea
						placeholder='단어장 설명을 입력해 주세요! (선택)'
						value={bookDescription}
						onChange={handleDescChange}
					/>
					<p>
						<IoLanguageOutline className={styles.icon} />
						언어
					</p>
					<table className={styles.bookLanguage}>
						<tbody>
							<tr>
								<td>단어</td>
								<td className={styles.language}>{bookLanguage.word}</td>
							</tr>
							<tr>
								<td>
									<button
										onClick={e => {
											e.preventDefault();
											handleToggleLanguage();
										}}
									>
										<BsArrowDownUp className={styles.icon} />
									</button>
								</td>
							</tr>
							<tr>
								<td>의미</td>
								<td className={styles.language}>{bookLanguage.meaning}</td>
							</tr>
						</tbody>
					</table>
				</form>
			</div>
		</main>
	);
}

export default BookForm;
