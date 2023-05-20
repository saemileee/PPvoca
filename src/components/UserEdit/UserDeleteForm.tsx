import React, { useEffect, useState } from 'react';
import { AxiosError } from 'axios';
import Cookies from 'js-cookie';
import { useRecoilState } from 'recoil';
import { userTokenState } from '../../recoil/userState';
import { deleteUser } from '../../apis/user';
import useUserValidator from '../../hooks/useUserValidator';
import styles from './UserEdit.module.scss';
import UserInput from '../common/UserInput/UserInput';
import UserButton from '../common/UserButton/UserButton';

type ValueType = {
	password: string;
};

type FormDataType = {
	typedPassword: string;
};

type PropsTypes = {
	setEnableDelete: React.Dispatch<React.SetStateAction<boolean>>;
	openAlert: (message: string, onClose: null | (() => void)) => void;
};

function UserDeleteForm({ setEnableDelete, openAlert }: PropsTypes) {
	const [userToken, setUserToken] = useRecoilState(userTokenState);
	const initValue = {
		password: '',
	};
	const [value, setValue] = useState<ValueType>(initValue);
	const {
		errors,
		setErrors,
		userValidator,
		validationPass,
		setValidationPass,
	} = useUserValidator(initValue);

	const handleSubmit = async () => {
		if (window.confirm('정말 탈퇴하시겠습니까?😢')) {
			try {
				const data: FormDataType = {
					typedPassword: value.password,
				};
				const response = await deleteUser(data, userToken);
				if (response.status === 204) {
					openAlert('탈퇴 완료되었습니다.', () => {
						Cookies.remove('token');
						setUserToken('');
						window.location.reload();
					});
				}
			} catch (err: unknown) {
				if (err instanceof AxiosError) {
					if (err.response?.status === 401) {
						const errMsg = err.response.data.reason;
						return setErrors(prev => ({ ...prev, password: errMsg }));
					}
				}

				//console.log(err);
				openAlert('회원 탈퇴에 실패하였습니다.', null);
			}
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
						type='password'
						name='password'
						label='비밀번호 확인'
						setValues={setValue}
						error={errors.password}
					/>
				</li>
				<li style={{ marginBottom: '10px' }}>
					<UserButton onClick={() => setEnableDelete(false)}>취소</UserButton>
				</li>
				<li>
					<UserButton
						style={{
							color: '#7353ea',
							borderColor: '#7353ea',
						}}
						type='submit'
						onClick={e => {
							e.preventDefault();
							userValidator(value, false, true);
						}}>
						탈퇴하기
					</UserButton>
				</li>
			</ul>
		</form>
	);
}

export default UserDeleteForm;
