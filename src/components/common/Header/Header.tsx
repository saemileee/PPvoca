import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.scss';
import {
	BsPencil,
	BsJournalBookmark,
	BsPatchQuestion,
	BsCalendar4Week,
} from 'react-icons/bs';
import { TbLogin } from 'react-icons/tb';

function Header() {
	return (
		<header className={styles.container}>
			<nav className={styles.menu}>
				<ul className={styles.menuList}>
					<li className={styles.menuItem}>
						<NavLink
							to='/'
							style={({ isActive }) => ({
								color: isActive ? 'red' : 'black',
							})}>
							<div className={styles.iconWrapper}>
								<BsPencil size={20} />
							</div>
						</NavLink>
					</li>
					<li className={styles.menuItem}>
						<NavLink
							to='./book/list'
							style={({ isActive }) => ({
								color: isActive ? 'red' : 'black',
							})}>
							<div className={styles.iconWrapper}>
								<BsJournalBookmark size={20} />
							</div>
						</NavLink>
					</li>
					<li className={styles.menuItem}>
						<NavLink
							to='/'
							style={({ isActive }) => ({
								color: isActive ? 'red' : 'black',
							})}>
							<div className={styles.iconWrapper}>
								<BsPatchQuestion size={20} />
							</div>
						</NavLink>
					</li>
					<li className={styles.menuItem}>
						<NavLink
							to='./Calendar'
							style={({ isActive }) => ({
								color: isActive ? 'red' : 'black',
							})}>
							<div className={styles.iconWrapper}>
								<BsCalendar4Week size={20} />
							</div>
						</NavLink>
					</li>
					<li className={styles.menuItem}>
						<NavLink
							to='./Login'
							style={({ isActive }) => ({
								color: isActive ? 'red' : 'black',
							})}>
							<div className={styles.iconWrapper}>
								<TbLogin size={20} />
							</div>
						</NavLink>
					</li>
				</ul>
			</nav>
		</header>
	);
}

export default Header;
