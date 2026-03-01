import { useState } from 'react'
import { useRouter } from 'next/router'
import { BiSearch, BiDownload } from 'react-icons/bi'

const FAKE_DATA = {
	overview: [
		{
			userId: '1',
			name: 'Arun Kumar',
			email: 'arun@example.com',
			phoneNo: '9876543210',
			gPayNumber: '9876543210',
			collegeName: 'NIT Calicut',
			district: 'Malappuram',
			referralCode: 'ARUN2025',
			updatedAt: '2025-01-15T10:30:00Z',
		},
		{
			userId: '2',
			name: 'Meera Nair',
			email: 'meera@example.com',
			phoneNo: '9845123456',
			gPayNumber: '9845123456',
			collegeName: 'College of Engineering Trivandrum',
			district: 'Thiruvananthapuram',
			referralCode: 'MEERA2025',
			updatedAt: '2025-01-16T09:15:00Z',
		},
		{
			userId: '3',
			name: 'Rahul Menon',
			email: 'rahul@example.com',
			phoneNo: '9812345678',
			gPayNumber: '9812345678',
			collegeName: 'Model Engineering College',
			district: 'Ernakulam',
			referralCode: 'RAHUL2025',
			updatedAt: '2025-01-17T14:45:00Z',
		},
		{
			userId: '4',
			name: 'Anjali Raj',
			email: 'anjali@example.com',
			phoneNo: '9765432100',
			gPayNumber: '9765432100',
			collegeName: 'CUSAT',
			district: 'Ernakulam',
			referralCode: 'ANJALI2025',
			updatedAt: '2025-01-18T11:00:00Z',
		},
		{
			userId: '5',
			name: 'Vishnu Das',
			email: 'vishnu@example.com',
			phoneNo: '9745678901',
			gPayNumber: '9745678901',
			collegeName: 'GEC Thrissur',
			district: 'Thrissur',
			referralCode: 'VISHNU2025',
			updatedAt: '2025-01-19T08:30:00Z',
		},
	],
	referrals: [
		{
			userId: '1',
			name: 'Sneha Suresh',
			email: 'sneha@example.com',
			phoneNo: '9698765432',
			gPayNumber: '9698765432',
			collegeName: 'MES College of Engineering',
			district: 'Malappuram',
			referralCode: 'SNEHA2025',
			updatedAt: '2025-01-24T15:40:00Z',
		},
		{
			userId: '2',
			name: 'Arjun Pillai',
			email: 'arjun@example.com',
			phoneNo: '9701234567',
			gPayNumber: '9701234567',
			collegeName: 'Govt. Engineering College Barton Hill',
			district: 'Thiruvananthapuram',
			referralCode: 'ARJUN2025',
			updatedAt: '2025-01-23T13:25:00Z',
		},
		{
			userId: '3',
			name: 'Devika Krishnan',
			email: 'devika@example.com',
			phoneNo: '9712345678',
			gPayNumber: '9712345678',
			collegeName: 'NSS College of Engineering',
			district: 'Palakkad',
			referralCode: 'DEVIKA2025',
			updatedAt: '2025-01-22T10:05:00Z',
		},
		{
			userId: '4',
			name: 'Siddharth P',
			email: 'siddharth@example.com',
			phoneNo: '9723456789',
			gPayNumber: '9723456789',
			collegeName: 'Rajagiri School of Engineering',
			district: 'Ernakulam',
			referralCode: 'SIDD2025',
			updatedAt: '2025-01-21T12:10:00Z',
		},
		{
			userId: '5',
			name: 'Lakshmi S',
			email: 'lakshmi@example.com',
			phoneNo: '9734567890',
			gPayNumber: '9734567890',
			collegeName: 'TKM College of Engineering',
			district: 'Kollam',
			referralCode: 'LAKSHMI2025',
			updatedAt: '2025-01-20T16:20:00Z',
		},
	],
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
	const users = FAKE_DATA[dataKey] || []
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

	function handleDownload() {
		const headers = [
			'#',
			'Name',
			'Email',
			'Phone',
			'GPay No.',
			'College',
			'District',
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
			user.referralCode || '--',
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

	return (
		<>
			<div className='admin-page-heading'>
				<h1>{title}</h1>
				<span className='count'>{users.length}</span>
			</div>

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
							{filteredUsers.length} of {users.length} results
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
							<th>Registered On</th>
							<th>&nbsp;</th>
						</tr>
					</thead>
					<tbody>
						{filteredUsers.length > 0 ? (
							filteredUsers.map((user, index) => (
								<tr key={user.userId}>
									<td>{index + 1}</td>
									<td className='name-cell'>{user.name || '--'}</td>
									<td>{user.email || '--'}</td>
									<td>{user.phoneNo || '--'}</td>
									<td>{user.gPayNumber || '--'}</td>
									<td>{user.collegeName || '--'}</td>
									<td>{user.district || '--'}</td>
									<td>{user.referralCode || '--'}</td>
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

// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/router'
// import { useUserContext } from 'context/UserContext'
// import axios from 'axios'
// import { BiSearch, BiDownload } from 'react-icons/bi'

// const API_ENDPOINTS = {
// 	overview: '/api/admin/get-ca?verified=true',
// 	referrals: '/api/admin/get-referrals',
// }

// function formatDate(dateStr) {
// 	if (!dateStr) return '--'
// 	const d = new Date(dateStr)
// 	return d.toLocaleDateString('en-IN', {
// 		day: 'numeric',
// 		month: 'short',
// 		year: 'numeric',
// 		hour: '2-digit',
// 		minute: '2-digit',
// 	})
// }

// export default function AdminTable({ title, dataKey, csvName }) {
// 	const router = useRouter()
// 	const { jwt } = useUserContext()

// 	const [loading, setLoading] = useState(true)
// 	const [users, setUsers] = useState([])
// 	const [total, setTotal] = useState(0)
// 	const [error, setError] = useState(null)
// 	const [searchQuery, setSearchQuery] = useState('')

// 	const filteredUsers = users.filter((user) => {
// 		if (!searchQuery.trim()) return true
// 		const q = searchQuery.toLowerCase()
// 		return (
// 			(user.name || '').toLowerCase().includes(q) ||
// 			(user.email || '').toLowerCase().includes(q) ||
// 			(user.phoneNo || '').toLowerCase().includes(q) ||
// 			(user.gPayNumber || '').toLowerCase().includes(q) ||
// 			(user.collegeName || '').toLowerCase().includes(q) ||
// 			(user.district || '').toLowerCase().includes(q) ||
// 			(user.referralCode || '').toLowerCase().includes(q)
// 		)
// 	})

// 	useEffect(() => {
// 		if (!jwt) return
// 		fetchUsers()
// 	}, [jwt])

// 	async function fetchUsers() {
// 		setLoading(true)
// 		setError(null)
// 		try {
// 			const { data } = await axios.post(
// 				API_ENDPOINTS[dataKey],
// 				{},
// 				{ headers: { Authorization: `Bearer ${jwt}` } }
// 			)
// 			const list = Array.isArray(data) ? data : (data.users || data.data || [])
// 			setUsers(list)
// 			setTotal(list.length)
// 		} catch (err) {
// 			console.error('Failed to fetch:', err)
// 			setError('Failed to fetch data')
// 		}
// 		setLoading(false)
// 	}

// 	function handleDownload() {
// 		const headers = ['#', 'Name', 'Email', 'Phone', 'GPay No.', 'College', 'District', 'Referral Code', 'Registered On']
// 		const rows = filteredUsers.map((user, index) => [
// 			index + 1,
// 			user.name || '--',
// 			user.email || '--',
// 			user.phoneNo || '--',
// 			user.gPayNumber || '--',
// 			user.collegeName || '--',
// 			user.district || '--',
// 			user.referralCode || '--',
// 			formatDate(user.updatedAt),
// 		])
// 		const csv = [headers, ...rows].map((row) => row.join(',')).join('\n')
// 		const blob = new Blob([csv], { type: 'text/csv' })
// 		const url = URL.createObjectURL(blob)
// 		const a = document.createElement('a')
// 		a.href = url
// 		a.download = csvName || 'data.csv'
// 		a.click()
// 		URL.revokeObjectURL(url)
// 	}

// 	if (loading) {
// 		return (
// 			<div className='admin-loading'>
// 				<span>Loading {title}...</span>
// 			</div>
// 		)
// 	}

// 	return (
// 		<>
// 			<div className='admin-page-heading'>
// 				<h1>{title}</h1>
// 				<span className='count'>{total}</span>
// 			</div>

// 			{error && <p className='admin-error-text'>{error}</p>}

// 			<div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '20px' }}>
// 				<div className='admin-search-bar' style={{ marginTop: 0, flex: 1 }}>
// 					<BiSearch size={18} />
// 					<input
// 						type='text'
// 						placeholder='Search by name, email, phone, college or district...'
// 						value={searchQuery}
// 						onChange={(e) => setSearchQuery(e.target.value)}
// 						className='admin-search-input'
// 					/>
// 					{searchQuery && (
// 						<span className='admin-search-count'>
// 							{filteredUsers.length} of {total} results
// 						</span>
// 					)}
// 				</div>
// 				<button className='admin-download-btn' onClick={handleDownload}>
// 					<BiDownload size={18} />
// 					Download
// 				</button>
// 			</div>

// 			<div className='admin-table-container'>
// 				<table className='admin-table'>
// 					<thead>
// 						<tr>
// 							<th>#</th>
// 							<th>Name</th>
// 							<th>Email</th>
// 							<th>Phone</th>
// 							<th>GPay No.</th>
// 							<th>College</th>
// 							<th>District</th>
// 							<th>Referral Code</th>
// 							<th>Registered On</th>
// 							<th>&nbsp;</th>
// 						</tr>
// 					</thead>
// 					<tbody>
// 						{filteredUsers.length > 0 ? (
// 							filteredUsers.map((user, index) => (
// 								<tr key={user.userId || index}>
// 									<td>{index + 1}</td>
// 									<td className='name-cell'>{user.name || '--'}</td>
// 									<td>{user.email || '--'}</td>
// 									<td>{user.phoneNo || '--'}</td>
// 									<td>{user.gPayNumber || '--'}</td>
// 									<td>{user.collegeName || '--'}</td>
// 									<td>{user.district || '--'}</td>
// 									<td>{user.referralCode || '--'}</td>
// 									<td>{formatDate(user.updatedAt)}</td>
// 									<td>
// 										<button
// 											translate='no'
// 											onClick={() => router.push(`/admin/referrals/${user.phoneNo}`)}
// 											style={{
// 												backgroundColor: '#2563eb',
// 												color: '#fff',
// 												border: 'none',
// 												borderRadius: '6px',
// 												padding: '6px 14px',
// 												cursor: 'pointer',
// 												fontSize: '13px',
// 												fontWeight: '500',
// 											}}
// 										>
// 											→
// 										</button>
// 									</td>
// 								</tr>
// 							))
// 						) : (
// 							<tr>
// 								<td colSpan={10} className='admin-empty-row'>
// 									No results found
// 								</td>
// 							</tr>
// 						)}
// 					</tbody>
// 				</table>
// 			</div>
// 		</>
// 	)
// }
