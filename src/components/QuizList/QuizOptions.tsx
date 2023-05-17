import React, { useEffect, useState } from 'react';

export function BookOption() {
	return (
		<li>
			<p>문제 범위</p>
			<button>단어장 전체</button>
		</li>
	);
}

export function TypeOption({ onQuizTypeChange }: any) {
	const handleRadioChange = (e: {
		target: { value: React.SetStateAction<string> };
	}) => {
		onQuizTypeChange(e.target.value);
	};

	return (
		<li>
			<p>문제 타입</p>
			<label htmlFor='word-type'>
				단어
				<input
					type='radio'
					id='word-type'
					name='type'
					value='word'
					checked
					onChange={handleRadioChange}
				/>
			</label>
			<label>
				의미
				<input
					type='radio'
					id='meaning-type'
					name='type'
					value='meaning'
					onChange={handleRadioChange}
				/>
			</label>
		</li>
	);
}

export function NumberOption() {
	return (
		<li>
			<p>문제 개수</p>
			<input type='number' step={5} min={5} max={50}></input>
		</li>
	);
}

export function WordStatusOption() {
	const [wordStatus, setWordStatus] = useState([true, true, true]);

	const handleCheckboxChange = (index: number) => {
		const newWordStatus = [...wordStatus];
		newWordStatus[index] = !newWordStatus[index];
		setWordStatus(newWordStatus);
	};

	return (
		<li>
			<p>문제 상태</p>
			<label>
				미분류 단어
				<input
					id='0-type'
					type='checkbox'
					name='type'
					value='0'
					checked={wordStatus[0]}
					onChange={() => handleCheckboxChange(0)}
				/>
			</label>
			<label>
				외운 단어
				<input
					id='1-type'
					type='checkbox'
					name='type'
					value='1'
					checked={wordStatus[1]}
					onChange={() => handleCheckboxChange(1)}
				/>
			</label>
			<label>
				헷갈리는 단어
				<input
					id='2-type'
					type='checkbox'
					name='type'
					value='2'
					checked={wordStatus[2]}
					onChange={() => handleCheckboxChange(2)}
				/>
			</label>
		</li>
	);
}
