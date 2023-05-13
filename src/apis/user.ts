import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

export type UserFormType = {
	userEmail: string;
	password: string;
	nickname: string;
};

export const registerUser = async (formData: UserFormType) => {
	const response = await axios.post(`${baseUrl}/users`, formData);
	return response;
};
