import React, { useEffect, useRef, useState } from 'react';
import styles from '../WordList/WordListStyle.module.scss';
import {
	BiMessageSquare,
	BiMessageSquareCheck,
	BiMessageSquareError,
} from 'react-icons/bi';
import { IoIosCloseCircleOutline } from 'react-icons/io';

//단어 정보들에 대한 타입
type WordListItem = {
	short_id: string;
	word: string;
	meanings: Array<string>;
	status: number;
	createdAt: string;
};

//상위 컴포넌트(WordList)에서 받아온 props 타입
type Props = {
	setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
	wordList: WordListItem[];
	setWordList: React.Dispatch<React.SetStateAction<WordListItem[]>>;
}

function WordListFilterModal({ setModalOpen, wordList, setWordList }: Props) {
	const modalRef = useRef<HTMLDivElement>(null);
	//원래 wordList를 변경하지 않고 filter용 wordList 생성
	const [originalList, setOriginalList] = useState(wordList);

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

	function handleFilterReset() {
		setWordList(originalList);
	}

	function handleFilterUnmark() {
		const filteredList = originalList.filter((list) => list.status === 0);
		setWordList(filteredList);
	}

	function handleFilterCheck() {
		const filteredList = originalList.filter((list) => list.status === 1);
		setWordList(filteredList);
	}

	function handleFilterUnknown() {
		const filteredList = originalList.filter((list) => list.status === 2);
		setWordList(filteredList);
	}

	return (
		<div className={styles.modalBack}>
			<div className={styles.modal} ref={modalRef}>
				<div className={styles.header}>
					<div className={styles.title}>보기 설정</div>
					<div className={styles.close} onClick={() => setModalOpen(false)}>
						<IoIosCloseCircleOutline />
					</div>
				</div>
				<div className={styles.content}>
					<div className={styles.reset} onClick={handleFilterReset}>
						초기화
					</div>
					<div className={styles.mark} onClick={handleFilterUnmark}>
						<div className={styles.markIcon}>
							<BiMessageSquare />
						</div>
						<div className={styles.markText}>미분류 단어</div>
					</div>
					<div className={styles.mark} onClick={handleFilterCheck}>
						<div className={styles.markIcon}>
							<BiMessageSquareCheck />
						</div>
						<div className={styles.markText}>외운 단어</div>
					</div>
					<div className={styles.mark} onClick={handleFilterUnknown}>
						<div className={styles.markIcon}>
							<BiMessageSquareError />
						</div>
						<div className={styles.markText}>헷갈리는 단어</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export default WordListFilterModal;
