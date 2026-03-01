import { useEffect, useState } from 'react'
import { useUserContext } from 'context/UserContext'
import { fetchReferrals } from 'lib/req/referrals'
import { toast } from 'react-toastify'

import NotActive from 'components/dashboard/NotActive'
import YourReferrals from 'components/dashboard/referrals/YourReferrals'
import DashboardLoading from 'components/dashboard/DashboardLoading'

export default function Referals() {
	const { user, sectionsConfig } = useUserContext()

	const [loading, setLoading] = useState(true)
	const [referrals, setReferrals] = useState([])

	useEffect(() => {
		if (!sectionsConfig?.referrals) return
		//! BYPASSING BACKEND - Using fake referrals data
		setTimeout(() => {
			const fakeReferrals = [
				{
					id: 1,
					name: 'Sarah Connor',
					email: 'sarah.connor@example.com',
					event: 'AI Workshop',
					points: 2500,
					date: '2026-02-28',
				},
				{
					id: 2,
					name: 'John Wick',
					email: 'john.wick@example.com',
					event: 'Hackathon 2026',
					points: 1500,
					date: '2026-02-27',
				},
				{
					id: 3,
					name: 'Tony Stark',
					email: 'tony@starkindustries.com',
					event: 'Tech Talk',
					points: 1250,
					date: '2026-02-26',
				},
				{
					id: 4,
					name: 'Hermione Granger',
					email: 'hermione@hogwarts.edu',
					event: 'Registration',
					points: 500,
					date: '2026-02-25',
				},
				{
					id: 5,
					name: 'Peter Parker',
					email: 'spiderman@dailybugle.com',
					event: 'Cultural Evening',
					points: 1250,
					date: '2026-02-24',
				},
			]
			setReferrals(fakeReferrals)
			setLoading(false)
		}, 500)
		/*
		fetchReferrals()
			.then((data) => {
				setReferrals(data)
				setLoading(false)
			})
			.catch((err) => {
				console.error(err)
				toast.error('Failed to load referrals')
			})
		*/
	}, [sectionsConfig])

	if (!sectionsConfig?.referrals) return <NotActive />
	else if (loading) return <DashboardLoading />
	else
		return (
			<div className='dashboard-main-content'>
				<div className='referral-code'>
					<div className='code'>REF</div>
					<div>{user?.refCode || '--'}</div>
				</div>

				<div className='spacerv-sm'></div>

				<div className='referrals-points'>
					<h4>Points per Person</h4>
					<p>
						Refer friends to Ragam events, workshops and lectures using your unique referrel code to
						receive points
					</p>
					<table>
						<tbody>
							<tr>
								<td>Workshop</td>
								<td>2500</td>
							</tr>
							<tr>
								<td>Hackathons</td>
								<td>1500</td>
							</tr>
							<tr>
								<td>Lectures</td>
								<td>1250</td>
							</tr>
							<tr>
								<td>Events</td>
								<td>1250</td>
							</tr>
							<tr>
								<td>Registration</td>
								<td>500</td>
							</tr>
						</tbody>
					</table>
				</div>
				<div className='spacerv-sm'></div>
				<YourReferrals referrals={referrals} />
			</div>
		)
}
