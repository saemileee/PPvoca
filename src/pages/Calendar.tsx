import React, { useEffect, useState } from 'react';
/**컴포넌트 */
import Navigation from '../components/common/Navigation/Navigation';
import CalendarPaper from '../components/Calendar/CalendarPaper';
import { CalendarToggle } from '../components/Calendar/CalendarToggle';

function CalendarPage() {
	return (
		<>
			<Navigation />
			<main>
				<CalendarToggle />
				<CalendarPaper />
			</main>
		</>
	);
}
export default CalendarPage;
