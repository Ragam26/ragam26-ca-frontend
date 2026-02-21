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

	const isEditMode = router?.query?.editprofile === 'true'
	const alreadyRegistered = user?.name && !isEditMode

	return (
		<>
			<PageHeader title={isEditMode ? 'Edit profile' : 'Register'} icon='/images/pen.png' />

			{/* ✅ Already registered message */}
			{alreadyRegistered ? (
				<div
					style={{
						textAlign: 'center',
						marginTop: '40px',
					}}
				>
					<h2>You have already registered ✅</h2>

					<p style={{ marginTop: '10px' }}>Go to your profile if you want to make edits.</p>

					<Link href='/register?editprofile=true'>
						<button className='btn-primary' style={{ marginTop: '20px' }}>
							Edit Profile
						</button>
					</Link>
				</div>
			) : (
				<RegisterForm editProfile={isEditMode} />
			)}
		</>
	)
}
