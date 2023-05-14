import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { AxiosError } from 'axios';
import { useRecoilValue } from 'recoil';
import { infoUser } from '../apis/user';
import { userTokenState } from '../recoil/userState';
import styles from '../components/User/UserInfo.module.scss';
import Logo from '../components/common/Logo/Logo';
import UserButton from '../components/common/UserButton/UserButton';
import { SiRabbitmq } from 'react-icons/si';

function UserInfo() {
	const navigate = useNavigate();
	const userToken = useRecoilValue(userTokenState);
	const [userInfo, setUserInfo] = useState({
		email: '',
		nickname: '',
	});

	const logoStyle = {
		transform: 'translateX(-10px)',
		marginBottom: '5vh',
	};

	const getUserInfo = async () => {
		try {
			const response = await infoUser(userToken);
			const { userEmail, nickname } = response.data;
			if (response.status === 200) {
				setUserInfo({
					email: userEmail,
					nickname,
				});
			}
		} catch (err: unknown) {
			if (err instanceof AxiosError) {
				if (err.response?.status === 401) {
					return navigate('/login');
				}
			}

			//console.log(err);
			alert('회원 정보를 불러오는데 실패하였습니다.');
		}
	};

	useEffect(() => {
		getUserInfo();
	}, []);

	return (
		<main className={styles.container}>
			<Logo style={logoStyle} />
			<ul className={styles.info}>
				<li>
					<span>
						<SiRabbitmq />
						이메일
					</span>
					{userInfo.email && userInfo.email}
				</li>
				<li>
					<span>
						<SiRabbitmq />
						닉네임
					</span>
					{userInfo.nickname && userInfo.nickname}
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
