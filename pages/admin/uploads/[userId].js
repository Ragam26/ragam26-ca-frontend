import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useUserContext } from 'context/UserContext'
import { BiArrowBack, BiCheckCircle, BiXCircle, BiX, BiTime, BiTrophy } from 'react-icons/bi'
import { FaWhatsapp, FaInstagram } from 'react-icons/fa'
import { MdSms } from 'react-icons/md'
import { fetchUploads, updateUploadStatus, buildImageUrl } from 'lib/req/uploads'

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
	const username = userId ? decodeURIComponent(userId) : null
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
		if (!username) return
		fetchScreenshots()
	}, [username])

	async function fetchScreenshots() {
		setLoading(true)
		try {
			const data = await fetchUploads(jwt, { username })
			const uploads = data || []
			if (uploads.length > 0) {
				setUserInfo({
					name: uploads[0].user?.name || username,
					points: uploads[0].user?.points || 0,
				})
			} else {
				setUserInfo({ name: username, points: 0 })
			}
			const mapped = uploads.map((upload) => ({
				id: upload.uploadId,
				url: buildImageUrl(upload.filePath),
				tag: upload.category,
				status: upload.status === 'approved' ? 'accepted' : upload.status,
				points: upload.points,
				uploadedAt: upload.createdAt,
			}))
			setScreenshots(mapped)
		} catch (err) {
			console.error('Failed to fetch screenshots:', err)
		} finally {
			setLoading(false)
		}
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
			(action === 'accept' || action === 'rewardAll') &&
			(!pointsInput || isNaN(Number(pointsInput)) || Number(pointsInput) < 0)
		) {
			alert('Please enter a valid number of points.')
			return
		}

		setActionLoading(true)
		try {
			if (action === 'rewardAll') {
				const pendingScreenshots = screenshots.filter((s) => s.status === 'pending')
				const totalReward = Number(pointsInput)
				const count = pendingScreenshots.length
				if (count === 0) return

				const pointsPerScreenshot = Math.floor(totalReward / count)
				let remainder = totalReward % count

				await Promise.all(
					pendingScreenshots.map((s) => {
						let pointsToGive = pointsPerScreenshot

						if (remainder > 0) {
							pointsToGive += 1
							remainder--
						}

						return updateUploadStatus(jwt, s.id, 'approved', pointsToGive)
					})
				)
			} else {
				await updateUploadStatus(
					jwt,
					screenshot.id,
					action === 'accept' ? 'approved' : 'rejected',
					action === 'accept' ? Number(pointsInput) : undefined
				)
			}
			await fetchScreenshots()
		} catch (err) {
			console.error('Action failed:', err)
			alert('Failed to update status. Please try again.')
		} finally {
			setActionModal(null)
			setActionLoading(false)
		}
	}

	const filteredScreenshots = screenshots.filter((s) => {
		const matchTag = filterTag === 'all' || s.tag === filterTag
		const matchStatus = filterStatus === 'all' || s.status === filterStatus
		return matchTag && matchStatus
	})

	const totalPoints = userInfo?.points || 0

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
					<button
						className='summary-chip reward-btn'
						disabled={screenshots.filter((s) => s.status === 'pending').length === 0}
						onClick={() => {
							setActionModal({ screenshot: null, action: 'rewardAll' })
							setPointsInput('')
						}}
					>
						Reward Points
					</button>
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
							{actionModal.action === 'accept'
								? '✅ Accept Screenshot'
								: actionModal.action === 'reject'
								? '❌ Reject Screenshot'
								: '🏆 Reward All Pending Screenshots'}
						</h2>

						{actionModal.action === 'accept' || actionModal.action === 'rewardAll' ? (
							<>
								<p className='action-modal-desc'>
									{actionModal.action === 'accept'
										? 'How many points would you like to award for this screenshot?'
										: 'How many points would you like to award to ALL pending screenshots?'}
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
									: actionModal.action === 'rewardAll'
									? 'Confirm & Reward All'
									: 'Confirm Reject'}
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	)
}
