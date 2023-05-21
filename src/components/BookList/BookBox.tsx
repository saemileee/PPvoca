import React, { useState, useEffect } from 'react';
import styles from './Style.module.scss';
import Modal from './BookListModal';
import { getWords } from '../../apis/book';
import { BsFileEarmarkWord } from 'react-icons/bs';
import { BiMessageSquareCheck, BiMessageSquareError } from 'react-icons/bi';
import { CiMenuKebab } from 'react-icons/ci';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userTokenState } from '../../recoil/userState';

interface BookBoxProps {
	book: any;
	handleEdit: () => void;
	handleDelete: () => void;
}

function BookBox({ book, handleEdit, handleDelete }: BookBoxProps) {
	const navigate = useNavigate();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const [wordCount, setWordCount] = useState(0);
	const [memorizedWordCount, setMemorizedWordCount] = useState(0);
	const [confusedWordCount, setConfusedWordCount] = useState(0);
	const userToken = useRecoilValue(userTokenState);

	useEffect(() => {
		const fetchWordCount = async () => {
			try {
				const response = await getWords(book.short_id, userToken);
				setWordCount(response.data.length);
				setMemorizedWordCount(
					response.data.filter((word: { status: number }) => word.status === 1)
						.length,
				);
				setConfusedWordCount(
					response.data.filter((word: { status: number }) => word.status === 2)
						.length,
				);
			} catch (error) {
				console.log(error);
			}
		};

		fetchWordCount();
	}, [book, userToken]);

	const handleMenuClick = (event: React.MouseEvent<HTMLDivElement>) => {
		event.stopPropagation();
		event.preventDefault();
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	const handleBoxClick = () => {
		navigate(`/word/list/${book.short_id}`);
	};

	return (
		<div className={styles.box} onClick={handleBoxClick}>
			<div className={styles.wordTitle}>{book.name}</div>
			<div className={styles.subContent}>
				{book.start_lang} / {book.end_lang}
			</div>
			<div onClick={handleMenuClick} className={styles.modalButton}>
				<CiMenuKebab size={24} />
			</div>
			<Modal
				isOpen={isModalOpen}
				onClose={handleCloseModal}
				onEdit={handleEdit}
				onDelete={handleDelete}
			/>
			<div className={styles.wordButton}>
				<div className={styles.totalWord}>
					<BsFileEarmarkWord size={24} />
					{wordCount}
				</div>
				<div className={styles.memorizedWord}>
					<BiMessageSquareCheck size={24} />
					{memorizedWordCount}
				</div>
				<div className={styles.confusedWord}>
					<BiMessageSquareError size={24} />
					{confusedWordCount}
				</div>
			</div>
		</div>
	);
}

export default BookBox;
