import styles from './submission-card.module.css'

export default function SubmissionCard({ data, onEdit }) {
	function statusChip(status) {
		if (status == 'accepted')
			return <span className={`${styles['chip']} ${styles['approved']}`}>Approved</span>
		else if (status == 'rejected')
			return <span className={`${styles['chip']} ${styles['rejected']}`}>Rejected</span>
		else return <span className={`${styles['chip']} ${styles['pending']}`}>Pending</span>
	}

	return (
		<div className={styles['submission-card']}>
			<div className={styles['header-wrapper']}>
				<div
					className={styles['poster-image']}
					style={{ backgroundImage: `url('${data?.posterImageUrl}')` }}
				></div>
				<div className='flex flex-col gap-2'>
					<p className={styles['poster-title']}>{data?.posterTitle}</p>
					<div className={styles['point-status-wrapper']}>
						{statusChip(data?.status)}
						<span className={styles['points']}>
							{Number.isInteger(parseInt(data?.points)) ? data?.points : '--'} points
						</span>
					</div>
				</div>
			</div>
			<div className={styles['section']}>
				<span className={styles['section-title']}>Images</span>
				<div className={styles['images-grid']}>
					{data?.images?.map((img, index) => (
						<a href={img?.url} key={index} target='_blank' rel='noreferrer'>
							<div
								className={styles['image']}
								style={{ backgroundImage: `url('${img?.url}')` }}
							></div>
						</a>
					))}
				</div>
			</div>
			{data?.status == 'rejected' && data?.reason && (
				<div className={styles['section']}>
					<span className={styles['section-title']}>REASON FOR REJECTION</span>
					<p>{data?.reason}</p>
				</div>
			)}
			{data?.comment && (
				<div className={styles['section']}>
					<span className={styles['section-title']}>Your Comment</span>
					<p>{data?.comment}</p>
				</div>
			)}
			{data?.remarks && (
				<div className={styles['section']}>
					<span className={styles['section-title']}>Our Remarks</span>
					<p>{data?.remarks}</p>
				</div>
			)}
			<div className={styles['section']}>
				<button className={styles['edit-button']} onClick={onEdit}>
					Edit
				</button>
			</div>
		</div>
	)
}
