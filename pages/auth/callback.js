import { useEffect } from 'react'
import { useUserContext } from 'context/UserContext'
import { useRouter } from 'next/router'

import Spinner from 'components/common/Spinner'

export default function CallbackPage() {
	const router = useRouter()
	const { setAuthenticatedUser, sectionsConfig } = useUserContext()

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
