import React, { useState, useEffect } from 'react';
import useUserValidator from '../hooks/useUserValidator';
import styles from '../components/User/Register.module.scss';
import Logo from '../components/common/Logo/Logo';
import UserInput from '../components/User/UserInput/UserInput';
import UserButton from '../components/User/UserButton/UserButton';

function Register() {
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
	const { errors, setErrors, userValidator, validationPass } =
		useUserValidator(initValues);

	useEffect(() => {
		if (validationPass) alert('유효성 검사 통과!!!');
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
							}}>
							가입하기
						</UserButton>
					</li>
				</ul>
			</form>
		</main>
	);
}

export default Register;
