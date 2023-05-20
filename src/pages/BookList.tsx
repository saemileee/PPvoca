import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from '../components/BookList/Style.module.scss';
import AddButton from '../components/common/AddButton/AddButton';
import WordSearch from '../components/BookList/WordSearch';
import BookBox from '../components/BookList/BookBox';
import ConfirmModal from '../components/BookList/ConfirmModal';
import AlertModal from '../components/common/AlertModal/AlertModal';
import { useRecoilValue } from 'recoil';
import { userTokenState } from '../recoil/userState';
import { useNavigate } from 'react-router-dom';
import Navigation from '../components/common/Navigation/Navigation';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

function BookList() {
	const userToken = useRecoilValue(userTokenState);
	const navigate = useNavigate();
	const [books, setBooks] = useState<any[]>([]);
	const [deleteModalOpen, setDeleteModalOpen] = useState(false);
	const [bookToDelete, setBookToDelete] = useState('');
	const [alertModalOpen, setAlertModalOpen] = useState(false);

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
	}, [userToken]);

	const handleEdit = (bookShortId: string) => {
		navigate(`/book/edit/${bookShortId}`);
	};

	const handleDeleteRequest = (bookShortId: string) => {
		setBookToDelete(bookShortId);
		setDeleteModalOpen(true);
	};

	const handleDeleteConfirm = async () => {
		try {
			await axios.delete(`${baseUrl}/books/${bookToDelete}`, {
				headers: {
					Authorization: `Bearer ${userToken}`,
				},
			});
			setBooks(books.filter(book => book.short_id !== bookToDelete));
			setDeleteModalOpen(false);
			setAlertModalOpen(true);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<>
			<Navigation />
			<main>
				<WordSearch />
				<div className={styles.boxContainer}>
					{books.map(book => (
						<BookBox
							key={book.short_id}
							book={book}
							handleEdit={() => handleEdit(book.short_id)}
							handleDelete={() => handleDeleteRequest(book.short_id)}
						/>
					))}
				</div>
				<AddButton url={'/book/add'} />
				<ConfirmModal
					isOpen={deleteModalOpen}
					onClose={() => setDeleteModalOpen(false)}
					onConfirm={handleDeleteConfirm}
				/>
				<AlertModal
					isOpen={alertModalOpen}
					onClose={() => setAlertModalOpen(false)}
					message='삭제가 완료되었습니다.'
				/>
			</main>
		</>
	);
}

export default BookList;
