import axios from 'axios'

export function fetchPosters(jwt, caId) {
	return new Promise(async (resolve, reject) => {
		try {
			const postersRes = await axios.get(
				`/api/posters?populate=image&pagination[page]=1&pagination[pageSize]=200`
			)
			const submissionRes = await axios.get(
				`/api/cas/${caId}?populate[0]=submissions&populate[1]=submissions.image&populate[2]=submissions.poster&populate[3]=submissions.poster.image`,
				//`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/ca/submission?caId=${caId}`,
				{
					headers: {
						Authorization: `Bearer ${jwt}`,
					},
				}
			)
			const submissions = submissionRes?.data?.data?.attributes?.submissions?.data?.map((sub) => {
				const images = sub?.attributes?.image?.data?.map((img) => {
					return {
						id: img?.id,
						url: process.env.NEXT_PUBLIC_BACKEND_URL + img?.attributes?.url,
					}
				})

				return {
					caId: caId,
					submissionId: sub?.id,
					posterId: sub?.attributes?.poster?.data?.id,
					posterTitle: sub?.attributes?.poster?.data?.attributes?.title,
					posterImageUrl:
						process.env.NEXT_PUBLIC_BACKEND_URL +
						sub?.attributes?.poster?.data?.attributes?.image?.data?.attributes?.url,
					hide: sub?.attributes?.poster?.data?.attributes?.hide,
					registerLink: sub?.attributes?.poster?.data?.attributes?.regLink,
					comment: sub?.attributes?.comment,
					points: sub?.attributes?.point,
					reason: sub?.attributes?.reason,
					remarks: sub?.attributes?.remarks,
					status: sub?.attributes?.status,
					images,
				}
			})

			const posters = postersRes.data.data.map((poster) => {
				return {
					posterId: poster?.id,
					title: poster?.attributes?.title,
					description: poster?.attributes?.description,
					hide: poster?.attributes?.hide,
					registerLink: poster?.attributes?.regLink,
					image: `${process.env.NEXT_PUBLIC_BACKEND_URL}${poster?.attributes?.image?.data?.attributes?.url}`,
				}
			})

			posters?.reverse()
			submissions?.reverse()

			resolve({ posters: posters || [], submissions: submissions || [] })
		} catch (err) {
			console.error(err)
			reject(new Error('Failed to fetch posters'))
		}
	})
}

export function submitPoster(jwt, submission, comment, images, onNewImages, onProgress) {
	return new Promise(async (resolve, reject) => {
		try {
			const imageIds = []
			const imageFiles = []
			for (let img of images) {
				if (img?.id) imageIds.push(img?.id)
				else if (img?.type == 'file') imageFiles.push(img?.file)
			}

			if (imageFiles.length) {
				// Uploading images
				const formData = new FormData()
				for (let f of imageFiles) formData.append('files', f)
				const { data } = await axios.post(
					`/api/upload`,
					formData,
					{
						headers: {
							Authorization: `Bearer ${jwt}`,
						},
						onUploadProgress: (progressEvent) => {
							let percent = Math.round((progressEvent.loaded / progressEvent.total) * 100)
							onProgress(percent)
						},
					}
				)
				const newImages = []
				for (let d of data) {
					imageIds.push(d.id)
					newImages.push({ id: d.id, url: process.env.NEXT_PUBLIC_BACKEND_URL + d.url })
				}
				onNewImages(newImages)
			}

			await axios.post(
				`/api/ca/putSubmission`,
				{
					caId: submission.caId,
					posterId: submission.posterId,
					images: imageIds,
					comment,
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
			reject(new Error('Failed to submit poster'))
		}
	})
}
