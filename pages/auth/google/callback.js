import axios from 'axios'
import { useEffect } from 'react'
import { useUserContext } from 'context/UserContext'
import { useRouter } from 'next/router'

import Spinner from 'components/common/Spinner'

export default function CallbackPage() {
	const router = useRouter()
	const { setAuthenticatedUser, sectionsConfig } = useUserContext()

	useEffect(() => {
		if (!router.isReady) return
		const temp = async () => {
			try {
				const { data } = await axios.get(
					`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/google/callback?access_token=${router.query['access_token']}`
				)

				await setAuthenticatedUser(data.jwt)

				if (!data.user.name) {
					if (sectionsConfig?.regOpen) router.push('/register')
					else router.push('/regclosed')
				} else {
					let loginFrom = sessionStorage.getItem('redirectTo') || '/'
					router.push(loginFrom)
				}
			} catch (err) {
				console.error(err)
			}
		}
		temp()
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
