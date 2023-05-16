import React, { useState } from 'react';
import styles from '../components/UserEdit/UserEdit.module.scss';
import Logo from '../components/common/Logo/Logo';
import UserEditForm from '../components/UserEdit/UserEditForm';
import UserDeleteForm from '../components/UserEdit/UserDeleteForm';

function UserEdit() {
	const logoStyle = {
		transform: 'translateX(-10px)',
		marginBottom: '5vh',
	};

	const [enableDelete, setEnableDelete] = useState(false);

	return (
		<main className={styles.container}>
			<Logo style={logoStyle} />
			{!enableDelete ? (
				<UserEditForm setEnableDelete={setEnableDelete} />
			) : (
				<UserDeleteForm setEnableDelete={setEnableDelete} />
			)}
		</main>
	);
}

export default UserEdit;
