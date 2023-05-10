import React from 'react';
import { MdArrowBackIosNew } from 'react-icons/md';
import { BsJournalBookmark } from 'react-icons/bs';
import { TbLanguage } from 'react-icons/tb';
import { HiOutlineSwitchVertical } from 'react-icons/hi';
import styles from './bookform.module.scss';

function Component() {
	return (
		<div className={styles.container}>
			<div className={styles.bookHeader}>
				<button>
					<MdArrowBackIosNew className={styles.icon} />
				</button>
				<h1>단어장</h1>
				<button>생성</button>
			</div>
			<form className={styles.bookForm}>
				<p>
					<BsJournalBookmark className={styles.icon} />
					이름 & 설명
				</p>
				<input type='text' placeholder='단어장 이름을 입력해 주세요!' />
				<textarea placeholder='단어장 설명을 입력해 주세요! (선택)'></textarea>

				<p>
					<TbLanguage className={styles.icon} />
					언어
				</p>
				{/* <div className={styles.bookLanguage}>
					<ul>
						<li>단어</li>
						<li>English</li>
					</ul>
					<button>
						<HiOutlineSwitchVertical className={styles.icon}/>
					</button>
					<ul>
						<li>의미</li>
						<li>Korean</li>
					</ul>
				</div> */}
				<table className={styles.bookLanguage}>
					<tr>
						<td>단어</td>
						<td>English</td>
					</tr>
					<button>
						<HiOutlineSwitchVertical className={styles.icon} />
					</button>
					<tr>
						<td>의미</td>
						<td>Korean</td>
					</tr>
				</table>
			</form>
		</div>
	);
}

export default Component;
