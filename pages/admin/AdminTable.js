import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useUserContext } from 'context/UserContext'
import axios from 'axios'
import { BiSearch, BiDownload } from 'react-icons/bi'

const API_ENDPOINTS = {
	overview: '/api/admin/get-ca?verified=true',
	referrals: '/api/admin/get-referrals',
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

export default function AdminTable({ title, dataKey, csvName }) {
	const router = useRouter()
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
			(user.phoneNo || '').toLowerCase().includes(q) ||
			(user.gPayNumber || '').toLowerCase().includes(q) ||
			(user.collegeName || '').toLowerCase().includes(q) ||
			(user.district || '').toLowerCase().includes(q) ||
			(user.referralCode || '').toLowerCase().includes(q)
		)
	})

	useEffect(() => {
		if (!jwt) return
		fetchUsers()
	}, [jwt, dataKey])

	async function fetchUsers() {
		setLoading(true)
		setError(null)
		try {
			const url = API_ENDPOINTS[dataKey]
			const config = {
				headers: { Authorization: `Bearer ${jwt}` },
			}

			let response
			if (dataKey === 'referrals') {
				response = await axios.get(url, config)
			} else {
				response = await axios.post(url, {}, config)
			}

			const { data } = response
			const list = Array.isArray(data) ? data : data.users || data.data || []
			setUsers(list)
			setTotal(list.length)
		} catch (err) {
			console.error('Failed to fetch:', err)
			setError('Failed to fetch data. Session might be expired.')
		}
		setLoading(false)
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
			'Referrals Yet To Pay', 
			'Referral Code',
			'Registered On',
		]
		const rows = filteredUsers.map((user, index) => [
			index + 1,
			user.name || '--',
			user.email || '--',
			user.phoneNo || '--',
			user.gPayNumber || '--',
			user.collegeName || '--',
			user.district || '--',
			user._count.referrals || 0,
			user.phoneNo || '--',
			formatDate(user.updatedAt),
		])
		const csv = [headers, ...rows].map((row) => row.join(',')).join('\n')
		const blob = new Blob([csv], { type: 'text/csv' })
		const url = URL.createObjectURL(blob)
		const a = document.createElement('a')
		a.href = url
		a.download = csvName || 'data.csv'
		a.click()
		URL.revokeObjectURL(url)
	}

	if (loading) {
		return (
			<div className='admin-loading'>
				<span>Loading {title}...</span>
			</div>
		)
	}

	return (
		<>
			<div className='admin-page-heading'>
				<h1>{title}</h1>
				<span className='count'>{total}</span>
			</div>

			{error && (
				<p className='admin-error-text' style={{ color: '#ef4444' }}>
					{error}
				</p>
			)}

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
							<th>Referral Code</th>
							<th>Referrals Yet To Pay</th>
							<th>Registered On</th>
							<th>&nbsp;</th>
						</tr>
					</thead>
					<tbody>
						{filteredUsers.length > 0 ? (
							filteredUsers.map((user, index) => (
								<tr key={user.userId || index}>
									<td>{index + 1}</td>
									<td className='name-cell'>{user.name || '--'}</td>
									<td>{user.email || '--'}</td>
									<td>{user.phoneNo || '--'}</td>
									<td>{user.gPayNumber || '--'}</td>
									<td>{user.collegeName || '--'}</td>
									<td>{user.district || '--'}</td>
									<td>{user.phoneNo || '--'}</td>
									<td>{user._count.referrals || 0}</td>
									<td>{formatDate(user.updatedAt)}</td>
									<td>
										<button
											translate='no'
											onClick={() => router.push(`/admin/referrals/${user.phoneNo}`)}
											style={{
												backgroundColor: '#2563eb',
												color: '#fff',
												border: 'none',
												borderRadius: '6px',
												padding: '6px 14px',
												cursor: 'pointer',
												fontSize: '13px',
												fontWeight: '500',
											}}
										>
											→
										</button>
									</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan={10} className='admin-empty-row'>
									No results found
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</>
	)
}
