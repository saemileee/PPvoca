import React, { useEffect, useState } from 'react';
/**컴포넌트 */
import Navigation from '../components/common/Navigation/Navigation';
import CalendarList from '../components/Calendar/CalendarList';
import CalendarPaper from '../components/Calendar/CalendarPaper';

function CalendarPage() {
	return (
		<>
			<Navigation />
			<main>
				<h1>버튼들어갈자리</h1>
				<CalendarPaper />
				<CalendarList />
			</main>
		</>
	);
}

export default CalendarPage;
