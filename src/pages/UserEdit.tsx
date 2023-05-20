import React, { useState } from 'react';
import styles from '../components/UserEdit/UserEdit.module.scss';
import useUserAlert from '../hooks/useUserAlert';
import Navigation from '../components/common/Navigation/Navigation';
import Logo from '../components/common/Logo/Logo';
import UserEditForm from '../components/UserEdit/UserEditForm';
import UserDeleteForm from '../components/UserEdit/UserDeleteForm';
import AlertModal from '../components/common/AlertModal/AlertModal';

function UserEdit() {
	const logoStyle = {
		transform: 'translateX(-10px)',
		marginBottom: '5vh',
	};

	const [enableDelete, setEnableDelete] = useState(false);
	const { alertModal, handleCloseAlert, handleOpenAlert } = useUserAlert();

	return (
		<>
			<Navigation />
			<main className={styles.container}>
				<Logo style={logoStyle} />
				{!enableDelete ? (
					<UserEditForm
						setEnableDelete={setEnableDelete}
						openAlert={handleOpenAlert}
					/>
				) : (
					<UserDeleteForm
						setEnableDelete={setEnableDelete}
						openAlert={handleOpenAlert}
					/>
				)}
				{alertModal.isOpen && (
					<AlertModal
						isOpen={alertModal.isOpen}
						onClose={alertModal.onClose ? alertModal.onClose : handleCloseAlert}
						message={alertModal.message}
					/>
				)}
			</main>
		</>
	);
}

export default UserEdit;
