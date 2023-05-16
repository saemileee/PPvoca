import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

//단어 가져오기
export const getWords = async (token: string) => {
	const response = await axios.get(`${baseUrl}/words`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return response;
};
//

//특정 단어장의 단어 가져오기
export const getWordsByBook = async (token: string, id: string) => {
	const response = await axios.get(`${baseUrl}/words`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
		params: {
			bookId: id,
		},
	});
	return response;
};
//

//단어장 가져오기
export const getBookName = async (token: string, id: string) => {
	const response = await axios.get(`${baseUrl}/books/${id}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return response;
};
//

//단어 검색
export const findWordById = async (token: string, word: string) => {
	const response = await axios.get(`${baseUrl}/search/words`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
		params: {
			word: word,
		},
	});
	console.log(response.data);
	return response;
};
//

//선택 단어 삭제
export const deleteWords = async (token: string, id: string) => {
	const response = await axios.delete(`${baseUrl}/words/${id}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return response;
};
//

//patch
//모든 단어 미분류

//

//모든 단어 외움

//

//모든 단어 헷갈림

//

//get
//단어 필터링
export const filterByStatus = async (token: string, status: number) => {
	const response = await axios.get(`${baseUrl}/words/status/${status}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});

	return response;
};
//

//외운 단어 필터링

//

//헷갈린 단어 필터링

//
