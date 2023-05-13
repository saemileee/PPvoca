import React from 'react';
import styles from '../components/User/UserInfo.module.scss';
import Logo from '../components/common/Logo/Logo';
import UserButton from '../components/User/UserButton/UserButton';
import { SiRabbitmq } from 'react-icons/si';

function UserInfo() {
	const logoStyle = {
		transform: 'translateX(-10px)',
		marginBottom: '5vh',
	};

	return (
		<main className={styles.container}>
			<Logo style={logoStyle} />
			<ul className={styles.info}>
				<li>
					<span>
						<SiRabbitmq />
						이메일
					</span>
					elice@email.com
				</li>
				<li>
					<span>
						<SiRabbitmq />
						닉네임
					</span>
					엘리스
				</li>
				<li>
					<UserButton type='link' path='/user/edit'>
						회원 정보 수정
					</UserButton>
				</li>
				<li>
					<UserButton onClick={() => console.log('logout')}>
						로그아웃
					</UserButton>
				</li>
			</ul>
		</main>
	);
}

export default UserInfo;
