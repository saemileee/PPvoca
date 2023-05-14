import React, { useEffect, useRef } from 'react';
import styles from '../WordList/WordListStyle.module.scss';
import {
	BiMessageSquare,
	BiMessageSquareCheck,
	BiMessageSquareError,
} from 'react-icons/bi';
import { AiOutlineDelete } from 'react-icons/ai';

interface Props {
	setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

function WordListOptionsModal({ setModalOpen }: Props) {
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

	//선택목록 삭제
	const handleDelete = () => {
		alert('삭제되었습니다.');
	};
	//전체 미분류로
	const handleAllUnmark = () => {
		alert('미분류 처리되었습니다.');
	};
	//전체 외운 단어로
	const handleAllCheck = () => {
		alert('외운 단어로 처리되었습니다.');
	};
	//전체 헷갈리는 단어로
	const handleAllUnknown = () => {
		alert('헷갈리는 단어로 처리되었습니다.');
	};

	return (
		<div>
			<div>
				<div className={styles.optionscontainer} ref={modalRef}>
					<div className={styles.delete} onClick={handleDelete}>
						<AiOutlineDelete />
						&nbsp;&nbsp;선택된 단어 삭제
					</div>
					<div className={styles.unmark} onClick={handleAllUnmark}>
						<BiMessageSquare />
						&nbsp;&nbsp;마크 해제
					</div>
					<div className={styles.check} onClick={handleAllCheck}>
						<BiMessageSquareCheck />
						&nbsp;&nbsp;외운 단어 마크
					</div>
					<div className={styles.unknown} onClick={handleAllUnknown}>
						<BiMessageSquareError />
						&nbsp;&nbsp;헷갈리는 단어 마크
					</div>
				</div>
			</div>
		</div>
	);
}

export default WordListOptionsModal;
