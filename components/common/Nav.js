import { useState } from 'react'
import { useUserContext } from 'context/UserContext'

import { BiMenu } from 'react-icons/bi'
import Link from 'next/link'
import Menu from 'components/common/Menu'

import styles from './nav.module.css'

export default function Nav() {
	const [showMenu, setShowMenu] = useState(false)

	const { isLoggedIn, user, signIn, logout } = useUserContext()

	const handleLogin = () => {
		signIn()
	}

	return (
		<nav className={styles['navbar']}>
			<div className={styles['logo-wrapper']}>
				<BiMenu className={styles['menu-icon']} onClick={() => setShowMenu(true)} />
				<Link href='/'>
					<img src='/images/ragam.svg' alt='Ragam 2025' className={styles['nav-logo']} />
				</Link>
			</div>

			<div className={styles['nav-right']}>
				<ul className={styles['nav-links']}>
					<li>
						<Link href='/' className={styles['nav-text']}>
							Home
						</Link>
					</li>
					<li>
						<Link href='/leaderboard' className={styles['nav-text']}>
							Leaderboard
						</Link>
					</li>
					{isLoggedIn && (
						<li>
							<Link href='/dashboard/referrals' className={styles['nav-text']}>
								Dashboard
							</Link>
						</li>
					)}
					<li>
						<Link href='/contact' className={styles['nav-text']}>
							Contact
						</Link>
					</li>
					<li>
						{!isLoggedIn ? (
							<div className={styles['sign-in-desktop']} onClick={handleLogin}>
								Sign in
							</div>
						) : (
							<div className={styles['sign-out-desktop']}>
								<div
									className={styles['avatar']}
									title={user?.name || 'User'}
									onClick={logout}
									style={{
										backgroundImage: `url(${user?.imageUrl || '/images/avatar.png'})`,
									}}
								/>
							</div>
						)}
					</li>
				</ul>
				{!isLoggedIn ? (
					<div className={styles['sign-in-mobile']} onClick={handleLogin}>
						Sign in
					</div>
				) : (
					<div className={styles['sign-out-mobile']} onClick={logout}>
						Sign out
					</div>
				)}
			</div>
			<Menu show={showMenu} onClose={() => setShowMenu(false)} />
		</nav>
	)
}
