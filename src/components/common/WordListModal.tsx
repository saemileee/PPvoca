import React, { useEffect, useRef } from 'react';
import styles from '../WordList/WordListStyle.module.scss';
import { BiMessageSquare, BiMessageSquareCheck, BiMessageSquareError } from "react-icons/bi";
import { AiOutlineDelete } from "react-icons/ai";

interface Props {
	setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function WordListModal({ setModalOpen }: Props) {
	const modalRef = useRef<HTMLDivElement>(null);
	useEffect(() => {
		const handler = (event: MouseEvent) => {
			if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
				setModalOpen(false);
			}
		}
		document.addEventListener('mousedown', handler);
		return () => {
			document.removeEventListener('mousedown', handler);
		}
	})

	return (
		<div>
			<div>
				<div className={styles.container} ref={modalRef}>
					<div className={styles.delete}><AiOutlineDelete />&nbsp;&nbsp;삭제</div>
					<div className={styles.unmark}><BiMessageSquare />&nbsp;&nbsp;마크 해제</div>
					<div className={styles.remember}><BiMessageSquareCheck />&nbsp;&nbsp;외운 단어 마크</div>
					<div className={styles.unknown}><BiMessageSquareError />&nbsp;&nbsp;헷갈리는 단어 마크</div>
				</div>
			</div>
		</div>
	);
}

export default WordListModal;
