import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userTokenState } from '../recoil/userState';
import styles from '../components/Quiz/QuizList.module.scss';
import QuizList, { InterfaceQuiz } from '../components/Quiz/QuizList';
import Navigation from '../components/common/Navigation/Navigation';
import Header from '../components/common/Header/Header';

const quizList: InterfaceQuiz[] = [
	{
		id: 'four-prong',
		title: '사지선다',
		description: '올바른 정답을 선택하세요!',
		img: '',
	},
	{
		id: 'dictation',
		title: '받아쓰기',
		description: '올바른 정답을 선택하세요!',
		img: '',
	},
];

function Quiz() {
	return (
		<>
			<Header title={'퀴즈'} />
			<main className={styles.container}>
				{quizList.map(quiz => (
					<QuizList key={quiz.id} quizInfo={quiz} />
				))}
			</main>
			<Navigation />
		</>
	);
}

export default Quiz;
