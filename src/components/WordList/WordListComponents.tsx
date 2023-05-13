import React from 'react';
import styles from './WordListStyle.module.scss';
import WordListTitle from './WordListTitle';
import WordListSearch from './WordListSearch';
import WordListList from './WordListList';

//단어장 ID면 word/{bookID}, 전체 검색을 위한 all이면 word/all
type props = {
	title: string;
};

const WordListComponents = () => {
	return (
		<div className={styles.main}>
			<div className={styles.fixed}>
				<div>
					<WordListTitle />
				</div>
				<div>
					<WordListSearch />
				</div>
			</div>
			<div>
				<WordListList />
			</div>
		</div>
	);
};

export default WordListComponents;
