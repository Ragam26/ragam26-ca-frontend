import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { BiChevronLeft } from 'react-icons/bi'
import AdminLayout from 'components/admin/AdminLayout'

// ─── FAKE VERSION ─────────────────────────────────────────────────────────────
const FAKE_REFERRALS = {
	9876543210: [
		{
			referralId: 1,
			name: 'Adarsh C.R',
			collegeName: 'Adi Shankara Institute of Engineering and Technology',
			eventName: 'default',
			isPaid: false,
			registeredAt: '2026-03-01T03:12:52.433Z',
		},
		{
			referralId: 2,
			name: 'Abhinav CK',
			collegeName: 'Malabar Institute of Technology',
			eventName: 'default',
			isPaid: true,
			registeredAt: '2026-03-01T03:12:52.433Z',
		},
	],
	9845123456: [
		{
			referralId: 3,
			name: 'Siddharth Madhavan',
			collegeName: 'NIT Calicut',
			eventName: 'default',
			isPaid: true,
			registeredAt: '2026-03-01T03:12:52.433Z',
		},
		{
			referralId: 4,
			name: 'Riya Thomas',
			collegeName: 'CUSAT',
			eventName: 'default',
			isPaid: false,
			registeredAt: '2026-03-01T03:12:52.433Z',
		},
	],
	9812345678: [
		{
			referralId: 5,
			name: 'Amina Faris',
			collegeName: 'GEC Thrissur',
			eventName: 'default',
			isPaid: false,
			registeredAt: '2026-03-01T03:12:52.433Z',
		},
	],
	9765432100: [
		{
			referralId: 6,
			name: 'Kiran Raj',
			collegeName: 'TKM College of Engineering',
			eventName: 'default',
			isPaid: true,
			registeredAt: '2026-03-01T03:12:52.433Z',
		},
		{
			referralId: 7,
			name: 'Nisha P',
			collegeName: 'NSS College of Engineering',
			eventName: 'default',
			isPaid: false,
			registeredAt: '2026-03-01T03:12:52.433Z',
		},
		{
			referralId: 8,
			name: 'Joel Mathew',
			collegeName: 'Rajagiri School of Engineering',
			eventName: 'default',
			isPaid: true,
			registeredAt: '2026-03-01T03:12:52.433Z',
		},
	],
	9745678901: [
		{
			referralId: 9,
			name: 'Fathima K',
			collegeName: 'MES College of Engineering',
			eventName: 'default',
			isPaid: false,
			registeredAt: '2026-03-01T03:12:52.433Z',
		},
	],
	9698765432: [
		{
			referralId: 10,
			name: 'Rohan Das',
			collegeName: 'Model Engineering College',
			eventName: 'default',
			isPaid: true,
			registeredAt: '2026-03-01T03:12:52.433Z',
		},
	],
	9701234567: [
		{
			referralId: 11,
			name: 'Sreya Nair',
			collegeName: 'College of Engineering Trivandrum',
			eventName: 'default',
			isPaid: false,
			registeredAt: '2026-03-01T03:12:52.433Z',
		},
		{
			referralId: 12,
			name: 'Akash M',
			collegeName: 'NIT Calicut',
			eventName: 'default',
			isPaid: true,
			registeredAt: '2026-03-01T03:12:52.433Z',
		},
	],
	9712345678: [],
	9723456789: [
		{
			referralId: 13,
			name: 'Divya S',
			collegeName: 'CUSAT',
			eventName: 'default',
			isPaid: false,
			registeredAt: '2026-03-01T03:12:52.433Z',
		},
	],
	9734567890: [
		{
			referralId: 14,
			name: 'Midhun P',
			collegeName: 'GEC Thrissur',
			eventName: 'default',
			isPaid: true,
			registeredAt: '2026-03-01T03:12:52.433Z',
		},
		{
			referralId: 15,
			name: 'Anjana K',
			collegeName: 'TKM College of Engineering',
			eventName: 'default',
			isPaid: false,
			registeredAt: '2026-03-01T03:12:52.433Z',
		},
	],
}

