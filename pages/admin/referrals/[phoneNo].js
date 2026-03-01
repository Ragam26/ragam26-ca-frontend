import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useUserContext } from 'context/UserContext'
import axios from 'axios'
import { BiChevronLeft } from 'react-icons/bi'
import AdminLayout from 'components/admin/AdminLayout'

function CAProfileCard({ ca }) {
	return (
		<div
			style={{
				background: '#1e1e2e',
				borderRadius: '12px',
				padding: '20px 24px',
				marginTop: '12px',
				display: 'grid',
				gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
				gap: '16px',
				border: '1px solid #2d2d3f',
			}}
		>
			<CAField label='Name' value={ca.name} />
			<CAField label='Email' value={ca.email} />
			<CAField label='Phone' value={ca.phoneNo} />
			<CAField label='College' value={ca.collegeName} />
			<CAField label='District' value={ca.district} />
			<CAField label='Referral Code' value={ca.referralCode} />
			<CAField label='GPay No.' value={ca.gPayNumber} />
			<CAField label='Role' value={ca.role} />
			<CAField label='Profile Complete' value={ca.isProfileComplete ? 'Yes' : 'No'} />
		</div>
	)
}

function CAField({ label, value }) {
	return (
		<div>
			<div
				style={{
					fontSize: '11px',
					color: '#6b7280',
					marginBottom: '2px',
					textTransform: 'uppercase',
					letterSpacing: '0.05em',
				}}
			>
				{label}
			</div>
			<div style={{ fontSize: '14px', color: '#e2e8f0', fontWeight: '500' }}>{value || '--'}</div>
		</div>
	)
}

function PaidButton({ referralId, initialPaid, jwt }) {
	const [isPaid, setIsPaid] = useState(initialPaid)
	const [showConfirm, setShowConfirm] = useState(false)

	async function handleConfirm() {
		try {
			await axios.post(
				'/api/admin/update-referral',
				{ referral_id: referralId },
				{
					headers: { Authorization: `Bearer ${jwt}` },
				}
			)
			setIsPaid(true)
		} catch (err) {
			console.error('Failed to mark as paid:', err)
		}
		setShowConfirm(false)
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
	const { jwt } = useUserContext()
	const [referrals, setReferrals] = useState([])
	const [caProfile, setCaProfile] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)

	useEffect(() => {
		if (!phoneNo || !jwt) return
		fetchReferrals()
	}, [phoneNo, jwt])

	async function fetchReferrals() {
		setLoading(true)
		setError(null)
		try {
			const { data } = await axios.get(`/api/admin/get-referrals/${phoneNo}`, {
				headers: { Authorization: `Bearer ${jwt}` },
			})
			const list = Array.isArray(data) ? data : data.referrals || data.data || []
			setReferrals(list)
			if (list.length > 0 && list[0].user) {
				setCaProfile(list[0].user)
			}
		} catch (err) {
			console.error('Failed to fetch referrals:', err)
			setError('Failed to fetch referrals')
		}
		setLoading(false)
	}

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
				<h1>Referrals by {caProfile?.name || phoneNo}</h1>
				<span className='count'>{referrals.length}</span>
			</div>

			{error && <p className='admin-error-text'>{error}</p>}

			{caProfile && <CAProfileCard ca={caProfile} />}

			<div className='admin-table-container' style={{ marginTop: '12px' }}>
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
										<PaidButton referralId={r.referralId} initialPaid={r.isPaid} jwt={jwt} />
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
