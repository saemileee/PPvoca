import React from 'react';
import styles from '../components/Register/Register.module.scss';
import Logo from '../components/common/Logo/Logo';
import UserEditForm from '../components/UserEdit/UserEditForm';

function UserEdit() {
	const logoStyle = {
		transform: 'translateX(-10px)',
		marginBottom: '5vh',
	};

	return (
		<main className={styles.container}>
			<Logo style={logoStyle} />
			<UserEditForm />
		</main>
	);
}

export default UserEdit;
