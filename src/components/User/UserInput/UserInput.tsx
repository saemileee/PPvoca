import React, { useEffect } from 'react';
import styles from './UserInput.module.scss';
import useInput from '../../../hooks/useInput';
import { SiRabbitmq } from 'react-icons/si';

// prettier-ignore
type InputProps<T> = {	//disabled = false
	style?: React.CSSProperties;
	type: string;
	placeholder?: string;
	name: string;
	label?: string;
	disabled?: boolean;
	defaultValue?: string;
	condition?: string;
	error?: string;
	setValues: React.Dispatch<React.SetStateAction<T>>;
} | {	//disabled = true
	style?: React.CSSProperties;
	type: string;
	placeholder?: string;
	name: string;
	label?: string;
	defaultValue: string;
	disabled: boolean;
	condition?: string;
	error?: string;
	setValues?: React.Dispatch<React.SetStateAction<T>>;
};

function UserInput<T>({
	style,
	type,
	placeholder,
	name,
	label,
	setValues,
	defaultValue = '',
	disabled = false,
	condition,
	error,
}: InputProps<T>) {
	const [value, handleChange] = useInput('');

	useEffect(() => {
		setValues && setValues(prev => ({ ...prev, [name]: value }));
	}, [value]);

	return (
		<div className={styles.container}>
			{label && (
				<label
					htmlFor={name}
					className={
						disabled ? styles.label + ' ' + styles.disabled : styles.label
					}
				>
					<span>
						<SiRabbitmq />
					</span>
					{label}
				</label>
			)}
			{disabled ? (
				<input
					type={type}
					style={style}
					name={name}
					id={name}
					onChange={handleChange}
					className={styles.input}
					placeholder={placeholder}
					defaultValue={defaultValue}
					disabled={disabled}
				/>
			) : (
				<input
					type={type}
					style={style}
					name={name}
					id={name}
					value={value}
					onChange={handleChange}
					className={styles.input}
					placeholder={placeholder}
				/>
			)}
			{error && <p className={styles.errMsg}>{error}</p>}
			{condition && <p className={styles.msg}>{condition}</p>}
		</div>
	);
}

export default UserInput;
