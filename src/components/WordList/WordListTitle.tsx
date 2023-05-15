import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styles from './WordListStyle.module.scss';
import { MdArrowBackIosNew } from 'react-icons/md';
import { CiMenuKebab } from 'react-icons/ci';
import { GiSettingsKnobs } from 'react-icons/gi';
import WordListOptionModal from './WordListOptionModal';
import { useRecoilValue } from 'recoil';
import { userTokenState } from '../../recoil/userState';
import { getBookName } from '../../apis/word';

type Props = {
	setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
};

type RouteParams = {
	short_id: string;
};

const WordListTitle = ({ setModalOpen }: Props) => {
	const [optionsModalOpen, setOptionsModalOpen] = useState(false);
	const [bookTitle, setBookTitle] = useState('단어장');
	const userToken = useRecoilValue(userTokenState);

	const nav = useNavigate();
	// const { short_id } = useParams<RouteParams>();
	const short_id = 'aVe2gvRss2Zo9Mf2GeVza';
	useEffect(() => {
		if (short_id) {
			const fetchTitle = async () => {
				try {
					const response = await getBookName(userToken, short_id);
					const name = response.data[0].name;
					setBookTitle(name);
				} catch (e) {
					console.log(e);
				}
			};
			fetchTitle();
		}
	}, [short_id, userToken]);

	function handleBack() {
		nav('/book/list');
	}

	function handleFilter() {
		setModalOpen(true);
	}

	function handleOptions() {
		setOptionsModalOpen(true);
	}

	return (
		<>
			<div className={styles.head}>
				<div className={styles.back} onClick={handleBack}>
					<MdArrowBackIosNew />
				</div>
				<div className={styles.title}>{bookTitle}</div>
				<div className={styles.filter} onClick={handleFilter}>
					<GiSettingsKnobs />
				</div>
				<div className={styles.options} onClick={handleOptions}>
					<CiMenuKebab />
				</div>
				{optionsModalOpen && (
					<WordListOptionModal setModalOpen={setOptionsModalOpen} />
				)}
			</div>
		</>
	);
};

export default WordListTitle;
