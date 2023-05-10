import React from 'react';
import { Link } from 'react-router-dom';
import styles from './Header.module.scss';
import {
	BsPencil,
	BsJournalBookmark,
	BsPatchQuestion,
	BsCalendar4Week,
} from 'react-icons/bs';
import { TbLogin } from 'react-icons/tb';

const Header = () => {
	return (
		<header className={styles.container}>
			<nav className={styles.menu}>
				<ul className={styles.menuList}>
					<li className={styles.menuItem}>
						<Link to='/'>
							<BsPencil size={20} />
						</Link>
					</li>
					<li className={styles.menuItem}>
						<Link to='/'>
							<BsJournalBookmark size={20} />
						</Link>
					</li>
					<li className={styles.menuItem}>
						<Link to='/'>
							<BsPatchQuestion size={20} />
						</Link>
					</li>
					<li className={styles.menuItem}>
						<Link to='/'>
							<BsCalendar4Week size={20} />
						</Link>
					</li>
					<li className={styles.menuItem}>
						<Link to='/'>
							<TbLogin size={20} />
						</Link>
					</li>
				</ul>
			</nav>
		</header>
	);
};

export default Header;
