import React, { useState } from 'react';
import Modal from '../common/Modal/Modal';
import { BsJournalBookmark } from 'react-icons/bs';
import styles from '../WordForm/wordform.module.scss';

interface BookListModalProps {
	addPage: boolean;
	bookList: { name: string }[];
	bookName: string;
	setBookName: React.Dispatch<React.SetStateAction<string>>;
}

const BookListModal: React.FC<BookListModalProps> = ({
	addPage,
	bookList,
	bookName,
	setBookName,
}) => {
	const [showModal, setShowModal] = useState(false);

	return (
		<>
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
						<ul className={styles.modalBookList}>
							{bookList.map((book, index) => (
								<li
									className={`${styles.modalBookItem} ${
										book.name === bookName ? styles.selected : ''
									}`}
									key={index}
									onClick={() => {
										setShowModal(false);
										setBookName(book.name);
									}}
								>
									<div>
										<BsJournalBookmark className={styles.icon} />
									</div>
									{book.name}
								</li>
							))}
						</ul>
					</Modal>
				</div>
			)}
		</>
	);
};

export default BookListModal;
