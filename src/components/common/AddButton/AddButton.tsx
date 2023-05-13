import React from 'react';
import { Link } from 'react-router-dom';
import { AiOutlinePlus } from 'react-icons/ai';

type Props = {
	url: string;
};

const WordAddButton = ({ url }: Props) => {
	return (
		<Link to={`${url}`}>
			<button
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
		</Link>
	);
};

export default WordAddButton;
