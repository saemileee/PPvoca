import React, { useState, useEffect, ChangeEvent } from 'react';
import { useNavigate, useLocation, useParams } from 'react-router-dom';
import BookHeader from '../components/BookForm/BookHeader';
import styles from '../components/BookForm/bookform.module.scss';
import { BsJournalBookmark } from 'react-icons/bs';
import { IoLanguageOutline } from 'react-icons/io5';
import { BsArrowDownUp } from 'react-icons/bs';
import { useRecoilValue } from 'recoil';
import { infoUser } from '../apis/user';
import { userTokenState } from '../recoil/userState';

import { addedBook, selectedBook, updatedBook } from '../apis/book';
import Navigation from '../components/common/Navigation/Navigation';

function BookForm() {
	const userToken = useRecoilValue(userTokenState);
	const navigate = useNavigate();
	const [bookInfo, setBookInfo] = useState({
		bookDescription: '',
		bookName: '',
		word: 'english',
		meaning: 'korean',
	});

	const { bookId } = useParams();
	const location = useLocation();
	const editPage = location.pathname === `/book/edit/${bookId}`;
	const addPage = location.pathname === '/book/add';

	/** 핸들링 함수 */

	// 단어장 이름 변경
	const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
		setBookInfo(prevBookInfo => ({
			...prevBookInfo,
			bookName: event.target.value,
		}));
	};

	// 단어장 설명 변경
	const handleDescChange = (event: ChangeEvent<HTMLTextAreaElement>) => {
		setBookInfo(prevBookInfo => ({
			...prevBookInfo,
			bookDescription: event.target.value,
		}));
	};

	// start_lang 변경
	const handleToggleLanguage = () => {
		setBookInfo(prevBookInfo => ({
			...prevBookInfo,
			word: prevBookInfo.meaning,
			meaning: prevBookInfo.word,
		}));
	};

	/** API 연결 */
	let bookData: BookData = {
		name: '',
		description: '',
		start_lang: '',
		end_lang: '',
	};
	interface BookData {
		name: string;
		description: string;
		start_lang: string;
		end_lang: string;
	}
	// 단어장 가져오기
	const getBookList = async () => {
		try {
			if (!bookId) {
				return;
			}
			const response = await selectedBook(bookId, userToken);
			bookData = response.data[0];
			if (response.status === 200) {
				setBookInfo({
					bookDescription: bookData.description,
					bookName: bookData.name,
					word: bookData.start_lang,
					meaning: bookData.end_lang,
				});
			}
		} catch (err) {
			console.log(err);
			alert('단어장 정보를 불러오는데 실패하였습니다.');
		}
	};

	// 단어장 생성 및 수정
	const handleSubmit = async () => {
		if (!bookInfo.bookName) {
			return;
		}
		const data = {
			name: bookInfo.bookName,
			description: bookInfo.bookDescription,
			start_lang: bookInfo.word,
			end_lang: bookInfo.meaning,
		};

		if (addPage) {
			try {
				const response = await addedBook(userToken, data);
				if (response.status === 201) {
					alert(`[${bookInfo.bookName}] 생성 완료`);
					navigate('/book/list');
				}
			} catch (err) {
				console.log(err);
				alert('단어장 생성 실패');
			}
		} else if (editPage) {
			try {
				if (!bookId) {
					return;
				}
				const response = await updatedBook(bookId, userToken, data);
				if (response.status === 200) {
					alert(`[${bookInfo.bookName}] 수정 완료`);
					navigate('/book/list');
				}
			} catch (err) {
				console.log(err);
				alert('단어장 수정 실패');
			}
		}
	};

	useEffect(() => {
		if (editPage) {
			getBookList();
		}
	}, []);

	return (
		<>
			<Navigation></Navigation>
			<main>
				<div className={styles.container}>
					<BookHeader
						addPage={addPage}
						editPage={editPage}
						title='단어장'
						className={
							bookInfo.bookName
								? `${styles.active} ${styles.className}`
								: styles.className
						}
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
							value={bookInfo.bookName || ''}
							onChange={handleNameChange}
						/>
						<textarea
							placeholder='단어장 설명을 입력해 주세요! (선택)'
							value={bookInfo.bookDescription}
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
									<td className={styles.language}>{bookInfo.word}</td>
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
									<td className={styles.language}>{bookInfo.meaning}</td>
								</tr>
							</tbody>
						</table>
					</form>
				</div>
			</main>
		</>
	);
}

export default BookForm;
