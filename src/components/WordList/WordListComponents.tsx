import React from 'react';
import WordListTitle from './WordListTitle';
import WordListSearch from './WordListSearch';
import WordListList from './WordListList';

//단어장 제목, 단어 목록
const WordListComponents = () => {
	return (
		<div>
			<div><WordListTitle /></div>
			<div><WordListSearch /></div>
			<div><WordListList /></div>
		</div>
	);
}

export default WordListComponents;
