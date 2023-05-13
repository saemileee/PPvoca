import React, { FC } from 'react';
import styles from './bookform.module.scss';
import { MdArrowBackIosNew } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

interface Props {
	title: string;
	buttonText: string;
	onButtonClick: () => void;
}

// FC(Functional Component)
const BookHeader: FC<Props> = ({ title, buttonText, onButtonClick }) => {
	const navigate = useNavigate();

	// 뒤로가기
	const onBackButtonClick = () => {
		navigate(-1);
	};
	return (
		<div className={styles.bookHeader}>
			<button onClick={onBackButtonClick}>
				<MdArrowBackIosNew className={styles.icon} />
			</button>
			<h1>{title}</h1>
			<div className={styles.submitBtn} onClick={onButtonClick}>
				{buttonText}
			</div>
		</div>
	);
};

export default BookHeader;
