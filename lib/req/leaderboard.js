import axios from 'axios'

/**
 * GET /api/user/leaderboard
 * Public - returns top 20 users sorted by points descending.
 * Response: [{ name, points }, ...] or [{ user: { name }, totalPoints }, ...]
 */
export function fetchLeaderboard() {
	return new Promise(async (resolve, reject) => {
		try {
			const { data } = await axios.get(
				`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/user/leaderboard`
			)
			// Normalise to [{ user: { name }, totalPoints }] regardless of backend shape
			const normalised = (Array.isArray(data) ? data : data.data || []).map((item) => ({
				user: { name: item?.user?.name ?? item?.name ?? '--' },
				totalPoints: item?.totalPoints ?? item?.points ?? 0,
			}))
			resolve(normalised)
		} catch (err) {
			console.error(err)
			reject('Failed to fetch leaderboard')
		}
	})
}
