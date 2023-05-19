import React from 'react';
import styles from '../components/UserInfo/UserInfo.module.scss';
import Header from '../components/common/Header/Header';
import Logo from '../components/common/Logo/Logo';
import UserInfoDetail from '../components/UserInfo/UserInfoDetail';
import UserInfoButtons from '../components/UserInfo/UserInfoButtons';

function UserInfo() {
	const logoStyle = {
		transform: 'translateX(-10px)',
		marginBottom: '5vh',
	};

	return (
		<>
			<Header />
			<main className={styles.container}>
				<Logo style={logoStyle} />
				<ul className={styles.info}>
					<UserInfoDetail />
					<UserInfoButtons />
				</ul>
			</main>
		</>
	);
}

export default UserInfo;
