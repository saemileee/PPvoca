import React, { useEffect, useState } from 'react';
/**의존성 */
import moment from 'moment';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './calender.scss';
import { calenderGetAllWords } from '../../apis/calendar';
import { Word, prettyDate, joinMeanings } from './CalendarType';
import { useRecoilValue } from 'recoil';
import { userTokenState } from '../../recoil/userState';

function CalendarPaper() {
	const [wordsList, setWordsList] = useState<Word[]>([]);
	const userToken = useRecoilValue(userTokenState);
	const [value, onChange] = useState<Date>(new Date());
	const day: string = moment(value).format('YYYY-MM-DD');
	const currDate: Date = new Date();
	const currDateTime: string = moment(currDate).format('MM-DD');
	const [mark, setMark] = useState<string[]>([]);
	/**useEffect */
	useEffect(() => {
		const fetchData = async () => {
			const currentDate = moment();
			const year = currentDate.year();
			const month = currentDate.month() + 1;
			try {
				const 데이터: Word[] = await calenderGetAllWords(
					userToken,
					year,
					month,
				);
				setWordsList(데이터);
				// createdAt 값을 추출하여 mark 배열에 추가합니다.
				const createdAtList = 데이터.map(item => prettyDate(item.createdAt));
				setMark(createdAtList);
				console.log(mark);
			} catch (error) {
				console.error(error);
			}
		};

		fetchData();
	}, []);

	return (
		<>
			<Calendar
				calendarType={'US'}
				locale={'ko-KR'}
				formatDay={(locale, date) => moment(date).format('D')}
				value={value}
				next2Label={null}
				prev2Label={null}
				view={'month'}
				tileContent={({ date }) => {
					const dateStr = moment(date).format('YYYY-MM-DD');
					const wordCount = mark.filter(
						createdAt => createdAt === dateStr,
					).length;

					return (
						<div className='tile-content'>
							{wordCount > 0 && <div className='dot'>{wordCount}</div>}
						</div>
					);
				}}
			/>
		</>
	);
}

export default CalendarPaper;
