import axios from 'axios'

export function fetchCaProfile(jwt, caId) {
	return new Promise(async (resolve, reject) => {
		try {
			const { data } = await axios.get(
				`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/cas/${caId}?populate=user`,
				{
					headers: {
						Authorization: `Bearer ${jwt}`,
					},
				}
			)
			const temp = data?.data?.attributes
			let userData = {
				name: temp?.user?.data?.attributes?.name || '',
				phone: temp?.user?.data?.attributes?.phone || '',
				college: temp?.user?.data?.attributes?.college || '',
				branch: temp?.user?.data?.attributes?.branch || '',
				year: temp?.user?.data?.attributes?.year || '',
				experience: temp?.user?.data?.attributes?.experience || false,
			}
			resolve(userData)
		} catch (err) {
			console.error(err)
			reject(new Error('Failed to fetch ca profile'))
		}
	})
}

export function register(jwt, userId, form) {
	return new Promise(async (resolve, reject) => {
		try {
			const newProfile = {
				name: form?.name || '',
				phone: form?.phone || '',
				college: form?.college || '',
				branch: form?.branch || '',
				year: form?.year || '',
				experience: !!form?.experience,
			}
			await axios.put(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${userId}`, newProfile, {
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			})
			resolve()
		} catch (err) {
			reject(new Error('Failed to register'))
		}
	})
}
