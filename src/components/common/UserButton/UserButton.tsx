import React from 'react';
import { Link } from 'react-router-dom';
import styles from './UserButton.module.scss';

// prettier-ignore
type ButtonProps = {	//Button
		children: React.ReactNode;
		style?: React.CSSProperties;
		type?: 'button' | 'submit' | 'reset';
		onClick: React.MouseEventHandler<HTMLButtonElement>;
		path?: never;
	} | {	//Link
		children: React.ReactNode;
		style?: React.CSSProperties;
		type: 'link';
		onClick?: never;
		path: string;
	};

function UserButton({
	children,
	style,
	type = 'button',
	path,
	onClick: handleClick,
}: ButtonProps) {
	return (
		<>
			{type === 'link' ? (
				<Link to={`${path}`} style={style} className={styles.button}>
					{children}
				</Link>
			) : (
				<button
					className={styles.button}
					style={style}
					type={type}
					onClick={handleClick}
				>
					{children}
				</button>
			)}
		</>
	);
}

export default UserButton;
