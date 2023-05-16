import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

type WordFormType = {
	word: string;
	meanings: string[];
	bookId?: string;
};

// 단어 추가
export const addedWord = async (token: string, formData: WordFormType) => {
	const response = await axios.post(`${baseUrl}/words`, formData, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return response;
};

// 특정 단어 가져오기
export const selectedWord = async (id: string, token: string) => {
	const response = await axios.get(`${baseUrl}/words/${id}`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return response;
};

// 특정 단어 정보 수정
export const updatedWord = async (
	id: string,
	token: string,
	formData: WordFormType,
) => {
	const response = await axios.put(`${baseUrl}/words/${id}`, formData, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return response;
};

// 단어 크롤링
export const crawlingWord = async (lang: string, searchWord: string) => {
	const response = await axios.get(`${baseUrl}/meanings`, {
		params: {
			lang: lang,
			word: searchWord,
		},
	});
	return response;
};
