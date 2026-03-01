import { useState, useEffect } from 'react'
import { useUserContext } from 'context/UserContext'
import { fetchPosters } from 'lib/req/posters'
import { toast } from 'react-toastify'

import PosterCard from 'components/dashboard/posters/PosterCard'
import PostersGuide from 'components/dashboard/posters/PostersGuide'
import NotActive from 'components/dashboard/NotActive'
import DashboardLoading from 'components/dashboard/DashboardLoading'
import SubmissionCard from 'components/dashboard/posters/SubmissionCard'
import SubmissionPopup from 'components/dashboard/posters/SubmissionPopup'

import styles from 'components/dashboard/posters/posters.module.css'

export default function Posters() {
	const { sectionsConfig, user, jwt } = useUserContext()

	const [loading, setLoading] = useState(false)
	const [posters, setPosters] = useState([])
	const [submissions, setSubmissions] = useState([])
	const [selectedTab, setSelectedTab] = useState('posters')
	const [currSubmission, setCurrSubmission] = useState(null)
	const [showSubmissionPopup, setShowSubmissionPopup] = useState(false)

	useEffect(() => {
		if (!user || !sectionsConfig?.posters) return
		fetch()
	}, [user, sectionsConfig])

	function fetch() {
		setLoading(true)
		fetchPosters(jwt, user?.caId)
			.then(({ posters, submissions }) => {
				setPosters(posters)
				setSubmissions(submissions)
			})
			.catch((err) => {
				console.error(err)
				toast.error('Failed to load posters')
			})
			.finally(() => setLoading(false))
	}

	function handleSubmit(item) {
		const sub = submissions?.find((s) => s?.posterId == item?.posterId)
		setCurrSubmission({
			caId: user?.caId,
			submissionId: sub?.submissionId,
			posterId: item?.posterId,
			posterTitle: item?.title,
			posterImageUrl: item?.image,
			comment: sub?.comment,
			points: sub?.point,
			reason: sub?.reason,
			remarks: sub?.remarks,
			status: sub?.status,
			images: sub?.images,
		})
		setShowSubmissionPopup(true)
	}

	function handleEditSubmission(submission) {
		setCurrSubmission(submission)
		setShowSubmissionPopup(true)
	}

	if (!sectionsConfig?.posters) return <NotActive />
	else if (loading) return <DashboardLoading />
	else
		return (
			<>
				<PostersGuide />
				<Tabs selected={selectedTab} onClick={setSelectedTab} />
				<div className='dashboard-main-content'>
					{selectedTab == 'posters' && (
						<PostersTab
							posters={posters.filter((item) => !item?.hide)}
							user={user}
							onSubmit={handleSubmit}
						/>
					)}
					{selectedTab == 'submissions' && (
						<Submissions submissions={submissions} onEdit={handleEditSubmission} />
					)}
					{showSubmissionPopup && (
						<SubmissionPopup
							submission={currSubmission}
							onSubmit={() => {
								setShowSubmissionPopup(false)
								setCurrSubmission(null)
								fetch()
							}}
							onCancel={() => {
								setShowSubmissionPopup(false)
								setCurrSubmission(null)
							}}
						/>
					)}
				</div>
			</>
		)
}

function PostersTab({ posters, user, onSubmit }) {
	if (!posters?.length) return <div className='empty'>Nothing here yet</div>
	else
		return (
			<>
				{posters.map((item, index) => (
					<PosterCard
						key={index}
						imageLink={item?.image}
						heading={item?.title}
						writeup={item?.description}
						registerLink={item?.registerLink}
						refCode={user?.refCode}
						onSubmit={() => onSubmit(item)}
					/>
				))}
			</>
		)
}

function Submissions({ submissions, onEdit }) {
	if (!submissions?.length) return <div className='empty'>Nothing here yet</div>
	else
		return (
			<div className={styles['submissions']}>
				{submissions?.map((item, index) => (
					<SubmissionCard key={index} data={item} onEdit={() => onEdit(item)} />
				))}
			</div>
		)
}

function Tabs({ selected, onClick }) {
	return (
		<div className={styles['tabs']}>
			<div
				className={`${styles['tab']} ${selected == 'posters' ? styles['selected-tab'] : ''}`}
				onClick={() => onClick('posters')}
			>
				Posters
			</div>
			<div
				className={`${styles['tab']} ${selected == 'submissions' ? styles['selected-tab'] : ''}`}
				onClick={() => onClick('submissions')}
			>
				Submissions
			</div>
		</div>
	)
}
