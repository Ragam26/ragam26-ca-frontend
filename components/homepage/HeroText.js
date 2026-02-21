import { useUserContext } from 'context/UserContext'
import CountUp from 'react-countup'
import { requireAuth } from 'lib/requireAuth'
import { useRouter } from 'next/router'

const HeroText = () => {
	const { isLoggedIn, signIn } = useUserContext()
	const router = useRouter()

	const handleRegisterClick = () => {
		requireAuth({ isLoggedIn, signIn, redirectTo: '/register', router })
	}

	return (
		<div className='hero-text container'>
			<h1 className='hero-heading'>
				Campus <br />
				Ambassador
			</h1>
			<p className='hero-tagline'>Be the emissary of Ragam 2026</p>
			<div className='hero-cta-wrapper'>
				<button className='btn-primary' onClick={handleRegisterClick}>
					Register Now
				</button>
				<a href='#explore'>
					<button className='btn-outline'>Explore</button>
				</a>
			</div>
		</div>
	)
}
export default HeroText
