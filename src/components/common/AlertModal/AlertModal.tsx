import React from 'react';
import styles from './AlertModal.module.scss';

interface AlertModalProps {
	isOpen: boolean;
	onClose: () => void;
	message: string;
}

function AlertModal({ isOpen, onClose, message }: AlertModalProps) {
	if (!isOpen) {
		return null;
	}

	return (
		<>
			<div className={styles.overlay} onClick={onClose} />
			<div className={styles.modal}>
				<p>{message}</p>
				<div className={styles.buttonContainer}>
					<button onClick={onClose}>확인</button>
				</div>
			</div>
		</>
	);
}

export default AlertModal;
