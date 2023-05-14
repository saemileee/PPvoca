import React, { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import { useNavigate } from 'react-router';
import { useSetRecoilState } from 'recoil';
import { userTokenState } from '../../recoil/userState';
import { loginUser } from '../../apis/user';
import useUserValidator from '../../hooks/useUserValidator';

import styles from './Login.module.scss';
import UserInput from '../common/UserInput/UserInput';
import UserButton from '../common/UserButton/UserButton';

function LoginForm() {
	const navigate = useNavigate();
	const setUserToken = useSetRecoilState(userTokenState);

	const initValues = {
		email: '',
		password: '',
	};

	const [values, setValues] = useState(initValues);
	const {
		errors,
		setErrors,
		userValidator,
		validationPass,
		setValidationPass,
	} = useUserValidator(initValues);

	const handleSubmit = async () => {
		try {
			const data = {
				userEmail: values.email,
				password: values.password,
			};
			const response = await loginUser(data);
			if (response.status === 200) {
				const { token } = response.data;
				setUserToken(token);
				alert('로그인되었습니다.');
				navigate('/user/info');
			}
		} catch (err: unknown) {
			if (err instanceof AxiosError) {
				if (err.response?.status === 400) {
					//수정 필요
					const errMsg = err.response.data.reason;
					return alert(errMsg);
				}
			}

			//console.log(err);
			alert('로그인에 실패하였습니다.');
		}
	};

	useEffect(() => {
		if (validationPass) {
			handleSubmit();
			//유효성 검사 성공 여부 초기화
			setValidationPass(false);
		}
	}, [validationPass]);

	return (
		<form className={styles.form}>
			<ul>
				<li>
					<UserInput
						type='text'
						name='email'
						label='이메일'
						setValues={setValues}
						error={errors.email}
					/>
				</li>
				<li>
					<UserInput
						type='password'
						name='password'
						label='비밀번호'
						setValues={setValues}
						error={errors.password}
					/>
				</li>
				<li>
					<UserButton
						type='submit'
						onClick={e => {
							e.preventDefault();
							userValidator(values, true);
						}}>
						로그인
					</UserButton>
				</li>
				<li>
					<UserButton type='link' path='/register'>
						회원가입
					</UserButton>
				</li>
			</ul>
		</form>
	);
}

export default LoginForm;
