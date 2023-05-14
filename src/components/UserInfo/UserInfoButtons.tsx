import React from 'react';
import UserButton from '../common/UserButton/UserButton';

function UserInfoButtons() {
	return (
		<>
			<li>
				<UserButton type='link' path='/user/edit'>
					회원 정보 수정
				</UserButton>
			</li>
			<li>
				<UserButton onClick={() => console.log('logout')}>로그아웃</UserButton>
			</li>
		</>
	);
}

export default UserInfoButtons;
