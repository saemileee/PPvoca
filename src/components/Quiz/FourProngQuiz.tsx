/* eslint-disable */
import React, { useEffect, useState } from 'react';
import { fourProngProblems } from './quiz-mock';
import styles from './FourProng.module.scss';
import ChangeStatus from '../common/Status/Status';
import QuizResult from './QuizResult';
import Header from '../common/Header/Header';

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
	const [currentQuiz, setCurrentQuiz] = useState<number>(0);
	const [correctAnswers, setCorrectAnswers] = useState<string[]>([]);
	const [incorrectAnswers, setIncorrectAnswers] = useState<string[]>([]);
	const [isDone, setIsDone] = useState(false);
	const [isRestartButtonClick, setIsRestartButtonClick] = useState<number>(0);

	useEffect(() => {
		setProblems(fourProngProblems);
	}, []);

	//리스타트 시 문제 순서 랜덤 변경
	function shuffleArray(array: TypeProblem[]) {
		for (let i = array.length - 1; i > 0; i--) {
			const j = Math.floor(Math.random() * (i + 1));
			[array[i], array[j]] = [array[j], array[i]];
		}
		return array;
	}

	useEffect(() => {
		setProblems(current => {
			const newProblems = shuffleArray([...current]);
			return newProblems;
		});
	}, [isRestartButtonClick]);

	const addCorrectAnswers = (isCorrect: boolean, wordId: string) => {
		if (isCorrect) {
			setCorrectAnswers((prev: string[]) => {
				return [...prev, wordId];
			});
		} else {
			setIncorrectAnswers((prev: string[]) => {
				return [...prev, wordId];
			});
		}
	};
	// 문제 안 풀고 넘어갔을 때 isDone일 때 incorrectAnswers에 문제 Id 추가 필요
	const handleQuizRestartButtonClick = () => {
		setIsRestartButtonClick(prev => prev + 1);
		setCurrentQuiz(0);
		setIsDone(false);
		setCorrectAnswers([]);
		setIncorrectAnswers([]);
	};

	return (
		<>
			<Header title={'사지선다'}></Header>
			<div className={styles.quizContainer}>
				<div style={isDone ? { display: 'none' } : undefined}>
					{problems
						? problems.map((problem, index) => (
								<Quiz
									style={
										currentQuiz !== index ? { display: 'none' } : undefined
									}
									key={`quiz-${index}`}
									page={{ currentPage: index + 1, allPages: problems.length }}
									problemData={problem}
									onAnswerClick={(isCorrect: boolean, wordId: string) => {
										addCorrectAnswers(isCorrect, wordId);
									}}
									isRestartButtonClick={isRestartButtonClick}
								/>
						  ))
						: '생성 된 문제가 없습니다.'}
					<div className={styles.buttonContainer}>
						<button
							onClick={() => {
								currentQuiz !== 0 ? setCurrentQuiz(prev => prev - 1) : null;
							}}
						>
							prev
						</button>
						<button
							onClick={() =>
								currentQuiz !== problems.length - 1
									? setCurrentQuiz(prev => prev + 1)
									: setIsDone(true)
							}
						>
							next
						</button>
					</div>
				</div>
			</div>
			<QuizResult
				correctAnswers={correctAnswers}
				incorrectAnswers={incorrectAnswers}
				style={!isDone ? { display: 'none' } : undefined}
				isDone={isDone}
				onClickQuizRestart={() => handleQuizRestartButtonClick}
			/>
		</>
	);
};

export default FourProngQuiz;

type TypeQuizProps = {
	isRestartButtonClick: number;
	problemData: TypeProblem;
	page: { currentPage: number; allPages: number };
	style: { display: string } | undefined;
	onAnswerClick: any;
};

function Quiz({
	isRestartButtonClick,
	problemData,
	page,
	style,
	onAnswerClick,
}: TypeQuizProps) {
	const { answer, selections } = problemData;

	const [isSelected, setIsSelected] = useState(false);
	const [isShowAnswer, setIsShowAnswer] = useState(false);
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
	}, [selections, isRestartButtonClick]);

	useEffect(() => {
		setIsSelected(false);
		setIsShowAnswer(false);
		setSelectedSelections([]);
	}, [isRestartButtonClick]);

	const handleSelectionClick = (correct: string, index: string) => {
		const isCorrect = JSON.parse(correct);
		const selectedIndex = Number(index);
		setSelectedSelections(prev => {
			return [...prev, selectedIndex];
		});

		// 클릭한 답이 정답일 경우에만 답안지 보여주기
		isCorrect ? setIsShowAnswer(() => true) : null;

		// 최초 클릭 한 답이 정답일 경우 맞춘 배열에 넣기
		if (!isSelected) {
			isCorrect
				? onAnswerClick(true, answer.wordId)
				: onAnswerClick(false, answer.wordId);
		}

		//최초 답 선택 후 상태 변경
		setIsSelected(true);
	};

	return (
		<div style={style} className={styles.contentsContainer}>
			<div className={styles.topContainer}>
				<span className={styles.page}>
					{page.currentPage}/{page.allPages}
				</span>
				<ChangeStatus id={answer.wordId} initialStatus={answer.status} />
				{/* <span className={styles.status}>status</span> */}
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
							}}
						>
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
								className={styles.selectionWord}
							>
								{selection.word}
							</span>
						</li>
					))}
				</ul>
			</div>
		</div>
	);
}
