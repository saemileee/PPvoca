import React, { useEffect, useState } from 'react';
import useUserValidator from '../hooks/useUserValidator';
import styles from '../components/User/Login.module.scss';
import Logo from '../components/common/Logo/Logo';
import UserInput from '../components/User/UserInput/UserInput';
import UserButton from '../components/User/UserButton/UserButton';

function Login() {
	const logoStyle = {
		transform: 'translateX(-10px)',
		marginBottom: '5vh',
	};

	const initValues = {
		email: '',
		password: '',
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
							type='password'
							name='password'
							label='비밀번호'
							setValues={setValues}
							error={errors.password}
						/>
					</li>
					<li>
						<UserButton
							type='submit'
							onClick={e => {
								e.preventDefault();
								userValidator(values, true);
							}}>
							로그인
						</UserButton>
					</li>
					<li>
						<UserButton type='link' path='/register'>
							회원가입
						</UserButton>
					</li>
				</ul>
			</form>
		</main>
	);
}

export default Login;
