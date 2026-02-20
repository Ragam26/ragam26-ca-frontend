import { useUserContext } from 'context/UserContext'

import NotActive from 'components/dashboard/NotActive'

export default function Whatsapp() {
	const { sectionsConfig } = useUserContext()

	if (!sectionsConfig?.whatsapp) return <NotActive />
	return (
		<div className='dashboard-main-content'>
			<div className='feedback-content'>
				<a href={sectionsConfig?.whatsappLink} target='_blank' rel='noopener noreferrer'>
					<button className='btn-secondary'>Join our WhatsApp group</button>
				</a>
			</div>
		</div>
	)
}
