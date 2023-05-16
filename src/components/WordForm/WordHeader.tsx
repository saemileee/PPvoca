import React, { FC } from 'react';
import { IoIosArrowDropdownCircle } from 'react-icons/io';
import { MdArrowBackIosNew } from 'react-icons/md';
import styles from './wordform.module.scss';

interface BookInfo {
	bookName: string;
}

interface WordHeaderProps {
	setShowModal: (value: boolean) => void;
	navigate: (value: number) => void;
	handleSubmit: () => void;
	bookInfo: BookInfo;
	addPage: boolean;
	editPage: boolean;
	word: string;
	currMeaning: string[];
	meaning: string;
	buttonText: string;
}

const WordHeader: FC<WordHeaderProps> = ({
	addPage,
	editPage,
	navigate,
	bookInfo,
	setShowModal,
	word,
	currMeaning,
	meaning,
	handleSubmit,
}) => {
	return (
		<div className={styles.wordHeader}>
			{addPage ? (
				<span>
					<p>선택된 단어장</p>
					{bookInfo.bookName ? (
						<button
							onClick={() => setShowModal(true)}
							className={styles.modalArrow}
						>
							<h1 className={styles.bookTitle}>
								{bookInfo.bookName}
								<div>
									<IoIosArrowDropdownCircle className={styles.icon} />
								</div>
							</h1>
						</button>
					) : (
						<h1 className={styles.bookTitle}>단어장을 만들어주세요!</h1>
					)}
				</span>
			) : editPage ? (
				<div className={styles.editHeader}>
					<button className={styles.arrowBtn} onClick={() => navigate(-1)}>
						<MdArrowBackIosNew className={styles.icon} />
					</button>
					<h1 className={styles.bookTitle}>단어</h1>
				</div>
			) : null}

			<div
				className={`${styles.submitBtn} ${
					word && (currMeaning.length || meaning) ? styles.active : ''
				}`}
				onClick={handleSubmit}
			>
				{addPage ? '추가' : editPage ? '수정' : null}
			</div>
		</div>
	);
};

export default WordHeader;
