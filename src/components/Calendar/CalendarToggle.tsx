import React from 'react';
import './calendar.scss';
export function CalendarToggle() {
	return (
		<div id='container'>
			<div className='toggle-switch'>
				<input type='checkbox' id='chkTog4' />
				<label htmlFor='chkTog4'>
					<span className='toggle-track'></span>
				</label>
			</div>
		</div>
	);
}
