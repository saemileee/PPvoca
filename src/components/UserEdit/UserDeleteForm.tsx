import React, { useState } from 'react';
import styles from './UserEdit.module.scss';
import UserInput from '../common/UserInput/UserInput';
import UserButton from '../common/UserButton/UserButton';

type ValueType = {
	password: string;
};

type PropsTypes = {
	setEnableDelete: React.Dispatch<React.SetStateAction<boolean>>;
};

function UserDeleteForm({ setEnableDelete }: PropsTypes) {
	const initValue = {
		password: '',
	};
	const [value, setValue] = useState<ValueType>(initValue);
	const [error, setError] = useState<ValueType>(initValue);
	const deleteAccount = () => {
		if (window.confirm('정말 탈퇴하시겠습니까?😢')) {
			console.log('힝');
		}
	};

	return (
		<form className={styles.form}>
			<ul>
				<li>
					<UserInput
						type='password'
						name='password'
						label='비밀번호 확인'
						setValues={setValue}
						error={error.password}
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
						onClick={deleteAccount}>
						탈퇴하기
					</UserButton>
				</li>
			</ul>
		</form>
	);
}

export default UserDeleteForm;
