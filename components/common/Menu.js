import Link from 'next/link'
import { IoMdClose } from 'react-icons/io'

import styles from './menu.module.css'

export default function Menu({ show, onClose }) {
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
						<a>
							<img src='/images/home.png' alt='🏡' />
							Home
						</a>
					</Link>
				</li>
				<li>
					<Link href='/leaderboard'>
						<a>
							<img src='/images/leaderboard.png' alt='🏆' />
							Leaderboard
						</a>
					</Link>
				</li>
				<li>
					<Link href='/contact'>
						<a>
							<img src='/images/contact.png' alt='☎️' />
							Contact
						</a>
					</Link>
				</li>
			</ul>
		</div>
	)
}
