import { useEffect, useState } from 'react'
import { useContext, createContext } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

const UserContext = createContext()
axios.defaults.withCredentials = true

export default function UserContextWrapper({ children }) {
	const router = useRouter()

	const [user, setUser] = useState(null)
	const [jwt, setJwt] = useState(null)
	const [isLoggedIn, setIsLoggedIn] = useState(false)

	useEffect(() => {
		let jwt = localStorage.getItem('jwt')
		if (jwt) setAuthenticatedUser(jwt)
	}, [])

	const [sectionsConfig, setSectionsConfig] = useState({
		feedback: false,
		posters: false,
		referrals: true,
		whatsapp: true,
		leaderboard: true,
		regOpen: true,
		whatsappLink: 'https://chat.whatsapp.com/C0FA6SNtbYY2PQ9lvgsWsY?mode=hq2tsha'});

	const setAuthenticatedUser = async (jwt) => {
		try {
			if (!jwt) return

			const { data } = await axios.post(
				'/api/auth/verify',
				{},
				{
					headers: {
						Authorization: `Bearer ${jwt}`,
					},
					withCredentials: true,
				}
			)
			console.log('Auth Verify Response Data:', data);

			let currentUser = {
				name: data.user.name,
				email: data.user.email,
				role: data.user.role,
				imageUrl: data.user.imageUrl || '/images/avatar.jpeg',
				caId: data.user.caId ?? data.user.id,
				refCode: data.user.refCode ?? data.user.referralCode,
				points: data.user.points ?? 0,
				phoneNo: data.user.phoneNo,
				is_profile_completed: data.user.isProfileComplete || false,
			}
			localStorage.setItem('jwt', jwt)
			setUser(currentUser)
			setIsLoggedIn(true)
			setJwt(jwt)
			return currentUser
		} catch (err) {
			console.error(err)
		}
	}

	function signIn() {
		window.location.href = '/api/auth/login'
	}

	function logout() {
		setUser(null)
		setIsLoggedIn(false)
		localStorage.removeItem('jwt')
		toast.success('Signed out successfully')
		router.push('/')
	}

	function getUser() {
		return new Promise(async (resolve, reject) => {
			try {
				const storedJwt = localStorage.getItem('jwt')
				if (storedJwt) resolve(await setAuthenticatedUser(storedJwt))
				else resolve(null)
			} catch (err) {
				reject(err)
			}
		})
	}

	return (
		<UserContext.Provider
			value={{
				user,
				jwt,
				isLoggedIn,
				setAuthenticatedUser,
				logout,
				signIn,
				getUser,
				sectionsConfig,
			}}
		>
			{children}
		</UserContext.Provider>
	)
}

export function useUserContext() {
	return useContext(UserContext)
}