function PaidButton({ referralId, initialPaid }) {
	const [isPaid, setIsPaid] = useState(initialPaid)
	const [showConfirm, setShowConfirm] = useState(false)

	function handleConfirm() {
		setIsPaid(true)
		setShowConfirm(false)
		// TODO: call API to mark as paid
	}

	return (
		<>
			{isPaid ? (
				<button
					disabled
					style={{
						backgroundColor: '#16a34a',
						color: '#fff',
						border: 'none',
						borderRadius: '6px',
						padding: '5px 12px',
						fontSize: '12px',
						fontWeight: '600',
						cursor: 'not-allowed',
						opacity: 0.85,
					}}
				>
					Paid
				</button>
			) : (
				<button
					onClick={() => setShowConfirm(true)}
					style={{
						backgroundColor: '#f59e0b',
						color: '#fff',
						border: 'none',
						borderRadius: '6px',
						padding: '5px 12px',
						fontSize: '12px',
						fontWeight: '600',
						cursor: 'pointer',
					}}
				>
					Mark as Paid
				</button>
			)}

			{showConfirm && (
				<div
					style={{
						position: 'fixed',
						inset: 0,
						backgroundColor: 'rgba(0,0,0,0.5)',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						zIndex: 1000,
					}}
				>
					<div
						style={{
							background: '#1e1e2e',
							borderRadius: '12px',
							padding: '28px 32px',
							width: '320px',
							textAlign: 'center',
							boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
						}}
					>
						<p style={{ marginBottom: '20px', fontSize: '15px', color: '#e2e8f0' }}>
							Mark this referral as paid?
						</p>
						<div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
							<button
								onClick={() => setShowConfirm(false)}
								style={{
									padding: '8px 20px',
									borderRadius: '6px',
									border: '1px solid #4a5568',
									background: 'transparent',
									color: '#e2e8f0',
									cursor: 'pointer',
									fontSize: '14px',
								}}
							>
								Cancel
							</button>
							<button
								onClick={handleConfirm}
								style={{
									padding: '8px 20px',
									borderRadius: '6px',
									border: 'none',
									background: '#16a34a',
									color: '#fff',
									cursor: 'pointer',
									fontSize: '14px',
									fontWeight: '600',
								}}
							>
								Confirm
							</button>
						</div>
					</div>
				</div>
			)}
		</>
	)
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

export default function ReferralDetail() {
	const router = useRouter()
	const { phoneNo } = router.query
	const [referrals, setReferrals] = useState([])
	const [loading, setLoading] = useState(true)

	useEffect(() => {
		if (!router.isReady || !phoneNo) return
		setReferrals(FAKE_REFERRALS[phoneNo] || [])
		setLoading(false)
	}, [router.isReady, phoneNo])

	if (loading) {
		return (
			<AdminLayout>
				<div className='admin-loading'>
					<span>Loading referrals...</span>
				</div>
			</AdminLayout>
		)
	}

	return (
		<AdminLayout>
			<div
				className='admin-page-heading'
				style={{ display: 'flex', alignItems: 'center', gap: '12px' }}
			>
				<button
					onClick={() => router.back()}
					style={{
						background: 'none',
						border: 'none',
						cursor: 'pointer',
						display: 'flex',
						alignItems: 'center',
						padding: '4px',
						color: 'inherit',
					}}
				>
					<BiChevronLeft size={24} />
				</button>
				<h1>Referrals for {phoneNo}</h1>
				<span className='count'>{referrals.length}</span>
			</div>

			<div className='admin-table-container' style={{ marginTop: '20px' }}>
				<table className='admin-table'>
					<thead>
						<tr>
							<th>#</th>
							<th>Name</th>
							<th>College</th>
							<th>Event</th>
							<th>Status</th>
							<th>Registered On</th>
						</tr>
					</thead>
					<tbody>
						{referrals.length > 0 ? (
							referrals.map((r, index) => (
								<tr key={r.referralId || index}>
									<td>{index + 1}</td>
									<td className='name-cell'>{r.name || '--'}</td>
									<td>{r.collegeName || '--'}</td>
									<td>{r.eventName || '--'}</td>
									<td>
										<PaidButton referralId={r.referralId} initialPaid={r.isPaid} />
									</td>
									<td>{formatDate(r.registeredAt)}</td>
								</tr>
							))
						) : (
							<tr>
								<td colSpan={6} className='admin-empty-row'>
									No referrals found
								</td>
							</tr>
						)}
					</tbody>
				</table>
			</div>
		</AdminLayout>
	)
}

// ─── REAL VERSION (comment out fake above, uncomment this) ────────────────────
// import { useEffect, useState } from 'react'
// import { useRouter } from 'next/router'
// import { useUserContext } from 'context/UserContext'
// import axios from 'axios'
// import { BiChevronLeft } from 'react-icons/bi'
// import AdminLayout from 'components/AdminLayout'
//
// function PaidButton({ referralId, initialPaid }) {
// 	const [isPaid, setIsPaid] = useState(initialPaid)
// 	const [showConfirm, setShowConfirm] = useState(false)
//
// 	async function handleConfirm() {
// 		try {
// 			await axios.post(`/api/admin/mark-paid/${referralId}`, {}, {
// 				headers: { Authorization: `Bearer ${jwt}` },
// 			})
// 			setIsPaid(true)
// 		} catch (err) {
// 			console.error('Failed to mark as paid:', err)
// 		}
// 		setShowConfirm(false)
// 	}
//
// 	return (
// 		<>
// 			{isPaid ? (
// 				<button disabled style={{
// 					backgroundColor: '#16a34a', color: '#fff', border: 'none',
// 					borderRadius: '6px', padding: '5px 12px', fontSize: '12px',
// 					fontWeight: '600', cursor: 'not-allowed', opacity: 0.85,
// 				}}>
// 					Paid
// 				</button>
// 			) : (
// 				<button onClick={() => setShowConfirm(true)} style={{
// 					backgroundColor: '#f59e0b', color: '#fff', border: 'none',
// 					borderRadius: '6px', padding: '5px 12px', fontSize: '12px',
// 					fontWeight: '600', cursor: 'pointer',
// 				}}>
// 					Mark as Paid
// 				</button>
// 			)}
// 			{showConfirm && (
// 				<div style={{
// 					position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.5)',
// 					display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000,
// 				}}>
// 					<div style={{
// 						background: '#1e1e2e', borderRadius: '12px', padding: '28px 32px',
// 						width: '320px', textAlign: 'center', boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
// 					}}>
// 						<p style={{ marginBottom: '20px', fontSize: '15px', color: '#e2e8f0' }}>
// 							Mark this referral as paid?
// 						</p>
// 						<div style={{ display: 'flex', gap: '12px', justifyContent: 'center' }}>
// 							<button onClick={() => setShowConfirm(false)} style={{
// 								padding: '8px 20px', borderRadius: '6px', border: '1px solid #4a5568',
// 								background: 'transparent', color: '#e2e8f0', cursor: 'pointer', fontSize: '14px',
// 							}}>
// 								Cancel
// 							</button>
// 							<button onClick={handleConfirm} style={{
// 								padding: '8px 20px', borderRadius: '6px', border: 'none',
// 								background: '#16a34a', color: '#fff', cursor: 'pointer',
// 								fontSize: '14px', fontWeight: '600',
// 							}}>
// 								Confirm
// 							</button>
// 						</div>
// 					</div>
// 				</div>
// 			)}
// 		</>
// 	)
// }
//
// function formatDate(dateStr) {
// 	if (!dateStr) return '--'
// 	const d = new Date(dateStr)
// 	return d.toLocaleDateString('en-IN', {
// 		day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit',
// 	})
// }
//
// export default function ReferralDetail() {
// 	const router = useRouter()
// 	const { phoneNo } = router.query
// 	const { jwt } = useUserContext()
// 	const [referrals, setReferrals] = useState([])
// 	const [loading, setLoading] = useState(true)
// 	const [error, setError] = useState(null)
//
// 	useEffect(() => {
// 		if (!router.isReady || !phoneNo || !jwt) return
// 		fetchReferrals()
// 	}, [router.isReady, phoneNo, jwt])
//
// 	async function fetchReferrals() {
// 		setLoading(true)
// 		setError(null)
// 		try {
// 			const { data } = await axios.get(`/api/admin/get-referrals/${phoneNo}`, {
// 				headers: { Authorization: `Bearer ${jwt}` },
// 			})
// 			const list = Array.isArray(data) ? data : (data.referrals || data.data || [])
// 			setReferrals(list)
// 		} catch (err) {
// 			console.error('Failed to fetch referrals:', err)
// 			setError('Failed to fetch referrals')
// 		}
// 		setLoading(false)
// 	}
//
// 	if (loading) {
// 		return <AdminLayout><div className='admin-loading'><span>Loading referrals...</span></div></AdminLayout>
// 	}
//
// 	return (
// 		<AdminLayout>
// 			<div className='admin-page-heading' style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
// 				<button
// 					onClick={() => router.back()}
// 					style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', padding: '4px', color: 'inherit' }}
// 				>
// 					<BiChevronLeft size={24} />
// 				</button>
// 				<h1>Referrals for {phoneNo}</h1>
// 				<span className='count'>{referrals.length}</span>
// 			</div>
//
// 			{error && <p className='admin-error-text'>{error}</p>}
//
// 			<div className='admin-table-container' style={{ marginTop: '20px' }}>
// 				<table className='admin-table'>
// 					<thead>
// 						<tr>
// 							<th>#</th>
// 							<th>Name</th>
// 							<th>College</th>
// 							<th>Event</th>
// 							<th>Status</th>
// 							<th>Registered On</th>
// 						</tr>
// 					</thead>
// 					<tbody>
// 						{referrals.length > 0 ? (
// 							referrals.map((r, index) => (
// 								<tr key={r.referralId || index}>
// 									<td>{index + 1}</td>
// 									<td className='name-cell'>{r.name || '--'}</td>
// 									<td>{r.collegeName || '--'}</td>
// 									<td>{r.eventName || '--'}</td>
// 									<td>
// 										<PaidButton referralId={r.referralId} initialPaid={r.isPaid} />
// 									</td>
// 									<td>{formatDate(r.registeredAt)}</td>
// 								</tr>
// 							))
// 						) : (
// 							<tr>
// 								<td colSpan={6} className='admin-empty-row'>No referrals found</td>
// 							</tr>
// 						)}
// 					</tbody>
// 				</table>
// 			</div>
// 		</AdminLayout>
// 	)
// }
