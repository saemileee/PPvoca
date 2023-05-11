import React, { useState, useEffect } from 'react';
import styles from '../components/User/Register.module.scss';
import Logo from '../components/common/Logo/Logo';
import UserInput from '../components/User/UserInput/UserInput';
import UserButton from '../components/User/UserButton/UserButton';

function UserEdit() {
	const logoStyle = {
		transform: 'translateX(-10px)',
		marginBottom: '5vh',
	};

	const initValues = {
		nickname: '',
		password: '',
		passwordConfirm: '',
	};

	const [values, setValues] = useState(initValues);

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
							disabled={true}
							defaultValue='elice@email.com'
						/>
					</li>
					<li>
						<UserInput
							type='text'
							name='nickname'
							label='닉네임'
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
						<UserInput
							type='password'
							name='passwordConfirm'
							label='비밀번호 확인'
							setValues={setValues}
						/>
					</li>
					<li>
						<UserButton type='submit' onClick={() => console.log('edit')}>
							수정하기
						</UserButton>
					</li>
				</ul>
			</form>
		</main>
	);
}

export default UserEdit;
