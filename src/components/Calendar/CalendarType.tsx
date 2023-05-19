import moment from 'moment';

/**Word 타입선언 */
export interface Word {
	bookId: string;
	createdAt: string;
	meanings: string[];
	ownerEmail: string;
	short_id: string;
	status: number;
	updatedAt: string;
	word: string;
	__v: number;
	_id: string;
}

/**단어 뜻 문자열로 만들기(프론트 팀과 논의필요) */
export function joinMeanings(meanings: string[]): string {
	return meanings.join(', ');
}
/**createdAt 예쁜 문자열로 바꾸기 */
export function prettyDate(uglyDate: string): string {
	const originalDate = uglyDate;
	const formattedDate = moment(originalDate).format('YYYY-MM-DD');
	return formattedDate;
}
