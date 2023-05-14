import React, { useState, useCallback, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import styles from './WordListStyle.module.scss';
import Speaker from '../common/Speaker/Speaker';
import AddButton from '../common/AddButton/AddButton';
import ChangeStatus from '../common/Status/Status';
import { HiOutlinePencil } from 'react-icons/hi';
import { getWords } from '../../apis/word';
import { useRecoilValue } from 'recoil';
import { userTokenState } from '../../recoil/userState';

type WordListItem = {
	short_id: string;
	word: string;
	meanings: Array<string>;
	status: number;
	createdAt: string;
}

const WordListList = () => {
	const [checkedList, setCheckedList] = useState<Array<string>>([]);
	const [wordList, setWordList] = useState<any>([]);
	const userToken = useRecoilValue(userTokenState);
	const nav = useNavigate();

	useEffect(() => {
		const fetchWords = async () => {
			try {
				const response = await getWords(userToken);
				setWordList(response);
				console.log(response);
			} catch (e) {
				console.log(e);
			}
		};
		fetchWords();
	}, []);

	//단어 언어 확인
	const checkLang = (word: string) => {
		if (/[a-zA-Z]/g.test(word)) {
			return true;
		} else if (/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g.test(word)) {
			return false;
		}
	};

	//단일 단어 체크
	const onCheckedItem = useCallback(
		(checked: boolean, item: string) => {
			setCheckedList(prev => {
				const newCheckedList = checked ? [...prev, item] : prev.filter((el) => el !== item);
				//console.log(newCheckedList);
				return newCheckedList;
			})
		},
		[checkedList],
	);

	//모든 단어 체크
	const onCheckedAllItems = useCallback(
		(checked: boolean) => {
			if (checked) {
				const checekdListArray: string[] = [];
				wordList.forEach((list: WordListItem) =>
					checekdListArray.push(list.short_id)
				);
				setCheckedList(checekdListArray);
			} else {
				setCheckedList([]);
			}
		},
		[wordList],
	);

	//모든 단어가 체크됐는지 확인
	useEffect(() => {
		console.log(checkedList);
	}, [checkedList]);

	//날짜 형식 포맷팅 함수
	function formatDate(str: string) {
		const date = new Date(str);
		const year = date.getFullYear();
		const month = String(date.getMonth() + 1).padStart(2, '0');
		const day = String(date.getDate()).padStart(2, '0');
		const hours = String(date.getHours()).padStart(2, '0');
		const minutes = String(date.getMinutes()).padStart(2, '0');
		return `${year}-${month}-${day} ${hours}:${minutes}`;
	}

	const handleEdit = () => {
		nav('word/edit/{shortId}');
	};

	return (
		<>
			<div>
				<div className={styles.listHeader}>
					<div className={styles.count}>전체 {wordList.length}</div>
					<div className={styles.selectAll}>
						<input
							type='checkbox'
							onChange={e => onCheckedAllItems(e.target.checked)}
							checked={
								checkedList.length === 0
									? false
									: checkedList.length === wordList.length
										? true
										: false
							}
						/>
					</div>
					<hr />
				</div>
				{wordList.map((item: WordListItem) => (
					<div key={item.short_id} className={styles.box}>
						<div className={styles.menus}>
							<div className={styles.list}>
								<input
									type='checkbox'
									value={item.short_id}
									onChange={e => {
										onCheckedItem(e.target.checked, e.target.value);
									}}
									checked={checkedList.includes(item.short_id) ? true : false}
								/>
								&nbsp;
								{formatDate(item.createdAt)}
							</div>
							<div className={styles.edit} onClick={handleEdit}>
								<HiOutlinePencil />
							</div>
							<div className={styles.status}>
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
