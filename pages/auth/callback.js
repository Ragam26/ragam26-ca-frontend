import { useEffect, useState } from 'react'
import { useUserContext } from 'context/UserContext'
import { useRouter } from 'next/router'

import Spinner from 'components/common/Spinner'

export default function CallbackPage() {
	const router = useRouter()
	const { setAuthenticatedUser, sectionsConfig } = useUserContext()
	const [tokenInfo, setTokenInfo] = useState(null)

	useEffect(() => {
		if (!router.isReady) return
		const handleAuth = async () => {
			try {
				const { token } = router.query

				if (!token) {
					router.push('/')
					return
				}

				localStorage.setItem('jwt', token)

				const user = await setAuthenticatedUser(token)

				// Show token and role info for debugging
				setTokenInfo({ token, user })

				// Admin users go straight to admin panel
				if (user?.role === 'admin') {
					router.replace('/admin/overview')
					return
				}

				if (!sectionsConfig) return

				let redirectTo = sessionStorage.getItem('redirectAfterLogin') || '/'

				sessionStorage.removeItem('redirectAfterLogin')

				if (!user?.name) {
					if (sectionsConfig?.regOpen) router.push('/register')
					else router.push('/regclosed')
					return
				}
				router.replace(redirectTo)
			} catch (err) {
				console.error(err)
				router.replace('/')
			}
		}

		handleAuth()
	}, [router.isReady])

	if (tokenInfo) {
		return (
			<div style={{ padding: '40px', fontFamily: 'monospace', maxWidth: '800px', margin: '0 auto', wordBreak: 'break-all' }}>
				<h2>Auth Callback — Debug</h2>
				<p><strong>Role:</strong> {tokenInfo.user?.role || 'N/A'}</p>
				<p><strong>Name:</strong> {tokenInfo.user?.name || 'N/A'}</p>
				<p><strong>Email:</strong> {tokenInfo.user?.email || 'N/A'}</p>
				<hr />
				<p><strong>JWT Token:</strong></p>
				<textarea
					readOnly
					value={tokenInfo.token}
					style={{ width: '100%', height: '120px', fontSize: '12px', padding: '8px' }}
				/>
			</div>
		)
	}

	return (
		<div
			style={{
				width: '100vw',
				height: '100vh',
				display: 'grid',
				placeContent: 'center',
			}}
		>
			<Spinner />
		</div>
	)
}
