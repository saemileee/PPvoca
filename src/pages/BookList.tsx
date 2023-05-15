import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../components/BookList/Style.module.scss';
import AddButton from '../components/common/AddButton/AddButton';
import WordSearch from '../components/BookList/WordSearch';
import BookBox from '../components/BookList/BookBox';
import { useRecoilValue } from 'recoil';
import { userTokenState } from '../recoil/userState';
import { useNavigate } from 'react-router-dom';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

function BookList() {
	const userToken = useRecoilValue(userTokenState);
	const navigate = useNavigate();
	const [books, setBooks] = useState<any[]>([]);

	useEffect(() => {
		async function fetchBooks() {
			try {
				const response = await axios.get(`${baseUrl}/books`, {
					headers: {
						Authorization: `Bearer ${userToken}`,
					},
				});
				const booksData = response.data;
				setBooks(booksData);
			} catch (error) {
				console.log(error);
			}
		}

		fetchBooks();
	}, []);

	const handleEdit = (bookShortId: string) => {
		// 수정 기능 추가 예정
	};

	const handleDelete = async (bookShortId: string) => {
		if (window.confirm('단어장을 삭제 하시겠습니까?')) {
			try {
				await axios.delete(`${baseUrl}/books/${bookShortId}`, {
					headers: {
						Authorization: `Bearer ${userToken}`,
					},
				});
				setBooks(books.filter(book => book.short_id !== bookShortId));
				navigate('/book/list');
			} catch (error) {
				console.log(error);
			}
		}
	};

	return (
		<main>
			<WordSearch />
			<div className={styles.boxContainer}>
				{books.map(book => (
					<BookBox
						key={book.short_id}
						book={book}
						handleEdit={() => handleEdit(book.short_id)}
						handleDelete={() => handleDelete(book.short_id)}
					/>
				))}
			</div>
			<AddButton url={'/book/add'} />
		</main>
	);
}

export default BookList;
