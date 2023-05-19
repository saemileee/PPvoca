import React from 'react';
import styles from '../components/Quiz/QuizResult.module.scss';

type TypeResultProps = {
	correctAnswers: string[];
	incorrectAnswers: string[];
	style: { display: string } | undefined;
	isDone: boolean;
};
function Result({
	correctAnswers,
	incorrectAnswers,
	style,
	isDone,
}: TypeResultProps) {
	const numberOfCorrects = correctAnswers.length;
	const numberOfAll = correctAnswers.length + incorrectAnswers.length;

	const correctPercentage = (numberOfCorrects / numberOfAll) * 100;
	const radius = 90; // 반지름
	const circumference = 2 * Math.PI * radius; // 원둘레
	const progressLength = (circumference * correctPercentage) / 100;
	const remainingLength = circumference - progressLength;

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
				<button>퀴즈 정답보기</button>
				<button>다시하기</button>
				<button>다른 퀴즈 풀기</button>
			</div>
		</div>
	);
}

export default Result;
