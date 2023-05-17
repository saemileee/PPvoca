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

//회원 정보 조회 : Start
export const infoUser = async (token: string) => {
	const response = await axios.get(`${baseUrl}/users/me`, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return response;
};
//회원 정보 조회 : End

//회원 정보 수정 : Start
type UserEditFormType = {
	password?: string;
	nickname: string;
};
export const editUser = async (formData: UserEditFormType, token: string) => {
	const response = await axios.put(`${baseUrl}/users/me`, formData, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return response;
};
//회원 정보 수정 : End

//회원 탈퇴 : Start
type UserDeleteFormType = {
	typedPassword: string;
};
export const deleteUser = async (
	formData: UserDeleteFormType,
	token: string,
) => {
	const response = await axios.post(`${baseUrl}/users/me`, formData, {
		headers: {
			Authorization: `Bearer ${token}`,
		},
	});
	return response;
};
//회원 탈퇴 : End
