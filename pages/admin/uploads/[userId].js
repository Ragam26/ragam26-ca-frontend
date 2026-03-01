import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useUserContext } from 'context/UserContext'
import { BiArrowBack, BiCheckCircle, BiXCircle, BiX, BiTime, BiTrophy } from 'react-icons/bi'
import { FaWhatsapp, FaInstagram } from 'react-icons/fa'
import { MdSms } from 'react-icons/md'

//! FAKE DATA - replace with real API call
const FAKE_USER_MAP = {
	1: { name: 'Alice Johnson', college: 'NIT Calicut', email: 'alice@example.com' },
	2: { name: 'Bob Smith', college: 'IIT Bombay', email: 'bob@example.com' },
	3: { name: 'Carol White', college: 'BITS Pilani', email: 'carol@example.com' },
	4: { name: 'David Lee', college: 'VIT Vellore', email: 'david@example.com' },
	5: { name: 'Eva Green', college: 'Amrita Coimbatore', email: 'eva@example.com' },
	6: { name: 'Frank Torres', college: 'SRM Chennai', email: 'frank@example.com' },
} //!

//! FAKE SCREENSHOTS - replace with real API call
const FAKE_SCREENSHOTS = {
	1: [
		{
			id: 101,
			url: 'https://picsum.photos/seed/s101/400/700',
			tag: 'whatsapp',
			status: 'pending',
			uploadedAt: '2026-02-25T10:00:00Z',
		},
		{
			id: 102,
			url: 'https://picsum.photos/seed/s102/400/700',
			tag: 'instagram',
			status: 'accepted',
			points: 50,
			uploadedAt: '2026-02-24T09:00:00Z',
		},
		{
			id: 103,
			url: 'https://picsum.photos/seed/s103/400/700',
			tag: 'whatsapp',
			status: 'pending',
			uploadedAt: '2026-02-26T11:00:00Z',
		},
		{
			id: 104,
			url: 'https://picsum.photos/seed/s104/400/700',
			tag: 'other',
			status: 'pending',
			uploadedAt: '2026-02-27T12:00:00Z',
		},
		{
			id: 105,
			url: 'https://picsum.photos/seed/s105/400/700',
			tag: 'instagram',
			status: 'rejected',
			uploadedAt: '2026-02-23T08:00:00Z',
		},
	],
	2: [
		{
			id: 201,
			url: 'https://picsum.photos/seed/s201/400/700',
			tag: 'instagram',
			status: 'pending',
			uploadedAt: '2026-02-25T10:00:00Z',
		},
		{
			id: 202,
			url: 'https://picsum.photos/seed/s202/400/700',
			tag: 'whatsapp',
			status: 'pending',
			uploadedAt: '2026-02-25T11:00:00Z',
		},
		{
			id: 203,
			url: 'https://picsum.photos/seed/s203/400/700',
			tag: 'instagram',
			status: 'accepted',
			points: 75,
			uploadedAt: '2026-02-24T09:00:00Z',
		},
		{
			id: 204,
			url: 'https://picsum.photos/seed/s204/400/700',
			tag: 'whatsapp',
			status: 'rejected',
			uploadedAt: '2026-02-22T10:00:00Z',
		},
		{
			id: 205,
			url: 'https://picsum.photos/seed/s205/400/700',
			tag: 'other',
			status: 'pending',
			uploadedAt: '2026-02-26T14:00:00Z',
		},
		{
			id: 206,
			url: 'https://picsum.photos/seed/s206/400/700',
			tag: 'whatsapp',
			status: 'pending',
			uploadedAt: '2026-02-27T09:00:00Z',
		},
		{
			id: 207,
			url: 'https://picsum.photos/seed/s207/400/700',
			tag: 'instagram',
			status: 'accepted',
			points: 30,
			uploadedAt: '2026-02-23T15:00:00Z',
		},
		{
			id: 208,
			url: 'https://picsum.photos/seed/s208/400/700',
			tag: 'instagram',
			status: 'pending',
			uploadedAt: '2026-02-28T08:00:00Z',
		},
	],
	3: [
		{
			id: 301,
			url: 'https://picsum.photos/seed/s301/400/700',
			tag: 'whatsapp',
			status: 'accepted',
			points: 60,
			uploadedAt: '2026-02-20T10:00:00Z',
		},
		{
			id: 302,
			url: 'https://picsum.photos/seed/s302/400/700',
			tag: 'instagram',
			status: 'accepted',
			points: 90,
			uploadedAt: '2026-02-21T11:00:00Z',
		},
		{
			id: 303,
			url: 'https://picsum.photos/seed/s303/400/700',
			tag: 'other',
			status: 'accepted',
			points: 50,
			uploadedAt: '2026-02-22T12:00:00Z',
		},
	],
} //!

