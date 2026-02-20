import { useState } from 'react'
import { toast } from 'react-toastify'
import { submitFeedback } from 'lib/req/feedback'
import { useUserContext } from 'context/UserContext'

import NotActive from 'components/dashboard/NotActive'

export default function Feedback() {
	const { user, jwt, sectionsConfig } = useUserContext()

	const [feedbackForm, setFeedbackForm] = useState('')

	function handleSubmit() {
		if (!feedbackForm) {
			toast.error('Feedback is empty')
			return
		}
		toast
			.promise(submitFeedback(jwt, feedbackForm, user?.caId), {
				pending: 'Submitting',
				success: 'Submitted',
				error: 'Try again',
			})
			.then(() => setFeedbackForm(''))
			.catch(console.error)
	}

	if (!sectionsConfig?.feedback) return <NotActive />
	else
		return (
			<div className='dashboard-main-content'>
				<div className='feedback-content'>
					<p>We&apos;d love to know your thoughts</p>
					<textarea
						name='feedback'
						placeholder='Enter your message'
						value={feedbackForm}
						onChange={(e) => setFeedbackForm(e.target.value)}
					/>
					<button className='btn-secondary' onClick={handleSubmit}>
						Submit
					</button>
				</div>
			</div>
		)
}
