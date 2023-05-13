import React, { useState } from 'react';
import {
	BiMessageSquare,
	BiMessageSquareCheck,
	BiMessageSquareError,
} from 'react-icons/bi';

function ChangeStatus({ initialStatus }: { initialStatus: number }) {
	const [status, setStatus] = useState(initialStatus);

	function getStatusIcon() {
		switch (status) {
			case 1:
				return <BiMessageSquareCheck />;
			case 2:
				return <BiMessageSquareError />;
			default:
				return <BiMessageSquare />;
		}
	}
	return (
		<div onClick={() => setStatus((status + 1) % 3)}>{getStatusIcon()}</div>
	);
}

export default ChangeStatus;
