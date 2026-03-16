import { useState, useEffect } from 'react'
import { useUserContext } from 'context/UserContext'
import { fetchUploads, buildImageUrl } from 'lib/req/uploads'
import { toast } from 'react-toastify'

import PosterCard from 'components/dashboard/posters/PosterCard'
import PostersGuide from 'components/dashboard/posters/PostersGuide'
import NotActive from 'components/dashboard/NotActive'
import DashboardLoading from 'components/dashboard/DashboardLoading'

export default function Posters() {
	const { sectionsConfig, user, jwt } = useUserContext()

	const [loading, setLoading] = useState(false)
	const [posters, setPosters] = useState([])

	useEffect(() => {
		console.log("Posters Component loaded. User:", !!user, "Posters active:", sectionsConfig?.posters)
		if (!user || !sectionsConfig?.posters) return
		console.log("Fetching posters...")
		fetch()
	}, [user, sectionsConfig])

	function fetch() {
		setLoading(true)
		fetchUploads(jwt, { category: 'poster' })
			.then((data) => {
				console.log("Fetched posters data:", data)
				const mappedPosters = (data || []).map((p, index) => ({
					posterId: p.uploadId || p.id || index,
					title: p.title || 'Poster Campaign',
					description: p.description || '',
					image: buildImageUrl(p.filePath),
					registerLink: sectionsConfig?.regOpen ? sectionsConfig?.whatsappLink : null,
				}))
				setPosters(mappedPosters)
			})
			.catch((err) => {
				console.error(err)
				toast.error('Failed to load posters')
			})
			.finally(() => setLoading(false))
	}

	if (!sectionsConfig?.posters) return <NotActive />
	if (loading) return <DashboardLoading />

	return (
		<>
			
			
				{posters.length === 0 ? (
					<div className='empty'>No posters available yet</div>
				) : (
					<div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
						{posters.map((item, index) => (
							<PosterCard
								key={item.posterId || index}
								imageLink={item.image}
								heading={item.title}
								writeup={item.description}
								registerLink={item.registerLink}
								refCode={user?.refCode}
							/>
						))}
					</div>
				)}
			
		</>
	)
}