function TagIcon({ tag }) {
	if (tag === 'whatsapp')
		return (
			<span className='screenshot-tag whatsapp'>
				<FaWhatsapp size={12} /> WhatsApp
			</span>
		)
	if (tag === 'instagram')
		return (
			<span className='screenshot-tag instagram'>
				<FaInstagram size={12} /> Instagram
			</span>
		)
	return (
		<span className='screenshot-tag other'>
			<MdSms size={12} /> Other
		</span>
	)
}

function StatusBadge({ status, points }) {
	if (status === 'accepted')
		return (
			<span className='screenshot-status accepted'>
				<BiCheckCircle size={13} /> Accepted {points != null ? `· ${points} pts` : ''}
			</span>
		)
	if (status === 'rejected')
		return (
			<span className='screenshot-status rejected'>
				<BiXCircle size={13} /> Rejected
			</span>
		)
	return (
		<span className='screenshot-status pending'>
			<BiTime size={13} /> Pending
		</span>
	)
}

export default function UserScreenshotsPage() {
	const router = useRouter()
	const { userId } = router.query
	const { jwt } = useUserContext()

	const [loading, setLoading] = useState(true)
	const [userInfo, setUserInfo] = useState(null)
	const [screenshots, setScreenshots] = useState([])
	const [lightbox, setLightbox] = useState(null) // screenshot object for enlarged view
	const [actionModal, setActionModal] = useState(null) // { screenshot, action: 'accept'|'reject' }
	const [pointsInput, setPointsInput] = useState('')
	const [actionLoading, setActionLoading] = useState(false)
	const [filterTag, setFilterTag] = useState('all')
	const [filterStatus, setFilterStatus] = useState('all')

	useEffect(() => {
		if (!userId) return
		fetchScreenshots()
	}, [userId])

	async function fetchScreenshots() {
		setLoading(true)
		//! FAKE DATA - replace with real API call
		setTimeout(() => {
			const uid = parseInt(userId)
			setUserInfo(FAKE_USER_MAP[uid] || { name: 'Unknown User', college: '--', email: '--' })
			setScreenshots(FAKE_SCREENSHOTS[uid] || [])
			setLoading(false)
		}, 400)
		/*
		try {
			const { data } = await axios.get(`/api/admin/uploads/${userId}`, {
				headers: { Authorization: `Bearer ${jwt}` },
			})
			setUserInfo(data.user)
			setScreenshots(data.screenshots || [])
		} catch (err) {
			console.error('Failed to fetch screenshots:', err)
		}
		setLoading(false)
		*/
	}

	function openAccept(screenshot) {
		setActionModal({ screenshot, action: 'accept' })
		setPointsInput('')
	}

	function openReject(screenshot) {
		setActionModal({ screenshot, action: 'reject' })
		setPointsInput('')
	}

	async function confirmAction() {
		if (!actionModal) return
		const { screenshot, action } = actionModal

		if (
			action === 'accept' &&
			(!pointsInput || isNaN(Number(pointsInput)) || Number(pointsInput) < 0)
		) {
			alert('Please enter a valid number of points.')
			return
		}

		setActionLoading(true)
		//! FAKE ACTION - replace with real API call
		setTimeout(() => {
			setScreenshots((prev) =>
				prev.map((s) =>
					s.id === screenshot.id
						? {
								...s,
								status: action === 'accept' ? 'accepted' : 'rejected',
								points: action === 'accept' ? Number(pointsInput) : undefined,
						  }
						: s
				)
			)
			setActionModal(null)
			setActionLoading(false)
		}, 500)
		/*
		try {
			await axios.post(
				`/api/admin/uploads/${userId}/action`,
				{
					screenshotId: screenshot.id,
					action,
					points: action === 'accept' ? Number(pointsInput) : undefined,
				},
				{ headers: { Authorization: `Bearer ${jwt}` } }
			)
			fetchScreenshots()
		} catch (err) {
			console.error('Action failed:', err)
		}
		setActionLoading(false)
		setActionModal(null)
		*/
	}

	const filteredScreenshots = screenshots.filter((s) => {
		const matchTag = filterTag === 'all' || s.tag === filterTag
		const matchStatus = filterStatus === 'all' || s.status === filterStatus
		return matchTag && matchStatus
	})

	const totalPoints = screenshots
		.filter((s) => s.status === 'accepted')
		.reduce((sum, s) => sum + (s.points || 0), 0)

	function formatDate(dateStr) {
		if (!dateStr) return '--'
		return new Date(dateStr).toLocaleDateString('en-IN', {
			day: 'numeric',
			month: 'short',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		})
	}

	if (loading) {
		return (
			<div className='admin-loading'>
				<span>Loading screenshots...</span>
			</div>
		)
	}

	return (
		<>
			{/* Header */}
			<div className='screenshots-page-header'>
				<button className='screenshots-back-btn' onClick={() => router.push('/admin/uploads')}>
					<BiArrowBack size={18} /> Back
				</button>

				<div className='screenshots-user-meta'>
					<div className='screenshots-user-avatar'>{userInfo?.name?.charAt(0)?.toUpperCase()}</div>
					<div>
						<h1 className='screenshots-user-title'>{userInfo?.name}</h1>
						<p className='screenshots-user-sub'>
							{userInfo?.college} · {userInfo?.email}
						</p>
					</div>
				</div>

				<div className='screenshots-summary-chips'>
					<div className='summary-chip total'>
						<span>{screenshots.length}</span> Total
					</div>
					<div className='summary-chip pending'>
						<span>{screenshots.filter((s) => s.status === 'pending').length}</span> Pending
					</div>
					<div className='summary-chip accepted'>
						<span>{screenshots.filter((s) => s.status === 'accepted').length}</span> Accepted
					</div>
					<div className='summary-chip rejected'>
						<span>{screenshots.filter((s) => s.status === 'rejected').length}</span> Rejected
					</div>
					<div className='summary-chip points'>
						<BiTrophy size={14} />
						<span>{totalPoints}</span> pts earned
					</div>
				</div>
			</div>

			{/* Filters */}
			<div className='screenshots-filters'>
				<div className='screenshots-filter-group'>
					<span className='filter-label'>Tag:</span>
					{['all', 'whatsapp', 'instagram', 'other'].map((t) => (
						<button
							key={t}
							className={`uploads-filter-tab ${filterTag === t ? 'active' : ''}`}
							onClick={() => setFilterTag(t)}
						>
							{t === 'whatsapp' && <FaWhatsapp size={12} />}
							{t === 'instagram' && <FaInstagram size={12} />}
							{t === 'other' && <MdSms size={12} />}
							{t.charAt(0).toUpperCase() + t.slice(1)}
						</button>
					))}
				</div>
				<div className='screenshots-filter-group'>
					<span className='filter-label'>Status:</span>
					{['all', 'pending', 'accepted', 'rejected'].map((s) => (
						<button
							key={s}
							className={`uploads-filter-tab ${filterStatus === s ? 'active' : ''}`}
							onClick={() => setFilterStatus(s)}
						>
							{s.charAt(0).toUpperCase() + s.slice(1)}
						</button>
					))}
				</div>
			</div>

			{/* Screenshots Grid */}
			{filteredScreenshots.length === 0 ? (
				<div className='admin-empty-state'>
					<p>No screenshots match the selected filters.</p>
				</div>
			) : (
				<div className='screenshots-grid'>
					{filteredScreenshots.map((s) => (
						<div key={s.id} className={`screenshot-card ${s.status}`}>
							<div className='screenshot-img-wrap' onClick={() => setLightbox(s)}>
								<img src={s.url} alt='Screenshot' className='screenshot-img' />
								<div className='screenshot-img-overlay'>
									<span>Click to enlarge</span>
								</div>
							</div>

							<div className='screenshot-card-footer'>
								<div className='screenshot-meta'>
									<TagIcon tag={s.tag} />
									<StatusBadge status={s.status} points={s.points} />
								</div>
								<div className='screenshot-date'>{formatDate(s.uploadedAt)}</div>

								{s.status === 'pending' && (
									<div className='screenshot-actions'>
										<button className='screenshot-btn accept' onClick={() => openAccept(s)}>
											<BiCheckCircle size={15} /> Accept
										</button>
										<button className='screenshot-btn reject' onClick={() => openReject(s)}>
											<BiXCircle size={15} /> Reject
										</button>
									</div>
								)}
							</div>
						</div>
					))}
				</div>
			)}

			{/* Lightbox */}
			{lightbox && (
				<div className='lightbox-overlay' onClick={() => setLightbox(null)}>
					<div className='lightbox-content' onClick={(e) => e.stopPropagation()}>
						<button className='lightbox-close' onClick={() => setLightbox(null)}>
							<BiX size={24} />
						</button>
						<img src={lightbox.url} alt='Enlarged screenshot' className='lightbox-img' />
						<div className='lightbox-footer'>
							<TagIcon tag={lightbox.tag} />
							<StatusBadge status={lightbox.status} points={lightbox.points} />
							<span className='screenshot-date'>{formatDate(lightbox.uploadedAt)}</span>
						</div>
					</div>
				</div>
			)}

			{/* Accept / Reject Modal */}
			{actionModal && (
				<div
					className='action-modal-overlay'
					onClick={() => !actionLoading && setActionModal(null)}
				>
					<div className='action-modal' onClick={(e) => e.stopPropagation()}>
						<h2 className='action-modal-title'>
							{actionModal.action === 'accept' ? '✅ Accept Screenshot' : '❌ Reject Screenshot'}
						</h2>

						{actionModal.action === 'accept' ? (
							<>
								<p className='action-modal-desc'>
									How many points would you like to award for this screenshot?
								</p>
								<div className='action-modal-points-row'>
									<BiTrophy size={20} color='#f59e0b' />
									<input
										type='number'
										min='0'
										placeholder='Enter points...'
										value={pointsInput}
										onChange={(e) => setPointsInput(e.target.value)}
										className='action-modal-points-input'
										autoFocus
									/>
								</div>
							</>
						) : (
							<p className='action-modal-desc'>
								Are you sure you want to reject this screenshot? This action can be reversed.
							</p>
						)}

						<div className='action-modal-btns'>
							<button
								className='action-modal-cancel'
								onClick={() => setActionModal(null)}
								disabled={actionLoading}
							>
								Cancel
							</button>
							<button
								className={`action-modal-confirm ${actionModal.action}`}
								onClick={confirmAction}
								disabled={actionLoading}
							>
								{actionLoading
									? 'Processing...'
									: actionModal.action === 'accept'
									? 'Confirm & Award Points'
									: 'Confirm Reject'}
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	)
}
