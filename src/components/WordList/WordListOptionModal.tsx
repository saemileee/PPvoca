import React, { useEffect, useRef } from 'react';
import styles from '../WordList/WordListStyle.module.scss';
import {
	BiMessageSquare,
	BiMessageSquareCheck,
	BiMessageSquareError,
} from 'react-icons/bi';
import { AiOutlineDelete } from 'react-icons/ai';
import { useRecoilValue } from 'recoil';
import { userTokenState } from '../../recoil/userState';
import { deleteWords } from '../../apis/word';
import checkedWordList from '../../recoil/checkedWordList';

type Props = {
	setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

function WordListOptionsModal({ setModalOpen }: Props) {
	const userToken = useRecoilValue(userTokenState);
	const checkedList = useRecoilValue(checkedWordList);

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
	const handleDelete = async () => {
		if (checkedList.length === 0) {
			alert('삭제할 단어를 선택해주세요!');
			return;
		} else {
			for (let i = 0; i < checkedList.length; i++) {
				await deleteWords(userToken, checkedList[i]);
			}
			alert('삭제되었습니다.');
			location.reload();
		}
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

	//모든 단어가 체크됐는지 확인
	useEffect(() => {
		console.log(checkedList);
	}, [checkedList]);

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
