import { atom } from 'recoil';

const checkedWordList = atom<string[]>({
	key: 'checkedWordList',
	default: [],
});

export default checkedWordList;
