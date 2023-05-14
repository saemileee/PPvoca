import React from 'react';
import styles from '../components/Login/Login.module.scss';
import Logo from '../components/common/Logo/Logo';
import LoginForm from '../components/Login/LoginForm';

function Login() {
	const logoStyle = {
		transform: 'translateX(-10px)',
		marginBottom: '5vh',
	};

	return (
		<main className={styles.container}>
			<Logo style={logoStyle} />
			<LoginForm />
		</main>
	);
}

export default Login;
