import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';

const Header = () => {
	return (
		<header className={styles.container}>
			<nav className={styles.menu}>
				<ul className={styles.menuList}>
					<li className={styles.menuItem}>
						<Link to='/'>메뉴1</Link>
					</li>
					<li className={styles.menuItem}>
						<Link to='/'>메뉴2</Link>
					</li>
					<li className={styles.menuItem}>
						<Link to='/'>메뉴3</Link>
					</li>
					<li className={styles.menuItem}>
						<Link to='/'>메뉴4</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
