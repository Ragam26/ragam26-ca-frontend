import axios from 'axios'

export function submitWhatsappScreenshot(jwt, caId, images, platform, onProgress) {
	return new Promise(async (resolve, reject) => {
		try {
			const imageIds = []

			if (images.length) {
				// Uploading images
				const formData = new FormData()
				for (let file of images) {
					formData.append('files', file)
				}
				const { data } = await axios.post(
					`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/upload`,
					formData,
					{
						headers: {
							Authorization: `Bearer ${jwt}`,
						},
						onUploadProgress: (progressEvent) => {
							let percent = Math.round((progressEvent.loaded / progressEvent.total) * 100)
							if (onProgress) onProgress(percent)
						},
					}
				)
				for (let d of data) {
					imageIds.push(d.id)
				}
			}

			// Submit the screenshot submission
			await axios.post(
				`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/whatsapp-submissions`,
				{
					data: {
						ca: caId,
						platform: platform,
						image: imageIds,
					},
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
			reject(new Error('Failed to submit screenshot'))
		}
	})
}

export function fetchWhatsappSubmissions(jwt, caId) {
	return new Promise(async (resolve, reject) => {
		try {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/whatsapp-submissions?filters[ca][id][$eq]=${caId}&populate=image`,
				{
					headers: {
						Authorization: `Bearer ${jwt}`,
					},
				}
			)

			const submissions = response?.data?.data?.map((sub) => {
				const images = sub?.attributes?.image?.data?.map((img) => ({
					id: img?.id,
					url: process.env.NEXT_PUBLIC_BACKEND_URL + img?.attributes?.url,
				}))

				return {
					id: sub?.id,
					platform: sub?.attributes?.platform,
					status: sub?.attributes?.status,
					createdAt: sub?.attributes?.createdAt,
					images,
				}
			})

			resolve(submissions || [])
		} catch (err) {
			console.error(err)
			reject(new Error('Failed to fetch submissions'))
		}
	})
}
