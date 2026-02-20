import axios from 'axios'

export function fetchLeaderboard() {
	return new Promise(async (resolve, reject) => {
		try {
			const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/getleaderboard`)
			resolve(data)
		} catch (err) {
			console.error(err)
			reject('Failed to fetch leaderboard')
		}
	})
}
