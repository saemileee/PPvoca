import React, { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { userTokenState } from '../../recoil/userState';
import { Word, prettyDate, joinMeanings } from './CalendarType';
import { calenderGetAll } from '../../apis/calendar';

function CalendarList() {
	const [wordsList, setWordsList] = useState<Word[]>([]);
	const userToken = useRecoilValue(userTokenState);
	/**useEffect */
	useEffect(() => {
		const fetchData = async () => {
			try {
				const 데이터: Word[] = await calenderGetAll(userToken);
				setWordsList(() => {
					return 데이터;
				});
			} catch (error) {
				console.error(error);
			}
		};
		fetchData();
	}, []);
	return (
		<>
			<ul>
				{wordsList.map((word, index) => {
					return (
						<li key={index}>
							<h3>{word.word}</h3>
							<div>{joinMeanings(word.meanings)}</div>
							<div>{prettyDate(word.createdAt)}</div>
							<div>{word.status}</div>
						</li>
					);
				})}
			</ul>
		</>
	);
}

export default CalendarList;
