import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useUserContext } from 'context/UserContext'
import { BiSearch, BiImage, BiCheckCircle, BiXCircle, BiTime } from 'react-icons/bi'
import { FaWhatsapp, FaInstagram } from 'react-icons/fa'

//! FAKE DATA - replace with real API call
const FAKE_UPLOAD_USERS = [
	{
		userId: 1,
		name: 'Alice Johnson',
		college: 'NIT Calicut',
		email: 'alice@example.com',
		totalUploads: 5,
		pending: 3,
		accepted: 2,
		rejected: 0,
	},
	{
		userId: 2,
		name: 'Bob Smith',
		college: 'IIT Bombay',
		email: 'bob@example.com',
		totalUploads: 8,
		pending: 5,
		accepted: 2,
		rejected: 1,
	},
	{
		userId: 3,
		name: 'Carol White',
		college: 'BITS Pilani',
		email: 'carol@example.com',
		totalUploads: 3,
		pending: 0,
		accepted: 3,
		rejected: 0,
	},
	{
		userId: 4,
		name: 'David Lee',
		college: 'VIT Vellore',
		email: 'david@example.com',
		totalUploads: 6,
		pending: 2,
		accepted: 3,
		rejected: 1,
	},
	{
		userId: 5,
		name: 'Eva Green',
		college: 'Amrita Coimbatore',
		email: 'eva@example.com',
		totalUploads: 4,
		pending: 4,
		accepted: 0,
		rejected: 0,
	},
	{
		userId: 6,
		name: 'Frank Torres',
		college: 'SRM Chennai',
		email: 'frank@example.com',
		totalUploads: 7,
		pending: 1,
		accepted: 5,
		rejected: 1,
	},
] //!

export default function UploadsPage() {
	const router = useRouter()
	const { jwt } = useUserContext()
	const [loading, setLoading] = useState(true)
	const [users, setUsers] = useState([])
	const [searchQuery, setSearchQuery] = useState('')
	const [filterStatus, setFilterStatus] = useState('all')

	useEffect(() => {
		fetchUploads()
	}, [jwt])

	async function fetchUploads() {
		setLoading(true)
		//! FAKE DATA - replace with real axios call to backend
		setTimeout(() => {
			setUsers(FAKE_UPLOAD_USERS)
			setLoading(false)
		}, 400)
		/*
		try {
			const { data } = await axios.get('/api/admin/uploads', {
				headers: { Authorization: `Bearer ${jwt}` },
			})
			setUsers(data.users || data || [])
		} catch (err) {
			console.error('Failed to fetch upload users:', err)
		}
		setLoading(false)
		*/
	}

	const filteredUsers = users.filter((u) => {
		const matchSearch =
			!searchQuery.trim() ||
			u.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
			u.college.toLowerCase().includes(searchQuery.toLowerCase()) ||
			u.email.toLowerCase().includes(searchQuery.toLowerCase())

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
							key={user.userId}
							className='uploads-user-card'
							onClick={() => router.push(`/admin/uploads/${user.userId}`)}
						>
							<div className='uploads-user-avatar'>{user.name.charAt(0).toUpperCase()}</div>
							<div className='uploads-user-info'>
								<div className='uploads-user-name'>{user.name}</div>
								<div className='uploads-user-college'>{user.college}</div>
								<div className='uploads-user-email'>{user.email}</div>
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
