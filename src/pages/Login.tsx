import React, { useEffect, useState } from 'react';
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

	useEffect(() => {
		console.log(values);
	}, [values]);

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
						/>
					</li>
					<li>
						<UserInput
							type='password'
							name='password'
							label='비밀번호'
							setValues={setValues}
						/>
					</li>
					<li>
						<UserButton type='submit' onClick={() => console.log('login')}>
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
