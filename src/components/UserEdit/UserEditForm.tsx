import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import { useRecoilValue } from 'recoil';
import { AxiosError } from 'axios';
import { userTokenState } from '../../recoil/userState';
import useUserValidator from '../../hooks/useUserValidator';
import { editUser, infoUser } from '../../apis/user';
import styles from '../Register/Register.module.scss';
import UserInput from '../common/UserInput/UserInput';
import UserButton from '../common/UserButton/UserButton';

type ValuesProps = {
	email?: string;
	nickname: string;
	password?: string;
	passwordConfirm?: string;
};

function UserEditForm() {
	const navigate = useNavigate();
	const userToken = useRecoilValue(userTokenState);
	const initValues = {
		nickname: '',
	};
	const [values, setValues] = useState<ValuesProps>(initValues);
	const [userInfo, setUserInfo] = useState<ValuesProps>(initValues);
	const [passwordEdit, setPasswordEdit] = useState<boolean>(false);
	const {
		errors,
		setErrors,
		userValidator,
		validationPass,
		setValidationPass,
	} = useUserValidator(initValues);

	const handleSubmit = async () => {
		try {
			const data: ValuesProps = {
				nickname: values.nickname,
			};
			if (passwordEdit) {
				data.password = values.password;
			}

			const response = await editUser(data, userToken);
			if (response.status === 200) {
				alert('회원정보가 수정되었습니다.');
				navigate('/user/info');
			}
		} catch (err: unknown) {
			if (err instanceof AxiosError) {
				if (err.response?.status === 401) {
					return alert('권한이 없습니다.');
				}
			}

			//console.log(err);
			alert('회원정보 수정에 실패하였습니다.');
		}
	};

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
					alert('로그인 후 이용 가능합니다.');
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
						disabled={true}
						defaultValue={userInfo.email || ''}
					/>
				</li>
				<li>
					<UserInput
						type='text'
						name='nickname'
						label='닉네임'
						setValues={setValues}
						defaultValue={userInfo.nickname || ''}
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
						}}>
						수정하기
					</UserButton>
				</li>
			</ul>
		</form>
	);
}

export default UserEditForm;
