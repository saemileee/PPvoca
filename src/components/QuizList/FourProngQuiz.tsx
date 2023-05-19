/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { fourProngProblems } from './quiz-mock';
import styles from './FourProng.module.scss';

type TypeAnswer = {
	wordId: string;
	word: string;
	meanings: string[];
	status: number;
};

type TypeSelection = {
	isCorrect?: boolean;
	word: string;
	meanings: string[];
};

type TypeProblem = {
	answer: TypeAnswer;
	selections: TypeSelection[];
};

const FourProngQuiz = () => {
	const [problems, setProblems] = useState<TypeProblem[]>([]);

	useEffect(() => {
		setProblems(fourProngProblems);
	}, []);
	return (
		<>
			<header>사지선다</header>
			{problems
				? problems.map((problem, index) => (
						<Quiz
							key={`quiz-${index}`}
							page={{ currentPage: index + 1, allPages: problems.length }}
							problemData={problem}
						/>
				  ))
				: '생성 된 문제가 없습니다.'}
		</>
	);
};

export default FourProngQuiz;

type TypeQuizProps = {
	problemData: TypeProblem;
	page: { currentPage: number; allPages: number };
};

function Quiz({ problemData, page }: TypeQuizProps) {
	const { answer, selections } = problemData;

	const [isSelected, setIsSelected] = useState(false);
	const [isShowAnswer, setIsShowAnswer] = useState(false);
	const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);
	const [isShowMeaning, setIsShowMeaning] = useState([]);
	const [selectedSelections, setSelectedSelections] = useState<number[]>([]);
	const [fourSelections, setFourSelections] = useState<TypeSelection[]>([]);

	useEffect(() => {
		// 답안지, 보기 랜덤 섞어서 출제
		const incorrectSelections = selections.map((selection: TypeSelection) => {
			return { isCorrect: false, ...selection };
		});
		const fourSelections = [
			...incorrectSelections,
			{ isCorrect: true, word: answer.word, meanings: answer.meanings },
		];
		fourSelections.sort(() => Math.random() - 0.4);
		setFourSelections(fourSelections);
	}, [selections]);

	const handleSelectionClick = (correct: string, index: string) => {
		// const target = e.target as HTMLButtonElement;
		const isCorrect = JSON.parse(correct);
		const selectedIndex = Number(index);
		setSelectedSelections(prev => {
			return [...prev, selectedIndex];
		});

		// 클릭한 답이 정답일 경우에만 답안지 보여주기
		isCorrect ? setIsShowAnswer(() => true) : null;

		// 최초 클릭 한 답이 정답일 경우 맞춘 배열에 넣기
		if (!isSelected) {
			setIsSelected(true);
			// 이건 더 상위에서 관리되어야 함
			isCorrect
				? setCorrectAnswers((prev: string[]) => {
						return [...prev, answer.wordId];
				  })
				: null;
		}
	};

	return (
		<main>
			<div className={styles.topContainer}>
				<span className={styles.page}>
					{page.currentPage}/{page.allPages}
				</span>
				<span className={styles.status}>status</span>
			</div>
			<div className={styles.problemContainer}>
				<p>{answer.word}</p>
				<ul style={!isShowAnswer ? { display: 'none' } : undefined}>
					{answer.meanings.map((meaning: string) => (
						<li>{meaning}</li>
					))}
				</ul>
			</div>
			<div className={styles.selectionContainer}>
				<ul>
					{fourSelections.map((selection: TypeSelection, index: number) => (
						<li
							key={`selection-${index}`}
							data-correct={selection.isCorrect}
							data-index={index}
							className={
								selection.isCorrect && selectedSelections.includes(index)
									? styles.selectionCorrect
									: !selection.isCorrect && selectedSelections.includes(index)
									? styles.selectionIncorrect
									: undefined
							}
							onClick={e => {
								handleSelectionClick(
									e.currentTarget.dataset.correct!,
									e.currentTarget.dataset.index!,
								);
							}}>
							<span>
								{selection.meanings.map((meaning: string) => (
									<span className={styles.selectionMeaning}>{meaning}</span>
								))}
							</span>
							<span
								style={
									!selectedSelections.includes(index)
										? { display: 'none' }
										: undefined
								}
								className={styles.selectionWord}>
								{selection.word}
							</span>
						</li>
					))}
				</ul>
			</div>
			<div className={styles.buttonContainer}>
				<button>prev</button>
				<button>next</button>
			</div>
		</main>
	);
}
