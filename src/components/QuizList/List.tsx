import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import styles from './QuizList.module.scss';
import Modal from '../common/Modal/Modal';
import {
	BookOption,
	NumberOption,
	TypeOption,
	WordStatusOption,
} from './QuizOptions';

export interface Quiz {
	id: string;
	title: string;
	description: string;
	img: string;
}

interface ListProps {
	quizInfo: Quiz;
}

function List({ quizInfo }: ListProps) {
	const [showModal, setShowModal] = useState(false);
	const { id, title, description, img } = quizInfo;
	const [quizType, setQuizType] = useState('word'); // quizType 상태값

	const handleQuizTypeChange = (type: string) => {
		setQuizType(type); // quizType 상태값 변경
	};

	const handleStartQuiz = () => {
		console.log(quizType);
	};

	return (
		<>
			<div className={styles.list} onClick={() => setShowModal(true)}>
				<div className={styles['img-container']}>
					<img src={img}></img>
				</div>
				<div className={styles['des-container']}>
					<p>{title}</p>
					<p>{description}</p>
				</div>
			</div>
			<Modal
				showModal={showModal}
				setShowModal={setShowModal}
				title='퀴즈 옵션 설정'>
				<ul className={styles.optionContainer}>
					{/* 컴포넌트화 필요 */}
					<BookOption />
					<TypeOption onQuizTypeChange={handleQuizTypeChange} />
					<NumberOption />
					<WordStatusOption />
				</ul>
				<div>
					{/* 클릭하면 옵션의 세팅과 퀴즈 id에 따라 알맞은 방법으로 api 호출 */}
					<button className='quiz-start-button' onClick={handleStartQuiz}>
						퀴즈 시작
					</button>
				</div>
			</Modal>
		</>
	);
}

export default List;
