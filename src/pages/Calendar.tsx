import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../components/Calendar/calender.scss';
import { useRecoilValue } from 'recoil';
import { userTokenState } from '../recoil/userState';
import Header from '../components/common/Header/Header';
import { calenderGetAll } from '../apis/calendar';
import moment from 'moment';

interface Word {
	bookId: string;
	createdAt: string;
	meanings: string[];
	ownerEmail: string;
	short_id: string;
	status: number;
	updatedAt: string;
	word: string;
	__v: number;
	_id: string;
}

function CalendarPage() {
	const [wordsList, setWordsList] = useState<Word[]>([]);
	const userToken = useRecoilValue(userTokenState);

	/**못생긴 데이터 가공하기 */
	function joinMeanings(meanings: string[]): string {
		return meanings.join(', ');
	}

	function prettyDate(uglyDate: string): string {
		const originalDate = uglyDate;
		const formattedDate = moment(originalDate).format('YYYY-MM-DD');
		return formattedDate;
	}

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

	/**useState */
	// http://localhost:3000/calendar?year=2023&month=5
	const [value, onChange] = useState<Date>(new Date());
	const day: string = moment(value).format('YYYY-MM-DD');
	const currDate: Date = new Date();
	const currDateTime: string = moment(currDate).format('MM-DD');
	const mark: string[] = [
		'2023-05-10',
		'2023-05-11',
		'2023-05-13',
		'2023-05-19',
		'2023-05-20',
		'2023-05-21',
	];

	return (
		<>
			<Header />
			<main>
				<h1>Calendar</h1>
				<Calendar
					calendarType={'US'}
					locale={'ko-KR'}
					formatDay={(locale, date) => moment(date).format('D')} // '일' 표시 x
					value={value}
					next2Label={null}
					prev2Label={null}
					tileContent={({ date, view }) => {
						// 날짜 타일에 컨텐츠 추가하기 (html 태그)
						// 추가할 html 태그를 변수 초기화
						const html: JSX.Element[] = [];
						// 현재 날짜가 post 작성한 날짜 배열(mark)에 있다면, dot div 추가
						if (mark.find(x => x === moment(date).format('YYYY-MM-DD'))) {
							html.push(<div className='dot'>{10}</div>);
						}
						// 다른 조건을 주어서 html.push 에 추가적인 html 태그를 적용할 수 있음.
						return (
							<>
								<div className='flex justify-center items-center absoluteDiv'>
									{html}
								</div>
							</>
						);
					}}
				/>
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
			</main>
		</>
	);
}

export default CalendarPage;
