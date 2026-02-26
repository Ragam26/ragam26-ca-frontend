import Hero from 'components/homepage/Hero'
import Page2 from 'components/homepage/Page2'
import Benefits from 'components/homepage/Benefits'
import Page4 from 'components/homepage/Page4'
import RUReady from 'components/common/RUReady'
import { toast } from 'react-toastify'
import { useEffect } from 'react'
import { useUserContext } from 'context/UserContext'
import { useRouter } from 'next/router'
import Workshops from 'components/homepage/workshop'
// notification on website load

export default function Home() {
	const router = useRouter()
	const { setAuthenticatedUser } = useUserContext()

	// useEffect(() => {
	// 	const hasToastBeenShown = sessionStorage.getItem('toastShown')

	// 	if (!hasToastBeenShown) {
	// 		toast.info('Find the WhatsApp group link in the dashboard', {})

	// 		sessionStorage.setItem('toastShown', 'true')
	// 	}
	// }, [])
	return (
		<>
			<Hero />
			<Page2 />
			<Workshops />
			<Benefits />
			<Page4 />
			<RUReady />
		</>
	)
}
