import { atom, selector } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
	key: 'persistUserToken',
	storage: sessionStorage,
});

export const userTokenState = atom({
	key: 'userToken',
	default: '',
	effects_UNSTABLE: [persistAtom],
});
