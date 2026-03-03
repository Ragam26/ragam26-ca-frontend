import { useRouter } from 'next/router'
import { useEffect } from 'react'
import Link from 'next/link'

import { useUserContext } from 'context/UserContext'
import PageHeader from 'components/common/PageHeader'
import RegisterForm from 'components/register/RegisterForm'

export default function Register() {
	const router = useRouter()

	const { user, isLoggedIn, sectionsConfig, signIn } = useUserContext()

	// Ensure login first
	useEffect(() => {
		if (!isLoggedIn) {
			sessionStorage.setItem('redirectAfterLogin', '/register')
			signIn()
		}
	}, [isLoggedIn])

	// Loading guard
	if (!sectionsConfig || !isLoggedIn) return null

	// Registration closed
	if (!sectionsConfig.regOpen) {
		router.push('/regclosed')
		return null
	}

	const alreadyRegistered = user?.is_profile_completed

	return (
		<>
			<PageHeader title={alreadyRegistered ? 'Edit profile' : 'Register'} icon='/images/pen.png' />

			{/* ✅ Already registered message */}
			 
				<RegisterForm editProfile={alreadyRegistered} />
			
		</>
	)
}
