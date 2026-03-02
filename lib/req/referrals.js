import axios from 'axios'

export function fetchReferrals(jwt, phoneNo) {
	return new Promise(async (resolve, reject) => {
		try {
			const { data } = await axios.get(`/api/admin/get-referrals/${phoneNo}`, {
				headers: {
					Authorization: `Bearer ${jwt}`,
				},
			})
			resolve(data)
		} catch (err) {
			console.error(err)
			reject(new Error('Failed to fetch referrals'))
		}
	})
}
