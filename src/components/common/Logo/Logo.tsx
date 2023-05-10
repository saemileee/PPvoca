import React from 'react';
import styles from './Logo.module.scss';

interface LogoProps {
	style?: React.CSSProperties;
}

function Logo({ style }: LogoProps) {
	return (
		<div className={styles.container} style={style}>
			<div className={styles.image}>logo</div>
			<h1>뿅뿅 단어장</h1>
		</div>
	);
}

export default Logo;
