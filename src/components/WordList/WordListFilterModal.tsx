import React, { useEffect, useRef } from 'react';
import styles from '../WordList/WordListStyle.module.scss';
import {
	BiMessageSquare,
	BiMessageSquareCheck,
	BiMessageSquareError,
} from 'react-icons/bi';
import { IoIosCloseCircleOutline } from 'react-icons/io';

interface Props {
	setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function WordListFilterModal({ setModalOpen }: Props) {
	const modalRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const handler = (event: MouseEvent) => {
			if (
				modalRef.current &&
				!modalRef.current.contains(event.target as Node)
			) {
				setModalOpen(false);
			}
		};

		document.addEventListener('mousedown', handler);
		return () => {
			document.removeEventListener('mousedown', handler);
		};
	});

	return (
		<div className={styles.modalWrapper} ref={modalRef}>
			<div className={styles.modal}>
				<div className={styles.header}>
					<div className={styles.title}>보기 설정</div>
					<div className={styles.close} onClick={() => setModalOpen(false)}>
						<IoIosCloseCircleOutline />
					</div>
				</div>
				<div className={styles.content}>
					<div className={styles.mark}>
						<div className={styles.markIcon}>
							<BiMessageSquare />
						</div>
						<div className={styles.markText}>미분류 단어</div>
					</div>
					<div className={styles.mark}>
						<div className={styles.markIcon}>
							<BiMessageSquareCheck />
						</div>
						<div className={styles.markText}>외운 단어</div>
					</div>
					<div className={styles.mark}>
						<div className={styles.markIcon}>
							<BiMessageSquareError />
						</div>
						<div className={styles.markText}>헷갈리는 단어</div>
					</div>
				</div>
			</div>
			<div
				className={styles.backdrop}
				onClick={() => setModalOpen(false)}
			></div>
		</div>
	);
}

export default WordListFilterModal;
