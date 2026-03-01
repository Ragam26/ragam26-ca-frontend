import { useEffect, useState } from 'react'
import { useContext, createContext } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'

const UserContext = createContext()
axios.defaults.withCredentials = true

export default function UserContextWrapper({ children }) {
	const router = useRouter()

	//! FAKE DATA FOR FRONTEND TESTING - NO BACKEND
	const [user, setUser] = useState({
		name: 'John Doe',
		email: 'john.doe@example.com',
		role: 'user',
		imageUrl: 'https://i.pravatar.cc/150?img=12',
		points: 150,
		refCode: 'REF123ABC',
		caId: 'ca-001',
		is_profile_completed: true,
	})
	const [jwt, setJwt] = useState('fake-jwt-token-for-testing')
	const [isLoggedIn, setIsLoggedIn] = useState(true) //! Always logged in for testing
	const [sectionsConfig, setSectionsConfig] = useState({
		posters: true, //! Enabled
		referrals: true, //! Enabled
		feedback: true, //! Enabled
		whatsapp: true, //! Enabled
		leaderboard: true,
		regOpen: true,
		whatsappLink: 'https://chat.whatsapp.com/fake-link', //! Fake link
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
		//! BYPASSING BACKEND - Return fake user directly
		return Promise.resolve(user)
		/*
		return new Promise(async (resolve, reject) => {
			try {
				let jwt = localStorage.getItem('jwt')
				if (jwt) resolve(setAuthenticatedUser(jwt))
				else resolve(null)
			} catch (err) {
				reject(err)
			}
		})
		*/
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
