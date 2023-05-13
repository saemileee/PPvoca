import axios from 'axios';

const baseUrl = process.env.REACT_APP_API_BASE_URL;

//회원가입 : Start
export type RegisterFormType = {
	userEmail: string;
	password: string;
	nickname: string;
};
export const registerUser = async (formData: RegisterFormType) => {
	const response = await axios.post(`${baseUrl}/users`, formData);
	return response;
};
//회원가입 : End

//로그인 : Start
export type LoginFormType = {
	userEmail: string;
	password: string;
};
export const loginUser = async (formData: LoginFormType) => {
	const response = await axios.post(`${baseUrl}/auth/login`, formData);
	return response;
};
//로그인 : End
