import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../components/BookList/Style.module.scss';
import AddButton from '../components/common/AddButton/AddButton';
import WordSearch from '../components/BookList/WordSearch';
import BookBox from '../components/BookList/BookBox';
// import { Book } from '../components/BookList/types';
import { useRecoilValue } from 'recoil';
import { userTokenState } from '../recoil/userState';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

function BookList() {
	const userToken = useRecoilValue(userTokenState);
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

	function handleEdit() {
		// 수정 기능 추가 예정
	}

	function handleDelete() {
		// 삭제 기능 추가 예정
	}

	return (
		<main>
			<WordSearch />
			<div className={styles.boxContainer}>
				{books.map(book => (
					<BookBox
						key={book.short_id}
						book={book}
						handleEdit={handleEdit}
						handleDelete={handleDelete}
					/>
				))}
			</div>
			<AddButton url={'/book/add'} />
		</main>
	);
}

export default BookList;
