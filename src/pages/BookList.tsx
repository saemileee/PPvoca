import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../components/BookList/Style.module.scss';
import AddButton from '../components/common/AddButton/AddButton';
import Modal from '../components/BookList/BookListModal';
import { BsFileEarmarkWord } from 'react-icons/bs';
import { BiMessageSquareCheck, BiMessageSquareError } from 'react-icons/bi';
import { CiMenuKebab } from 'react-icons/ci';
import { IoSearchOutline } from 'react-icons/io5';

function BookList() {
	const navigate = useNavigate();
	const [isModalOpen, setIsModalOpen] = useState(false);

	const handleMenuClick = (event: React.MouseEvent<HTMLDivElement>) => {
		event.stopPropagation();
		event.preventDefault();
		setIsModalOpen(true);
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
	};

	function handleBoxClick() {
		navigate('/word/list');
	}

	function handleEdit() {
		// 수정 기능 추가 예정
		handleCloseModal();
	}

	function handleDelete() {
		// 삭제 기능 추가 예정
		handleCloseModal();
	}

	return (
		<main>
			<div
				className={styles.inputContainer}
				onClick={() => navigate('/word/all')}
			>
				<div className={styles.input}>단어 검색</div>
				<div className={styles.searchIcon}>
					<IoSearchOutline size={24} />
				</div>
			</div>
			<div className={styles.boxContainer}>
				<div onClick={handleBoxClick} className={styles.box}>
					<div className={styles.wordTitle}>영어</div>
					<div className={styles.subContent}>English / Korean</div>
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
							10
						</div>
						<div>
							<BiMessageSquareCheck size={24} />0
						</div>
						<div>
							<BiMessageSquareError size={24} />0
						</div>
					</div>
				</div>
			</div>
			<AddButton url={'/book/add'} />
		</main>
	);
}

export default BookList;
