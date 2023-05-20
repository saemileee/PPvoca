import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

// 모든 단어장 조회
export const calenderGetAll = async (token: string) => {
	const response = await axios.get(`${baseUrl}/words`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return response.data;
};
