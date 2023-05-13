import React, { useState, useEffect } from 'react';
import useUserValidator from '../hooks/useUserValidator';
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
	const { errors, userValidator, validationPass } =
		useUserValidator(initValues);

	useEffect(() => {
		if (validationPass) alert('유효성 검사 통과!!!');
	}, [validationPass]);

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
							defaultValue='엘리스'
							setValues={setValues}
							condition='10자 이하 (특수 문자, 공백 제외)'
							error={errors.nickname}
						/>
					</li>
					<li>
						<UserInput
							type='password'
							name='password'
							label='비밀번호'
							setValues={setValues}
							condition='8자 이상 (대소문자, 특수 문자, 숫자 포함)'
							error={errors.password}
						/>
					</li>
					<li>
						<UserInput
							type='password'
							name='passwordConfirm'
							label='비밀번호 확인'
							setValues={setValues}
							error={errors.passwordConfirm}
						/>
					</li>
					<li>
						<UserButton
							type='submit'
							onClick={e => {
								e.preventDefault();
								userValidator(values);
							}}>
							수정하기
						</UserButton>
					</li>
				</ul>
			</form>
		</main>
	);
}

export default UserEdit;
