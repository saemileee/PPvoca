import React from 'react';
import styles from '../components/BookList/Style.module.scss';
import { BsSearch, BsFileEarmarkWord } from 'react-icons/bs';
import {
	BiMessageSquareCheck,
	BiMessageSquareError,
	BiBookAdd,
} from 'react-icons/bi';
import { CiMenuKebab } from 'react-icons/ci';

function BookList() {
	return (
		<main>
			<div className={styles.inputContainer}>
				{/* <BsSearch /> */}
				<input className={styles.input} type='text' />
				<div
					onClick={() => alert('단어장 추가 버튼')}
					className={styles.bookAdd}>
					<BiBookAdd size={20} />
				</div>
			</div>
			<div className={styles.boxContainer}>
				<div className={styles.box}>
					<div className={styles.wordTitle}>영어</div>
					<div className={styles.subContent}>English / Korean</div>
					<div className={styles.modalButton}>
						<CiMenuKebab onClick={() => alert('모달창입니다.')} />
					</div>
					<div className={styles.wordButton}>
						<BsFileEarmarkWord onClick={() => alert('단어의 총갯수')} />
						10
						<BiMessageSquareCheck onClick={() => alert('외운 단어 갯수')} />0
						<BiMessageSquareError onClick={() => alert('헷갈리는 단어 갯수')} />
						0
					</div>
				</div>

				<div className={styles.box}>
					<div className={styles.wordTitle}>영어</div>
					<div className={styles.subContent}>English / Korean</div>
					<div className={styles.modalButton}>
						<CiMenuKebab onClick={() => alert('모달창입니다.')} />
					</div>
					<div className={styles.wordButton}>
						<BsFileEarmarkWord onClick={() => alert('단어의 총갯수')} />
						10
						<BiMessageSquareCheck onClick={() => alert('외운 단어 갯수')} />0
						<BiMessageSquareError onClick={() => alert('헷갈리는 단어 갯수')} />
						0
					</div>
				</div>

				<div className={styles.box}>
					<div className={styles.wordTitle}>영어</div>
					<div className={styles.subContent}>English / Korean</div>
					<div className={styles.modalButton}>
						<CiMenuKebab onClick={() => alert('모달창입니다.')} />
					</div>
					<div className={styles.wordButton}>
						<BsFileEarmarkWord onClick={() => alert('단어의 총갯수')} />
						10
						<BiMessageSquareCheck onClick={() => alert('외운 단어 갯수')} />0
						<BiMessageSquareError onClick={() => alert('헷갈리는 단어 갯수')} />
						0
					</div>
				</div>

				<div className={styles.box}>
					<div className={styles.wordTitle}>영어</div>
					<div className={styles.subContent}>English / Korean</div>
					<div className={styles.modalButton}>
						<CiMenuKebab onClick={() => alert('모달창입니다.')} />
					</div>
					<div className={styles.wordButton}>
						<BsFileEarmarkWord onClick={() => alert('단어의 총갯수')} />
						10
						<BiMessageSquareCheck onClick={() => alert('외운 단어 갯수')} />0
						<BiMessageSquareError onClick={() => alert('헷갈리는 단어 갯수')} />
						0
					</div>
				</div>

				<div className={styles.box}>
					<div className={styles.wordTitle}>영어</div>
					<div className={styles.subContent}>English / Korean</div>
					<div className={styles.modalButton}>
						<CiMenuKebab onClick={() => alert('모달창입니다.')} />
					</div>
					<div className={styles.wordButton}>
						<BsFileEarmarkWord onClick={() => alert('단어의 총갯수')} />
						10
						<BiMessageSquareCheck onClick={() => alert('외운 단어 갯수')} />0
						<BiMessageSquareError onClick={() => alert('헷갈리는 단어 갯수')} />
						0
					</div>
				</div>

				<div className={styles.box}>
					<div className={styles.wordTitle}>영어</div>
					<div className={styles.subContent}>English / Korean</div>
					<div className={styles.modalButton}>
						<CiMenuKebab onClick={() => alert('모달창입니다.')} />
					</div>
					<div className={styles.wordButton}>
						<BsFileEarmarkWord onClick={() => alert('단어의 총갯수')} />
						10
						<BiMessageSquareCheck onClick={() => alert('외운 단어 갯수')} />0
						<BiMessageSquareError onClick={() => alert('헷갈리는 단어 갯수')} />
						0
					</div>
				</div>

				<div className={styles.box}>
					<div className={styles.wordTitle}>영어</div>
					<div className={styles.subContent}>English / Korean</div>
					<div className={styles.modalButton}>
						<CiMenuKebab onClick={() => alert('모달창입니다.')} />
					</div>
					<div className={styles.wordButton}>
						<BsFileEarmarkWord onClick={() => alert('단어의 총갯수')} />
						10
						<BiMessageSquareCheck onClick={() => alert('외운 단어 갯수')} />0
						<BiMessageSquareError onClick={() => alert('헷갈리는 단어 갯수')} />
						0
					</div>
				</div>

				<div className={styles.box}>
					<div className={styles.wordTitle}>영어</div>
					<div className={styles.subContent}>English / Korean</div>
					<div className={styles.modalButton}>
						<CiMenuKebab onClick={() => alert('모달창입니다.')} />
					</div>
					<div className={styles.wordButton}>
						<BsFileEarmarkWord onClick={() => alert('단어의 총갯수')} />
						10
						<BiMessageSquareCheck onClick={() => alert('외운 단어 갯수')} />0
						<BiMessageSquareError onClick={() => alert('헷갈리는 단어 갯수')} />
						0
					</div>
				</div>
			</div>
		</main>
	);
}

export default BookList;
