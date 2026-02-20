export function fetchReferrals() {
	return new Promise(async (resolve, reject) => {
		try {
			setTimeout(() => {
				resolve([])
			}, 500)
		} catch (err) {
			console.error(err)
			reject(new Error('Failed to fetch referrals'))
		}
	})
}
