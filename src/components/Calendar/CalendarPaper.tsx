import React, { useEffect, useState } from 'react';
/**의존성 */
import Calendar from 'react-calendar';
import moment from 'moment';
import 'react-calendar/dist/Calendar.css';
import './calender.scss';

function CalendarPaper() {
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
			<Calendar
				calendarType={'US'}
				locale={'ko-KR'}
				formatDay={(locale, date) => moment(date).format('D')} // '일' 표시 x
				value={value}
				next2Label={null}
				prev2Label={null}
				view={'month'}
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
		</>
	);
}

export default CalendarPaper;
