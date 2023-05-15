//React
import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

//SCSS
import styles from './WordListStyle.module.scss';

//아이콘
import { MdArrowBackIosNew } from 'react-icons/md';
import { CiMenuKebab } from 'react-icons/ci';
import { GiSettingsKnobs } from 'react-icons/gi';
import { IoSearchOutline } from 'react-icons/io5';
import { HiOutlinePencil } from 'react-icons/hi';

//모듈
import WordListFilterModal from './WordListFilterModal';
import WordListOptionsModal from './WordListOptionModal';
import AddButton from '../common/AddButton/AddButton';

//Recoil
import { useRecoilState, useRecoilValue } from 'recoil';
import { userTokenState } from '../../recoil/userState';
import checkedWordList from '../../recoil/checkedWordList';

//API
import {
	getWords,
	getWordsByBook,
	getBookName,
	deleteWords,
} from '../../apis/word';
import ChangeStatus from '../common/Status/Status';
import Speaker from '../common/Speaker/Speaker';

type RouteParams = {
	short_id: string;
};

type WordListItem = {
	short_id: string;
	word: string;
	meanings: Array<string>;
	status: number;
	createdAt: string;
};

function WordListLayout() {
	const [wordList, setWordList] = useState([]);
	const [checkedList, setCheckedList] = useRecoilState(checkedWordList);
	const [filterModal, setFilterModal] = useState<boolean>(false);
	const [optionModal, setOptionModal] = useState<boolean>(false);
	const [booktitle, setBooktitle] = useState('단어장');
	const [findWord, setFindWord] = useState({
		findword: '',
	});

	const userToken = useRecoilValue(userTokenState);
	//const { short_id } = useParams<RouteParams>();
	const short_id = 'BI7_ntbf4E_7mNwYa1Ano';
	const nav = useNavigate();

	const onChangeFindWord = (e: React.ChangeEvent<HTMLInputElement>) => {
		e.preventDefault();
		setFindWord({
			...findWord,
			[e.target.name]: e.target.value,
		});
	};

	//단어장 이름
	useEffect(() => {
		if (short_id) {
			const fetchTitle = async () => {
				try {
					const response = await getBookName(userToken, short_id);
					const name = response.data[0].name;
					setBooktitle(name);
				} catch (err) {
					console.log(err);
				}
			};
			fetchTitle();
		}
	}, [short_id, userToken]);

	//단어장 리스트
	useEffect(() => {
		if (short_id) {
			const fetchWords = async () => {
				try {
					const response = await getWords(userToken);
					setWordList(response.data);
					console.log(response.data);
				} catch (err) {
					console.log(err);
				}
			};
			fetchWords();
			setCheckedList([]);
		}
	}, []);

	//단일 단어 체크
	const onCheckedItem = useCallback(
		(checked: boolean, item: string) => {
			setCheckedList(prev => {
				const newCheckedList = checked
					? [...prev, item]
					: prev.filter(el => el !== item);
				console.log(newCheckedList);
				return newCheckedList;
			});
		},
		[checkedList],
	);

	//모든 단어 체크
	const onCheckedAllItems = useCallback(
		(checked: boolean) => {
			if (checked) {
				const checekdListArray: string[] = [];
				wordList.forEach((list: WordListItem) =>
					checekdListArray.push(list.short_id),
				);
				setCheckedList(checekdListArray);
			} else {
				setCheckedList([]);
			}
		},
		[wordList],
	);

	//단어 언어 확인
	const checkLang = (word: string) => {
		if (/[a-zA-Z]/g.test(word)) {
			return true;
		} else if (/[ㄱ-ㅎ|ㅏ-ㅣ|가-힣]/g.test(word)) {
			return false;
		}
	};

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

	const handleBack = () => {
		nav('/book/list');
	};

	const handleFilter = () => {
		setFilterModal(true);
	};

	const handleOption = () => {
		setOptionModal(true);
	};

	const handleFind = (word: string) => {
		if (word) {
			alert(`${word} 검색중...`);
		} else {
			alert('검색어를 입력해주세요!');
		}
	};

	const handleEdit = (short_id: string) => {
		nav(`/word/edit/${short_id}`);
	};

	return (
		<div className={styles.container}>
			<div className={styles.fixed}>
				<div className={styles.title}>
					<div className={styles.back} onClick={handleBack}>
						<MdArrowBackIosNew />
					</div>
					<div className={styles.bookName}>{booktitle}</div>
					<div className={styles.filter} onClick={handleFilter}>
						<GiSettingsKnobs />
					</div>
					<div className={styles.option} onClick={handleOption}>
						<CiMenuKebab />
					</div>
					{optionModal && (
						<WordListOptionsModal setModalOpen={setOptionModal} />
					)}
				</div>
				<div className={styles.search}>
					<input
						className={styles.input}
						name='findword'
						placeholder='검색어를 입력해 주세요!'
						onChange={onChangeFindWord}
					/>
					<div
						className={styles.find}
						onClick={() => handleFind(findWord.findword)}
					>
						<IoSearchOutline />
					</div>
				</div>
			</div>
			<div className={styles.list}>
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
				</div>
				{wordList.map((item: WordListItem) => (
					<div key={item.short_id} className={styles.box}>
						<div className={styles.menus}>
							<div className={styles.listInfo}>
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
							<div
								className={styles.edit}
								onClick={() => handleEdit(item.short_id)}
							>
								<HiOutlinePencil />
							</div>
							<div className={styles.status}>
								<ChangeStatus initialStatus={item.status} />
							</div>
							<div className={styles.speaker}>
								<Speaker
									text={item.word}
									lang={checkLang(item.word) ? 'english' : 'korean'}
								/>
							</div>
						</div>
						<div className={styles.word}>{item.word}</div>
						<div className={styles.meanings}>
							{item.meanings.map((meaning, index) => {
								return (
									<div className={styles.meaningBlock} key={index}>
										{meaning}
									</div>
								);
							})}
						</div>
					</div>
				))}
				<AddButton url='/word/add' />
			</div>
			{filterModal && <WordListFilterModal setModalOpen={setFilterModal} />}
		</div>
	);
}

export default WordListLayout;
