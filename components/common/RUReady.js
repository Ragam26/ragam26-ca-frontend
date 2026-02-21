import { useUserContext } from 'context/UserContext'

import styles from './r-u-ready.module.css'
import Link from 'next/link'

export default function RUReady() {
	// const { signIn } = useUserContext()

	return (
		<div className='container'>
			<div className='spacerv-md'></div>
			<div className='spacerv-sm'></div>
			<div className={styles['r-u-ready']}>
				<div className={styles['left']}>
					<img src='/images/victory.png' alt='✌️' className={styles['vic-icon']} />
					<div className='spacerh-xs'></div>
					<div className='r-u-ready-text'>
						<h3>Are you ready?</h3>
						<p>
							To be a part of the biggest cultural
							<br /> fest in South India
						</p>
					</div>
				</div>
				<Link href='/register' target='_blank'>
					<button className={`btn-primary ${styles['r-u-ready-btn']}`}>Register Now</button>
				</Link>
			</div>
			<div className='spacerv-md'></div>
			<div className='spacerv-sm'></div>
		</div>
	)
}
