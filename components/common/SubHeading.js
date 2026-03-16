import styles from './sub-heading.module.css'

export default function SubHeading({ title, icon }) {
	return (
		<div className={styles['sub-heading-wrapper']}>
			{icon && <img src={icon} alt='' className={styles['sub-heading-icon']} />}
			{title && <h3 className={styles['sub-heading']}>{title}</h3>}
		</div>
	)
}
