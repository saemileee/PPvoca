import React from 'react';
import styles from '../components/Register/Register.module.scss';
import Logo from '../components/common/Logo/Logo';
import RegisterForm from '../components/Register/RegisterForm';

function Register() {
	const logoStyle = {
		transform: 'translateX(-10px)',
		marginBottom: '5vh',
	};

	return (
		<main className={styles.container}>
			<Logo style={logoStyle} />
			<RegisterForm />
		</main>
	);
}

export default Register;
