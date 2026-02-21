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
	const [sectionsConfig, setSectionsConfig] = useState({
		posters: false,
		referrals: false,
		feedback: false,
		whatsapp: false,
		leaderboard: true,
		regOpen: true,
		whatsappLink: '',
	})

	useEffect(() => {
		let jwt = localStorage.getItem('jwt')
		if (jwt) setAuthenticatedUser(jwt)
	}, [])

	// useEffect(() => {
	// 	;(async () => {
	// 		const { data } = await axios.get('/api/config')
	// 		let temp = data.data.attributes
	// 		setSectionsConfig({
	// 			feedback: temp.feedback,
	// 			posters: temp.posters,
	// 			referrals: temp.referrals,
	// 			whatsapp: temp.joinWhatsappGroup,
	// 			leaderboard: temp.leaderboard,
	// 			regOpen: temp.regOpen,
	// 			whatsappLink: temp.whatsapp_link,
	// 		})
	// 	})()
	// }, [])

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
				imageUrl: '/images/avatar.jpeg',
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
				let jwt = localStorage.getItem('jwt')
				if (jwt) resolve(setAuthenticatedUser(jwt))
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
