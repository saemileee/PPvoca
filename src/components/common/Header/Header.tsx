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
							to='/word/add'
							style={({ isActive }) => ({
								color: isActive ? 'red' : 'black',
							})}>
							<div className={styles.iconWrapper}>
								<BsPencil size={24} />
							</div>
						</NavLink>
					</li>
					<li className={styles.menuItem}>
						<NavLink
							to='/book/list'
							style={({ isActive }) => ({
								color: isActive ? 'red' : 'black',
							})}>
							<div className={styles.iconWrapper}>
								<BsJournalBookmark size={24} />
							</div>
						</NavLink>
					</li>
					<li className={styles.menuItem}>
						<NavLink
							to='/quiz/list'
							style={({ isActive }) => ({
								color: isActive ? 'red' : 'black',
							})}>
							<div className={styles.iconWrapper}>
								<BsPatchQuestion size={24} />
							</div>
						</NavLink>
					</li>
					<li className={styles.menuItem}>
						<NavLink
							to='/calendar'
							style={({ isActive }) => ({
								color: isActive ? 'red' : 'black',
							})}>
							<div className={styles.iconWrapper}>
								<BsCalendar4Week size={24} />
							</div>
						</NavLink>
					</li>
					<li className={styles.menuItem}>
						<NavLink
							to='/login'
							style={({ isActive }) => ({
								color: isActive ? 'red' : 'black',
							})}>
							<div className={styles.iconWrapper}>
								<TbLogin size={24} />
							</div>
						</NavLink>
					</li>
				</ul>
			</nav>
		</header>
	);
}

export default Header;
