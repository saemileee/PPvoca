import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { AxiosError } from 'axios';
import useUserValidator from '../hooks/useUserValidator';
import { registerUser } from '../apis/user';
import styles from '../components/User/Register.module.scss';
import Logo from '../components/common/Logo/Logo';
import UserInput from '../components/User/UserInput/UserInput';
import UserButton from '../components/User/UserButton/UserButton';

function Register() {
	const navigate = useNavigate();
	const logoStyle = {
		transform: 'translateX(-10px)',
		marginBottom: '5vh',
	};

	const initValues = {
		email: '',
		nickname: '',
		password: '',
		passwordConfirm: '',
	};

	const [values, setValues] = useState(initValues);

	const {
		errors,
		setErrors,
		userValidator,
		validationPass,
		setValidationPass,
	} = useUserValidator(initValues);

	const handleSubmit = async () => {
		try {
			const data = {
				userEmail: values.email,
				password: values.password,
				nickname: values.nickname,
			};
			const response = await registerUser(data);
			if (response.status === 200) {
				alert('회원가입에 성공하였습니다. 로그인해주세요.');
				navigate('/login');
			}
		} catch (err: unknown) {
			if (err instanceof AxiosError) {
				if (err.response?.status === 409) {
					const errMsg = err.response.data.reason;
					return setErrors(prev => ({ ...prev, email: errMsg }));
				}
			}

			//console.log(err);
			alert('회원가입에 실패하였습니다.');
		}
	};

	useEffect(() => {
		if (validationPass) {
			handleSubmit();
			//유효성 검사 성공 여부 초기화
			setValidationPass(false);
		}
	}, [validationPass]);

	return (
		<main className={styles.container}>
			<Logo style={logoStyle} />
			<form className={styles.form}>
				<ul>
					<li>
						<UserInput
							type='text'
							name='email'
							label='이메일'
							setValues={setValues}
							error={errors.email}
						/>
					</li>
					<li>
						<UserInput
							type='text'
							name='nickname'
							label='닉네임'
							setValues={setValues}
							condition='10자 이하 (특수 문자, 공백 제외)'
							error={errors.nickname}
						/>
					</li>
					<li>
						<UserInput
							type='password'
							name='password'
							label='비밀번호'
							condition='8자 이상 (대소문자, 특수 문자, 숫자 포함)'
							setValues={setValues}
							error={errors.password}
						/>
					</li>
					<li>
						<UserInput
							type='password'
							name='passwordConfirm'
							label='비밀번호 확인'
							setValues={setValues}
							error={errors.passwordConfirm}
						/>
					</li>
					<li>
						<UserButton
							type='submit'
							onClick={e => {
								e.preventDefault();
								userValidator(values);
							}}
						>
							가입하기
						</UserButton>
					</li>
				</ul>
			</form>
		</main>
	);
}

export default Register;
