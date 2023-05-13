import React, { useEffect, useState } from 'react';

type ValuesProps = {
	email?: string;
	nickname?: string;
	password?: string;
	passwordConfirm?: string;
};

function useUserValidator(values: ValuesProps) {
	const [errors, setErrors] = useState<{ [x: string]: string }>(values);
	const [validationPass, setValidationPass] = useState<boolean>(false);
	const [submitAttempt, setSubmitAttempt] = useState<boolean>(false);

	const createErrMsg = (type: string, msg: string): void => {
		setErrors(prev => ({ ...prev, [type]: msg }));
	};

	const checkEmptyValues = (userValues: ValuesProps) => {
		const msg = '빈칸을 입력해 주세요.';

		for (const [key, value] of Object.entries(userValues)) {
			if (!value) {
				createErrMsg(key, msg);
			} else createErrMsg(key, '');
		}
	};

	const validateEmail = (email: string): void => {
		const type = 'email';
		const pattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

		if (!pattern.test(email)) {
			const msg = '유효한 이메일 주소가 아닙니다.';
			return createErrMsg(type, msg);
		}

		createErrMsg(type, '');
	};

	const validateNickname = (nickname: string): void => {
		const type = 'nickname';

		if (nickname.length > 10) {
			const msg = '닉네임은 10자 이하여야 합니다.';
			return createErrMsg(type, msg);
		}

		if (nickname.includes(' ')) {
			const msg = '닉네임에는 공백을 사용할 수 없습니다.';
			return createErrMsg(type, msg);
		}

		if (!/^[a-zA-Z0-9ㄱ-ㅎㅏ-ㅣ가-힣]+$/.test(nickname)) {
			const msg = '닉네임은 알파벳 대소문자, 숫자, 한글만 사용할 수 있습니다.';
			return createErrMsg(type, msg);
		}

		createErrMsg(type, '');
	};

	const validatePassword = (password: string): void => {
		const type = 'password';
		const hasSpecialChar = /[-_!@#$%&*,.]/;
		const hasUpperCase = /[A-Z]/;
		const hasLowerCase = /[a-z]/;
		const hasNumber = /[0-9]/;
		const minLength = 8;
		const isAllowed = /^[a-zA-Z0-9-_!@#$%&*,.]+$/g;

		if (password.length < minLength) {
			const msg = '비밀번호는 8자 이상이어야 합니다.';
			return createErrMsg(type, msg);
		}

		if (
			!hasSpecialChar.test(password) ||
			!hasUpperCase.test(password) ||
			!hasLowerCase.test(password) ||
			!hasNumber.test(password)
		) {
			const msg =
				'대문자, 소문자, 특수 문자, 숫자가 1개 이상 포함되어야 합니다.';
			return createErrMsg(type, msg);
		}

		if (!isAllowed.test(password)) {
			const msg = '허용되지 않는 문자입니다.';
			return createErrMsg(type, msg);
		}

		createErrMsg(type, '');
	};

	const validatePasswordConfirm = (
		password: string,
		passwordConfirm: string,
	): void | boolean => {
		const type = 'passwordConfirm';
		if (password !== passwordConfirm) {
			const msg = '비밀번호가 일치하지 않습니다';
			return createErrMsg(type, msg);
		}

		createErrMsg(type, '');
	};

	const userValidator = (userValues: ValuesProps, isLogin = false) => {
		const { email, nickname, password, passwordConfirm } = userValues;

		if (userValues) checkEmptyValues(userValues);
		if (email) validateEmail(email);
		if (nickname) validateNickname(nickname);
		if (password && !isLogin) validatePassword(password);
		if (password && passwordConfirm)
			validatePasswordConfirm(password, passwordConfirm);

		setSubmitAttempt(true);
	};

	useEffect(() => {
		if (submitAttempt) {
			if (
				!errors.email &&
				!errors.nickname &&
				!errors.password &&
				!errors.passwordConfirm
			)
				setValidationPass(true);
			else setSubmitAttempt(false);
		}
	}, [submitAttempt, errors]);

	return { errors, setErrors, userValidator, setSubmitAttempt, validationPass };
}

export default useUserValidator;
