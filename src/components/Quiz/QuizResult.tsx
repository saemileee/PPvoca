import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { quizAnswers } from './quiz-mock';
import QuizAnswerModal from './QuizAnswerModal';
import styles from './QuizResult.module.scss';

type TypeResultProps = {
	correctAnswers: string[];
	incorrectAnswers: string[];
	style: { display: string } | undefined;
	isDone: boolean;
	onClickQuizRestart: any;
};
type TypeAnswer = {
	isCorrect?: boolean;
	wordId: string;
	word: string;
	meanings: string[];
	status: number;
};
function QuizResult({
	correctAnswers,
	incorrectAnswers,
	style,
	isDone,
	onClickQuizRestart,
}: TypeResultProps) {
	const numberOfCorrects = correctAnswers.length;
	const numberOfAll = correctAnswers.length + incorrectAnswers.length;
	const correctPercentage = (numberOfCorrects / numberOfAll) * 100;
	const radius = 90; // 반지름
	const circumference = 2 * Math.PI * radius; // 원둘레
	const progressLength = (circumference * correctPercentage) / 100;
	const remainingLength = circumference - progressLength;
	const navigate = useNavigate();

	const [isShowQuizAnswers, setIsShowQuizAnswers] = useState(false);

	// 문제들 api 보내기
	// 문제 답 + 뜻 + 정오답 여부 mapping
	const [answerList, setAnswerList] = useState<TypeAnswer[]>([]);

	// api로 문제들 답 get 하기
	useEffect(() => {
		// return setAnswerList(quizAnswers);
		const newAnswerList = quizAnswers.map((answer: TypeAnswer) => {
			if (correctAnswers.includes(answer.wordId)) {
				answer.isCorrect = true;
				return answer;
			} else {
				answer.isCorrect = false;
				return answer;
			}
		});
		setAnswerList(newAnswerList);
	}, [isDone]);

	return (
		<div style={style} className={styles.resultContainer}>
			<div className={styles.result}>
				<svg viewBox='0 0 200 200'>
					<circle cx='100' cy='100' r='90' />
					<circle
						cx='100'
						cy='100'
						r='90'
						strokeDasharray={`${progressLength} ${remainingLength}`}
						transform='rotate(-90) translate(-200)'
						className={isDone ? styles.circleAnimation : undefined}
					/>
				</svg>
				<span>
					{numberOfCorrects}/{numberOfAll}
				</span>
			</div>
			<div className={styles.buttonContainer}>
				<button onClick={() => setIsShowQuizAnswers(true)}>
					퀴즈 정답보기
				</button>
				<button onClick={onClickQuizRestart()}>다시하기</button>
				<button
					onClick={() => {
						navigate('/quiz/list');
					}}
				>
					다른 퀴즈 풀기
				</button>
			</div>
			<QuizAnswerModal
				answerList={answerList}
				showModal={isShowQuizAnswers}
				setShowModal={setIsShowQuizAnswers}
			/>
		</div>
	);
}

export default QuizResult;
