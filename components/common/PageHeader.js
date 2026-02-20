import styles from './page-header.module.css'

export default function PageHeader({ title, icon }) {
	return (
		<>
			<div className={styles['page-header-bg']}></div>
			<div className={styles['page-heading-wrapper']}>
				<img src={icon} alt='' className={styles['page-heading-icon']} />
				<h1 className={styles['page-heading']}>{title}</h1>
			</div>
		</>
	)
}
