import React, { useState, useEffect } from 'react';
import styles from '../components/WordList/WordListStyle.module.scss';
import WordListTitle from '../components/WordList/WordListTitle';
import WordListSearch from '../components/WordList/WordListSearch';
import WordListList from '../components/WordList/WordListList';
import WordListFilterModal from '../components/WordList/WordListFilterModal';
import { useRecoilValue } from 'recoil';
import { userTokenState } from '../recoil/userState';

function WordList() {
	const [filterModal, setFilterModal] = useState<boolean>(false);


	return (
		<main>
			<div className={styles.main}>
				<div className={styles.fixed}>
					<div>
						<WordListTitle setModalOpen={setFilterModal} />
					</div>
					<div>
						<WordListSearch />
					</div>
				</div>
				<div>
					<WordListList />
				</div>
			</div>
			{filterModal && <WordListFilterModal setModalOpen={setFilterModal} />}
		</main>
	);
}

export default WordList;
