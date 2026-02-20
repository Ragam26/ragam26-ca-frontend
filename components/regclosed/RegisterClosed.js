import styles from './register-closed.module.css'

export default function RegisterClosed() {
	return (
		<>
			<div className='container'>
				<div className={styles['closed-container']}>
					<img src='/images/reg-closed.png' alt='' className={styles['closed-img']} />
					<p className={styles['regclosed-header']}>Registration Closed</p>
					<p className={styles['regclosed-info']}>Contact us for any queries</p>
				</div>
				<div className='spacerv-md'></div>
				<div className='spacerv-sm'></div>
			</div>
		</>
	)
}
