import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { userTokenState } from '../recoil/userState';
import styles from '../components/QuizList/QuizList.module.scss';
import Logo from '../components/common/Logo/Logo';
import RegisterForm from '../components/Register/RegisterForm';
import List, { Quiz } from '../components/QuizList/List';
import Header from '../components/common/Header/Header';

const quizList: Quiz[] = [
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

function QuizList() {
	return (
		<>
			<Header />
			<main className={styles.container}>
				<header>퀴즈</header>
				<main>
					{quizList.map(quiz => (
						<List key={quiz.id} quizInfo={quiz} />
					))}
				</main>
			</main>
		</>
	);
}

export default QuizList;
