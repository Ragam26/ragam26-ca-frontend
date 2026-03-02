import axios from 'axios'

export function submitFeedback(jwt, feedback, caId) {
	return new Promise(async (resolve, reject) => {
		try {
			await axios.post(
				`/api/feedbacks`,
				{
					data: { feedback, ca: caId },
				},
				{
					headers: {
						Authorization: `Bearer ${jwt}`,
					},
				}
			)
			resolve()
		} catch (err) {
			console.error(err)
			reject(new Error('Failed to submit feedback'))
		}
	})
}
