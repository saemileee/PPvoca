import React from 'react';
import styles from './Header.module.scss';

function Header({ title }: { title: string }) {
	return (
		<div className={styles.headerContainer}>
			<header className={styles.commonHeader}>{title}</header>
		</div>
	);
}

export default Header;
