import { atom, selector } from 'recoil';

//ExampleAtom.ts는 예시 atom 파일입니다. 추후 삭제될 예정입니다.

//참고용입니다. (Atom에 들어가는 부분이 아닙니다.)
const examples = [
	{
		id: 1,
		name: 'Product A',
		quantity: 3,
		price: 10,
	},
	{
		id: 2,
		name: 'Product B',
		quantity: 6,
		price: 20,
	},
	{
		id: 3,
		name: 'Product C',
		quantity: 2,
		price: 30,
	},
];

//ts 관련
type ExampleItemType = {
	id: number;
	name: string;
	price: number;
	quantity: number;
};

//Atom: 전역 state
export const exampleState = atom({
	key: 'exampleAtom', //전역적으로 유일한 값 (중복 X)
	default: [], //기본으로 넣어줄 값('', 0, [], {} 등등). useState([])와 비슷.
});

//Selector 함수
//1. Recoil의 atom 값을 읽어와 이 값을 기반으로 새로운 값을 계산
//2. 새롭게 계산된 값을 Recoil의 state로 등록하여 관리
export const exampleTotalSelector = selector({
	key: 'exampleTotalSelector', //전역적으로 유일한 값 (중복 X)
	get: ({ get }) => {
		//atom의 값을 가져오는 것
		//exampleState이라는 상태값의 개수를 계산해서 반환
		const exampleItems = get(exampleState);
		return exampleItems.reduce(
			(acc: number, curr: ExampleItemType) => acc + curr.price * curr.quantity,
			0,
		);
		//굳이 변형하지 않고 그냥 들고와도 됨 (return get(exampleState))
	},
	/*
	set: ({ set }, newExampleItems) => {
		//atom의 값을 업데이트하는 것
		set(exampleState, newExampleItems);
	}
  */
});
