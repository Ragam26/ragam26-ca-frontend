import { useEffect, useState } from 'react'
import { useUserContext } from 'context/UserContext'
import axios from 'axios'
import { BiSearch, BiDownload } from 'react-icons/bi'

export default function AdminOverview() {
	const { jwt } = useUserContext()

	const [loading, setLoading] = useState(true)
	const [users, setUsers] = useState([])
	const [total, setTotal] = useState(0)
	const [error, setError] = useState(null)
	const [searchQuery, setSearchQuery] = useState('')

	const filteredUsers = users.filter((user) => {
		if (!searchQuery.trim()) return true
		const q = searchQuery.toLowerCase()
		return (
			(user.name || '').toLowerCase().includes(q) ||
			(user.email || '').toLowerCase().includes(q) ||
			(user.phone || user.phoneNo || '').toLowerCase().includes(q) ||
			(user.gPayNumber || '').toLowerCase().includes(q) ||
			(user.college || user.collegeName || '').toLowerCase().includes(q) ||
			(user.district || '').toLowerCase().includes(q)
		)
	})

	useEffect(() => {
		if (!jwt) return
		fetchUsers()
	}, [jwt])

	async function fetchUsers() {
		setLoading(true)
		setError(null)
		//! BYPASSING BACKEND - Using fake CA data
		setTimeout(() => {
			const fakeUsers = [
				{
					userId: 1,
					name: 'Alice Johnson',
					email: 'alice@example.com',
					phone: '9876543210',
					gPayNumber: '9876543210',
					college: 'NIT Calicut',
					district: 'Kozhikode',
					updatedAt: '2026-02-20T10:00:00Z',
					points: 120,
				}, //!
				{
					userId: 2,
					name: 'Bob Smith',
					email: 'bob@example.com',
					phone: '9123456780',
					gPayNumber: '9123456780',
					college: 'IIT Bombay',
					district: 'Mumbai',
					updatedAt: '2026-02-21T11:30:00Z',
					points: 85,
				}, //!
				{
					userId: 3,
					name: 'Carol White',
					email: 'carol@example.com',
					phone: '9988776655',
					gPayNumber: '9988776655',
					college: 'BITS Pilani',
					district: 'Pilani',
					updatedAt: '2026-02-22T09:15:00Z',
					points: 200,
				}, //!
				{
					userId: 4,
					name: 'David Lee',
					email: 'david@example.com',
					phone: '9871234560',
					gPayNumber: '9871234560',
					college: 'VIT Vellore',
					district: 'Vellore',
					updatedAt: '2026-02-23T14:45:00Z',
					points: 0,
				}, //!
				{
					userId: 5,
					name: 'Eva Green',
					email: 'eva@example.com',
					phone: '9765432100',
					gPayNumber: '9765432100',
					college: 'Amrita Coimbatore',
					district: 'Coimbatore',
					updatedAt: '2026-02-24T16:00:00Z',
					points: 55,
				}, //!
			]
			setUsers(fakeUsers)
			setTotal(fakeUsers.length)
			setLoading(false)
		}, 500) //! Simulated loading delay
		/*
		try {
			const { data } = await axios.post(
				'/api/admin/get-ca?verified=true',
				{},
				{ headers: { Authorization: `Bearer ${jwt}` } }
			)
			setUsers(data.users || data.data || data || [])
			setTotal(data.total || (data.users || data.data || data || []).length)
		} catch (err) {
			console.error('Failed to fetch users:', err)
			setError('Failed to fetch users')
		}
		setLoading(false)
		*/
	}

	function formatDate(dateStr) {
		if (!dateStr) return '--'
		const d = new Date(dateStr)
		return d.toLocaleDateString('en-IN', {
			day: 'numeric',
			month: 'short',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
		})
	}

	function handleDownload() {
		const headers = [
			'#',
			'Name',
			'Email',
			'Phone',
			'GPay No.',
			'College',
			'District',
			'Points',
			'Registered On',
		]
		const rows = filteredUsers.map((user, index) => [
			index + 1,
			user.name || '--',
			user.email || '--',
			user.phone || user.phoneNo || '--',
			user.gPayNumber || '--',
			user.college || user.collegeName || '--',
			user.district || '--',
			user.points ?? '--',
			formatDate(user.updatedAt),
		])

		const csv = [headers, ...rows].map((row) => row.join(',')).join('\n')
		const blob = new Blob([csv], { type: 'text/csv' })
		const url = URL.createObjectURL(blob)
		const a = document.createElement('a')
		a.href = url
		a.download = 'registered-cas.csv'
		a.click()
		URL.revokeObjectURL(url)
	}

	if (loading) {
		return (
			<div className='admin-loading'>
				<span>Loading registered CAs...</span>
			</div>
		)
	}

	return (
		<>
			<div className='admin-page-heading'>
				<h1>Registered CAs</h1>
				<span className='count'>{total}</span>
			</div>

			{error && <p className='admin-error-text'>{error}</p>}

			<div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '20px' }}>
				<div className='admin-search-bar' style={{ marginTop: 0, flex: 1 }}>
					<BiSearch size={18} />
					<input
						type='text'
						placeholder='Search by name, email, phone, college or district...'
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className='admin-search-input'
					/>
					{searchQuery && (
						<span className='admin-search-count'>
							{filteredUsers.length} of {total} results
						</span>
					)}
				</div>

				<button className='admin-download-btn' onClick={handleDownload}>
					<BiDownload size={18} />
					Download
				</button>
			</div>

			<div className='admin-table-container'>
				<table className='admin-table'>
					<thead>
						<tr>
							<th>#</th>
							<th>Name</th>
							<th>Email</th>
							<th>Phone</th>
							<th>GPay No.</th>
							<th>College</th>
							<th>District</th>
							<th>Points</th>
							<th>Registered On</th>
						</tr>
					</thead>
					<tbody>
						{filteredUsers.length > 0 ? (
							filteredUsers.map((user, index) => (
								<tr key={user.userId || index}>
									<td>{index + 1}</td>
									<td className='name-cell'>{user.name || '--'}</td>
									<td>{user.email || '--'}</td>
									<td>{user.phone || user.phoneNo || '--'}</td>
									<td>{user.gPayNumber || '--'}</td>
									<td>{user.college || user.collegeName || '--'}</td>
									<td>{user.district || '--'}</td>
									<td>
										<span className='admin-points-badge'>{user.points ?? '--'}</span>
									</td>
									<td>{formatDate(user.updatedAt)}</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan={9} className='admin-empty-row'>
									No users found
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</>
	)
}
