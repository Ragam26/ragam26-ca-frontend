import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useUserContext } from 'context/UserContext'
import { BiSearch, BiImage, BiCheckCircle, BiXCircle, BiTime } from 'react-icons/bi'
import { FaWhatsapp, FaInstagram } from 'react-icons/fa'
import { fetchUploads } from 'lib/req/uploads'

export default function UploadsPage() {
	const router = useRouter()
	const { jwt } = useUserContext()
	const [loading, setLoading] = useState(true)
	const [users, setUsers] = useState([])
	const [searchQuery, setSearchQuery] = useState('')
	const [filterStatus, setFilterStatus] = useState('all')

	useEffect(() => {
		loadUploads()
	}, [jwt])

	async function loadUploads() {
		setLoading(true)
		try {
			const data = await fetchUploads(jwt)
			// Group flat upload list by user name to get per-user stats
			const userMap = {}
			for (const upload of data || []) {
				const name = upload?.user?.name
				if (!name) continue
				if (!userMap[name]) {
					userMap[name] = { name, totalUploads: 0, pending: 0, accepted: 0, rejected: 0 }
				}
				userMap[name].totalUploads++
				if (upload.status === 'approved') userMap[name].accepted++
				else if (upload.status === 'rejected') userMap[name].rejected++
				else userMap[name].pending++
			}
			setUsers(Object.values(userMap))
		} catch (err) {
			console.error('Failed to fetch uploads:', err)
		} finally {
			setLoading(false)
		}
	}

	const filteredUsers = users.filter((u) => {
		const matchSearch =
			!searchQuery.trim() || u.name.toLowerCase().includes(searchQuery.toLowerCase())
		const matchFilter =
			filterStatus === 'all' ||
			(filterStatus === 'pending' && u.pending > 0) ||
			(filterStatus === 'accepted' && u.accepted > 0) ||
			(filterStatus === 'rejected' && u.rejected > 0)
		return matchSearch && matchFilter
	})

	if (loading) {
		return (
			<div className='admin-loading'>
				<span>Loading upload requests...</span>
			</div>
		)
	}

	return (
		<>
			<div className='admin-page-heading'>
				<h1>Upload Requests</h1>
				<span className='count'>{users.length}</span>
			</div>

			<p className='uploads-subtitle'>
				Click on a student card to review their screenshot submissions.
			</p>

			<div className='uploads-toolbar'>
				<div className='admin-search-bar' style={{ marginTop: 0, flex: 1 }}>
					<BiSearch size={18} />
					<input
						type='text'
						placeholder='Search by name, email or college...'
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className='admin-search-input'
					/>
					{searchQuery && (
						<span className='admin-search-count'>
							{filteredUsers.length} of {users.length} results
						</span>
					)}
				</div>

				<div className='uploads-filter-tabs'>
					{['all', 'pending', 'accepted', 'rejected'].map((f) => (
						<button
							key={f}
							className={`uploads-filter-tab ${filterStatus === f ? 'active' : ''}`}
							onClick={() => setFilterStatus(f)}
						>
							{f.charAt(0).toUpperCase() + f.slice(1)}
						</button>
					))}
				</div>
			</div>

			{filteredUsers.length === 0 ? (
				<div className='admin-empty-state'>
					<BiImage size={48} />
					<p>No upload requests found</p>
				</div>
			) : (
				<div className='uploads-user-grid'>
					{filteredUsers.map((user) => (
						<div
							key={user.name}
							className='uploads-user-card'
							onClick={() => router.push(`/admin/uploads/${encodeURIComponent(user.name)}`)}
						>
							<div className='uploads-user-avatar'>{user.name.charAt(0).toUpperCase()}</div>
							<div className='uploads-user-info'>
								<div className='uploads-user-name'>{user.name}</div>
							</div>
							<div className='uploads-user-stats'>
								<div className='uploads-stat'>
									<BiImage size={14} />
									<span>{user.totalUploads} total</span>
								</div>
								<div className='uploads-badges'>
									{user.pending > 0 && (
										<span className='uploads-badge pending'>
											<BiTime size={12} />
											{user.pending} pending
										</span>
									)}
									{user.accepted > 0 && (
										<span className='uploads-badge accepted'>
											<BiCheckCircle size={12} />
											{user.accepted} accepted
										</span>
									)}
									{user.rejected > 0 && (
										<span className='uploads-badge rejected'>
											<BiXCircle size={12} />
											{user.rejected} rejected
										</span>
									)}
								</div>
							</div>
							<div className='uploads-user-arrow'>›</div>
						</div>
					))}
				</div>
			)}
		</>
	)
}
