import React from 'react';
import styles from '../common/AlertModal/AlertModal.module.scss';

interface ConfirmModalProps {
	isOpen: boolean;
	onClose: () => void;
	onConfirm: () => void;
}

function ConfirmModal({ isOpen, onClose, onConfirm }: ConfirmModalProps) {
	if (!isOpen) {
		return null;
	}

	return (
		<>
			<div className={styles.overlay} onClick={onClose} />
			<div className={styles.modal}>
				<p>단어장을 삭제 하시겠습니까?</p>
				<button onClick={onConfirm}>네</button>
				<button onClick={onClose}>아니오</button>
			</div>
		</>
	);
}

export default ConfirmModal;
