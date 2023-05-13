import React, { useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styles from './WordListStyle.module.scss';
import {
	BiMessageSquare,
	BiMessageSquareCheck,
	BiMessageSquareError,
} from 'react-icons/bi';
import Speaker from '../common/Speaker/Speaker';
import AddButton from '../common/AddButton/AddButton';
import ChangeStatus from '../common/Status/Status';

//단어장 이름, 단어 국적(populate), 단어, 뜻, 상태, 생성시간
const dummyList = [
	{
		shortId: 1,
		name: '영어 단어장',
		word: 'apple',
		meanings: ['애플', '사과', '사과나무', '뉴욕'],
		status: 0,
		createdAt: '2023-05-10',
	},
	{
		shortId: 2,
		name: '영어 단어장',
		word: '사과',
		meanings: ['apple', 'apologize'],
		status: 1,
		createdAt: '2023-05-11',
	},
	{
		shortId: 3,
		name: '영어 단어장',
		word: 'help',
		meanings: ['도움', '돕다', '도와주다', '기여하다'],
		status: 2,
		createdAt: '2023-05-12',
	},
	{
		shortId: 4,
		name: '영어 단어장',
		word: 'help',
		meanings: ['도움', '돕다', '도와주다', '기여하다'],
		status: 2,
		createdAt: '2023-05-12',
	},
	{
		shortId: 5,
		name: '영어 단어장',
		word: 'help',
		meanings: ['도움', '돕다', '도와주다', '기여하다'],
		status: 2,
		createdAt: '2023-05-12',
	},
	{
		shortId: 6,
		name: '영어 단어장',
		word: 'help',
		meanings: ['도움', '돕다', '도와주다', '기여하다'],
		status: 2,
		createdAt: '2023-05-12',
	},
	{
		shortId: 7,
		name: '영어 단어장',
		word: '체크 박스',
		meanings: ['checkbox'],
		status: 2,
		createdAt: '2023-05-12',
	},
	{
		shortId: 8,
		name: '영어 단어장',
		word: 'help',
		meanings: ['도움', '돕다', '도와주다', '기여하다'],
		status: 2,
		createdAt: '2023-05-12',
	},
];

const WordListList = () => {
	const [status, setStatus] = useState(0);
	const [checkedList, setCheckedList] = useState<Array<number>>([]);

	const handleStatus = () => {
		if (status === 0) {
			setStatus(1);
			return <BiMessageSquareCheck />;
		} else if (status === 1) {
			setStatus(2);
			return <BiMessageSquareError />;
		} else if (status === 2) {
			setStatus(0);
			return <BiMessageSquare />;
		}
	};

	const checkLang = (word: string) => {
		if (/[a-zA-Z]/g.test(word)) {
			return true;
		} else if (/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g.test(word)) {
			return false;
		}
	};

	const onCheckedItem = useCallback(
		(checked: boolean, item: number) => {
			if (checked) {
				setCheckedList(prev => [...prev, item]);
				console.log(checkedList);
			} else if (!checked) {
				setCheckedList(checkedList.filter(el => el !== item));
			}
		},
		[checkedList],
	);

	const onCheckedAllItems = useCallback(
		(checked: boolean) => {
			if (checked) {
				const checekdListArray: number[] = [];
				dummyList.forEach(list => checekdListArray.push(list.shortId));
				setCheckedList(checekdListArray);
			} else {
				setCheckedList([]);
			}
		},
		[dummyList],
	);

	return (
		<>
			<div>
				<div className={styles.listHeader}>
					<div className={styles.count}>전체 {dummyList.length}</div>
					<div className={styles.selectAll}>
						<input
							type='checkbox'
							onChange={e => onCheckedAllItems(e.target.checked)}
							checked={
								checkedList.length === 0
									? false
									: checkedList.length === dummyList.length
									? true
									: false
							}
						/>
					</div>
					<hr />
				</div>
				{dummyList.map(item => (
					<div key={item.shortId} className={styles.box}>
						<div className={styles.menus}>
							<div className={styles.list}>
								<input
									type='checkbox'
									value={item.shortId}
									onChange={e => {
										onCheckedItem(e.target.checked, Number(e.target.value));
									}}
									checked={checkedList.includes(item.shortId) ? true : false}
								/>
								&nbsp;
								{item.shortId}. {item.createdAt}
							</div>
							<div className={styles.status} onClick={handleStatus}>
								<ChangeStatus initialStatus={item.status} />
							</div>
							<Speaker
								text={item.word}
								lang={checkLang(item.word) ? 'english' : 'korean'}
							/>
						</div>
						<div className={styles.word}>{item.word}</div>
						<div className={styles.meanings}>{item.meanings.join(', ')}</div>
					</div>
				))}
				<AddButton url={'/word/add'} />
			</div>
		</>
	);
};

export default WordListList;
