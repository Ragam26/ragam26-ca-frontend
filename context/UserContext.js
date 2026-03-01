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
	const [sectionsConfig, setSectionsConfig] = useState(null)

	useEffect(() => {
		let jwt = localStorage.getItem('jwt')
		if (jwt) setAuthenticatedUser(jwt)
	}, [])

	useEffect(() => {
		;(async () => {
			try {
				const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/config`)
				const temp = data?.data?.attributes ?? data
				setSectionsConfig({
					feedback: temp.feedback,
					posters: temp.posters,
					referrals: temp.referrals,
					whatsapp: temp.joinWhatsappGroup ?? temp.whatsapp,
					leaderboard: temp.leaderboard,
					regOpen: temp.regOpen,
					whatsappLink: temp.whatsapp_link ?? temp.whatsappLink,
				})
			} catch (err) {
				console.error('Failed to fetch sections config:', err)
			}
		})()
	}, [])

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

			let currentUser = {
				name: data.user.name,
				email: data.user.email,
				role: data.user.role,
				imageUrl: data.user.imageUrl || '/images/avatar.jpeg',
				caId: data.user.caId ?? data.user.id,
				refCode: data.user.refCode ?? data.user.referralCode,
				points: data.user.points ?? 0,
				is_profile_completed: data.user.is_profile_completed ?? !!data.user.name,
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
