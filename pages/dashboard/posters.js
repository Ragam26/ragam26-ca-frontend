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
		//! BYPASSING BACKEND - Using fake data
		setTimeout(() => {
			const fakePosters = [
				{
					posterId: 1,
					title: 'Workshop on AI & Machine Learning',
					description:
						'Join our exciting workshop on AI and ML! Learn from industry experts.\n\nDate: March 15, 2026\nTime: 10:00 AM',
					hide: false,
					registerLink: 'https://example.com/register/ai-workshop',
					image:
						'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=600&fit=crop',
				},
				{
					posterId: 2,
					title: 'Cultural Night - Ragam 2026',
					description:
						'Experience the grandest cultural fest! Music, dance, and more.\n\nVenue: Main Auditorium',
					hide: false,
					registerLink: 'https://example.com/register/cultural-night',
					image:
						'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=600&fit=crop',
				},
				{
					posterId: 3,
					title: 'Tech Talk: Future of Web Development',
					description: 'Discover the latest trends in web development with our expert speakers.',
					hide: false,
					registerLink: 'https://example.com/register/tech-talk',
					image:
						'https://images.unsplash.com/photo-1531482615713-2afd69097998?w=400&h=600&fit=crop',
				},
			]

			const fakeSubmissions = [
				{
					caId: user?.caId,
					submissionId: 101,
					posterId: 1,
					posterTitle: 'Workshop on AI & Machine Learning',
					posterImageUrl:
						'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=400&h=600&fit=crop',
					hide: false,
					registerLink: 'https://example.com/register/ai-workshop',
					comment: 'Shared on my Instagram story and WhatsApp status!',
					points: 50,
					reason: '',
					remarks: 'Great submission!',
					status: 'approved',
					images: [
						{
							id: 1,
							url: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=300&h=600&fit=crop',
						},
						{
							id: 2,
							url: 'https://images.unsplash.com/photo-1611162618071-b39a2ec055fb?w=300&h=600&fit=crop',
						},
					],
				},
				{
					caId: user?.caId,
					submissionId: 102,
					posterId: 2,
					posterTitle: 'Cultural Night - Ragam 2026',
					posterImageUrl:
						'https://images.unsplash.com/photo-1514320291840-2e0a9bf2a9ae?w=400&h=600&fit=crop',
					hide: false,
					registerLink: 'https://example.com/register/cultural-night',
					comment: 'Posted on my social media!',
					points: null,
					reason: '',
					remarks: '',
					status: 'pending',
					images: [
						{
							id: 3,
							url: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=300&h=600&fit=crop',
						},
					],
				},
			]

			setPosters(fakePosters)
			setSubmissions(fakeSubmissions)
			setLoading(false)
		}, 600) //! Simulate loading delay

		/*
		fetchPosters(jwt, user?.caId)
			.then(({ posters, submissions }) => {
				setPosters(posters)
				setSubmissions(submissions)
				setLoading(false)
			})
			.catch((err) => {
				console.error(err)
			})
		*/
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
