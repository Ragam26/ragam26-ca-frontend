import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUserContext } from 'context/UserContext'

export default function Dashboard() {
	const router = useRouter()
	const { user, isLoggedIn, sectionsConfig } = useUserContext()

	useEffect(() => {
		if (!isLoggedIn) {
			router.push('/')
			return
		}

		// Redirect to the first available section
		if (sectionsConfig?.posters) {
			router.push('/dashboard/posters')
		} else if (sectionsConfig?.feedback) {
			router.push('/dashboard/feedback')
		} else if (sectionsConfig?.whatsapp) {
			router.push('/dashboard/whatsapp')
		} else if (sectionsConfig?.referrals) {
			router.push('/dashboard/referrals')
		} else {
			// If no sections are available, redirect to home
		router.push('/')
		}
	}, [isLoggedIn, sectionsConfig, router])

	return (
		<div className='dashboard-main-content' style={{ textAlign: 'center', padding: '2rem' }}>
			<p>Loading dashboard...</p>
		</div>
	)
}
