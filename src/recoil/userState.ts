import { atom, selector } from 'recoil';

export const userTokenState = atom({
	key: 'userToken',
	default: null,
});
