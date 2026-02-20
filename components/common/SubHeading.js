import styles from './sub-heading.module.css'

export default function SubHeading({ title, icon }) {
	return (
		<div className={styles['sub-heading-wrapper']}>
			<img src={icon} alt='' className={styles['sub-heading-icon']} />
			<h3 className={styles['sub-heading']}>{title}</h3>
		</div>
	)
}
