import React, { useState, useEffect } from 'react';
import useUserValidator from '../hooks/useUserValidator';
import styles from '../components/User/Register.module.scss';
import Logo from '../components/common/Logo/Logo';
import UserInput from '../components/User/UserInput/UserInput';
import UserButton from '../components/User/UserButton/UserButton';

type ValuesProps = {
	nickname: string;
	password?: string;
	passwordConfirm?: string;
};

function UserEdit() {
	const logoStyle = {
		transform: 'translateX(-10px)',
		marginBottom: '5vh',
	};

	const initValues = {
		nickname: '',
	};

	const [values, setValues] = useState<ValuesProps>(initValues);
	const [passwordEdit, setPasswordEdit] = useState<boolean>(false);
	const { errors, setErrors, userValidator, validationPass } =
		useUserValidator(initValues);

	const switchEditMode = (isPasswordEdit: boolean): void => {
		if (isPasswordEdit) {
			//비밀번호 수정 가능 모드로 변환
			const passwordValues = {
				password: '',
				passwordConfirm: '',
			};
			setPasswordEdit(isPasswordEdit);
			setValues(prev => ({ ...prev, ...passwordValues }));
			setErrors(prev => ({ ...prev, ...passwordValues }));
		} else {
			//닉네임만 수정 가능 모드로 변환
			setPasswordEdit(isPasswordEdit);
			setValues(prev => {
				const { password, passwordConfirm, ...rest } = prev;
				return rest;
			});
			setErrors(prev => {
				const { password, passwordConfirm, ...rest } = prev;
				return rest;
			});
		}
	};

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
					{passwordEdit && (
						<>
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
						</>
					)}
					{!passwordEdit && (
						<li style={{ marginBottom: '10px' }}>
							<UserButton onClick={() => switchEditMode(true)}>
								비밀번호 수정
							</UserButton>
						</li>
					)}
					{passwordEdit && (
						<li style={{ marginBottom: '10px' }}>
							<UserButton onClick={() => switchEditMode(false)}>
								비밀번호 수정 취소
							</UserButton>
						</li>
					)}
					<li>
						<UserButton
							type='submit'
							onClick={e => {
								e.preventDefault();
								userValidator(values);
							}}
						>
							수정하기
						</UserButton>
					</li>
				</ul>
			</form>
		</main>
	);
}

export default UserEdit;
