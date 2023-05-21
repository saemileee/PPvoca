import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai';

type Props = {
	url: string;
	bookId?: string | undefined;
};

const WordAddButton = ({ url, bookId }: Props) => {
	const nav = useNavigate();
	const newState = { bookId: bookId };
	return (
		<button
			onClick={() => nav(url, { state: newState })}
			style={{
				position: 'absolute',
				bottom: '70px',
				right: '20px',
				backgroundColor: 'white',
				color: 'white',
				borderRadius: '50%',
				width: '60px',
				height: '60px',
				border: '1px solid black',
				outline: 'none',
				cursor: 'pointer',
				transition:
					'background-color 0.3s ease-in-out, color 0.3s ease-in-out',
				display: 'flex',
				justifyContent: 'center',
				alignItems: 'center',
				fontSize: '24px',
			}}
		>
			<AiOutlinePlus style={{ color: 'black' }} />
		</button>
	);
};

export default WordAddButton;
