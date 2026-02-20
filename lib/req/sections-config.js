import axios from 'axios'

export function fetchSectionsConfig() {
	return new Promise(async (resolve, reject) => {
		try {
			const { data } = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/config`)
			let temp = data.data.attributes
			setActive({
				feedback: temp.feedback,
				// posters: temp.posters,
				posters: true,
				referrals: temp.referrals,
				joinWhatsappGroup: temp.joinWhatsappGroup,
				whatsappGroupUrl: temp.whatsapp_link,
			})
		} catch (err) {
			console.error(err)
			reject(new Error('Failed to fetch sections config'))
		}
	})
}
