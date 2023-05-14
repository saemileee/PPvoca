import React, { KeyboardEvent, ChangeEvent, MouseEvent } from 'react';
import styles from './wordform.module.scss';
import { IoSearchOutline } from 'react-icons/io5';

interface WordInputProps {
	value: string;
	placeholder: string;
	className?: string;
	onKeyDown?: (event: KeyboardEvent<HTMLInputElement>) => void;
	onChange: (event: ChangeEvent<HTMLInputElement>) => void;
	onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
}

const WordInput: React.FC<WordInputProps> = ({
	value,
	onKeyDown,
	onChange,
	placeholder,
	onClick,
	className,
}) => {
	return (
		<div>
			<div className={`${styles.wordInput} ${className || ''}`}>
				<input
					type='text'
					placeholder={placeholder}
					value={value}
					onChange={onChange}
					onKeyDown={onKeyDown}
				/>
				{onClick && (
					<button type='button' className={styles.searchBtn} onClick={onClick}>
						<IoSearchOutline className={styles.icon} />
					</button>
				)}
			</div>
		</div>
	);
};

export default WordInput;
