import Link from 'next/link'
import { IoMdClose } from 'react-icons/io'
import { useUserContext } from 'context/UserContext'

import styles from './menu.module.css'

export default function Menu({ show, onClose }) {
	const { isLoggedIn } = useUserContext()

	return (
		<div className={`${styles['menu']} ${show ? styles['menu-visible'] : styles['menu-hidden']}`}>
			<div className={styles['navbar']}>
				<div className={styles['logo-wrapper']}>
					<IoMdClose className={styles['menu-icon']} onClick={onClose} />
					<Link href='/'>
						<img src='/images/ragam.svg' alt='Ragam 2025' className={styles['nav-logo']} />
					</Link>
				</div>
			</div>

			<ul className={styles['menu-links']} onClick={onClose}>
				<li>
					<Link href='/'>
						<img src='/images/home.png' alt='🏡' />
						Home
					</Link>
				</li>
				{isLoggedIn && (
					<li>
						<Link href='/dashboard'>
							<img src='/images/dashboard.png' alt='📊' />
							Dashboard
						</Link>
					</li>
				)}
				<li>
					<Link href='/leaderboard'>
						<img src='/images/leaderboard.png' alt='🏆' />
						Leaderboard
					</Link>
				</li>
				<li>
					<Link href='/contact'>
						<img src='/images/contact.png' alt='☎️' />
						Contact
					</Link>
				</li>
			</ul>
		</div>
	)
}
