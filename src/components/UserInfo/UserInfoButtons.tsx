import React from 'react';
import { useSetRecoilState } from 'recoil';
import { userTokenState } from '../../recoil/userState';
import Cookies from 'js-cookie';
import UserButton from '../common/UserButton/UserButton';

function UserInfoButtons() {
	const setUserToken = useSetRecoilState(userTokenState);
	const handleLogout = () => {
		Cookies.remove('token');
		setUserToken('');
		alert('로그아웃 되었습니다.');
		window.location.reload();
	};

	return (
		<>
			<li>
				<UserButton type='link' path='/user/edit'>
					회원 정보 수정
				</UserButton>
			</li>
			<li>
				<UserButton onClick={handleLogout}>로그아웃</UserButton>
			</li>
		</>
	);
}

export default UserInfoButtons;
