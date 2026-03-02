import axios from 'axios'

export function fetchSectionsConfig() {
	return new Promise(async (resolve, reject) => {
		try {
			const { data } = await axios.get(`/api/config`)
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
