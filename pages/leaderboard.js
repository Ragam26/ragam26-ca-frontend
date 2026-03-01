import { useState, useEffect } from 'react'
import { fetchLeaderboard } from 'lib/req/leaderboard'
import { useUserContext } from 'context/UserContext'

import RUReady from 'components/common/RUReady'
import PageHeader from 'components/common/PageHeader'

import styles from 'components/leaderboard/leaderboard.module.css'

export default function Leaderboard() {
	const { sectionsConfig } = useUserContext()

	const [leaderboard, setLeaderboard] = useState([])

	useEffect(() => {
		//! BYPASSING BACKEND - Using fake leaderboard data
		const fakeLeaderboard = [
			{ user: { name: 'Alice Johnson' }, totalPoints: 450 },
			{ user: { name: 'Bob Smith' }, totalPoints: 380 },
			{ user: { name: 'Charlie Brown' }, totalPoints: 350 },
			{ user: { name: 'Diana Prince' }, totalPoints: 320 },
			{ user: { name: 'Eve Martinez' }, totalPoints: 290 },
			{ user: { name: 'Frank Wilson' }, totalPoints: 270 },
			{ user: { name: 'Grace Lee' }, totalPoints: 250 },
			{ user: { name: 'Henry Davis' }, totalPoints: 230 },
			{ user: { name: 'Ivy Chen' }, totalPoints: 210 },
			{ user: { name: "Jack O'Neill" }, totalPoints: 190 },
			{ user: { name: 'Kate Miller' }, totalPoints: 175 },
			{ user: { name: 'Leo Anderson' }, totalPoints: 160 },
			{ user: { name: 'Mia Thompson' }, totalPoints: 145 },
			{ user: { name: 'Noah Garcia' }, totalPoints: 130 },
			{ user: { name: 'Olivia White' }, totalPoints: 120 },
		]
		setTimeout(() => setLeaderboard(fakeLeaderboard), 500)
		/*
		fetchLeaderboard().then(setLeaderboard).catch(console.error)
		*/
	}, [])
	useEffect(() => {
		console.log('leaderboard', leaderboard)
	}, [leaderboard])

	return (
		<>
			<PageHeader title='Leaderboard' icon='/images/leaderboard.png' />
			<div className='container'>
				<div className={styles['leaderboard']}>
					{!!leaderboard?.length && sectionsConfig?.leaderboard ? (
						<div className={styles['participants-wrapper']}>
							<div className={styles['participants-header']}>
								<span className={styles['p-rank']}>Rank</span>
								<span className={styles['p-name']}>Name</span>
								<span className={styles['p-points']}>Points</span>
							</div>
							{leaderboard
								.filter((item) => item?.user?.name && item.user.name.trim() !== '')
								.map((item, index) => (
									<Participant
										key={index}
										rank={index + 1}
										name={item?.user?.name}
										points={item?.totalPoints}
									/>
								))}
						</div>
					) : (
						<div className={`${styles['empty']} ${styles['empty-leaderboard']}`}>
							Nothing here yet
						</div>
					)}
				</div>
			</div>
			<RUReady />
		</>
	)
}

function Participant({ rank, name, points }) {
	return (
		<div className={styles['participant']}>
			<span className={styles['p-rank']}>{rank}</span>
			<span className={styles['p-name']}>{name}</span>
			<span className={styles['p-points']}>{points}</span>
		</div>
	)
}
