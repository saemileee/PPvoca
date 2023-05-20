import React from 'react';
import styles from '../components/UserInfo/UserInfo.module.scss';
import Navigation from '../components/common/Navigation/Navigation';
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
			<Navigation />
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
