import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../components/BookList/Style.module.scss';
import AddButton from '../components/common/AddButton/AddButton';
import { BsFileEarmarkWord } from 'react-icons/bs';
import { BiMessageSquareCheck, BiMessageSquareError } from 'react-icons/bi';
import { CiMenuKebab } from 'react-icons/ci';
import { IoSearchOutline } from 'react-icons/io5';
import { AiOutlineDelete } from 'react-icons/ai';
import { HiOutlinePencil } from 'react-icons/hi';

function BookList() {
	const navigate = useNavigate();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const modalRef = useRef<HTMLDivElement>(null);

	const handleMenuClick = (event: React.MouseEvent<HTMLDivElement>) => {
		event.stopPropagation();
		event.preventDefault();
		setIsModalOpen(true);
	};

	const handleClickOutside = (event: MouseEvent) => {
		if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
			setIsModalOpen(false);
		}
	};

	useEffect(() => {
		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, []);

	function handleBoxClick() {
		navigate('/word/list');
	}

	function handleEdit() {
		// 수정 기능 추가
		setIsModalOpen(false);
	}

	function handleDelete() {
		// 삭제 기능 추가
		setIsModalOpen(false);
	}

	return (
		<main>
			<div className={styles.inputContainer}>
				<input className={styles.input} type='text' placeholder='단어 검색' />
				<div className={styles.searchIcon} onClick={() => alert('검색 버튼')}>
					<IoSearchOutline size={20} />
				</div>
			</div>
			<div className={styles.boxContainer}>
				<div onClick={handleBoxClick} className={styles.box}>
					<div className={styles.wordTitle}>영어</div>
					<div className={styles.subContent}>English / Korean</div>
					<div onClick={handleMenuClick} className={styles.modalButton}>
						<CiMenuKebab />
					</div>
					{isModalOpen && (
						<div ref={modalRef} className={styles.modal}>
							<button onClick={handleEdit}>
								<AiOutlineDelete />
								수정
							</button>
							<button onClick={handleDelete}>
								<HiOutlinePencil />
								삭제
							</button>
						</div>
					)}
					<div className={styles.wordButton}>
						<div>
							<BsFileEarmarkWord />
							10
						</div>
						<div>
							<BiMessageSquareCheck />0
						</div>
						<div>
							<BiMessageSquareError />0
						</div>
					</div>
				</div>
			</div>
			<AddButton url={'/book/add'} />
		</main>
	);
}

export default BookList;
