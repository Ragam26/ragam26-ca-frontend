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
		console.log('Referrals useEffect triggered', {
			regOpen: sectionsConfig?.referrals,
			phoneNo: user?.phoneNo,
			user: user,
		})
		if (!sectionsConfig?.referrals || !user?.phoneNo) return

		fetchReferrals(user.jwt || localStorage.getItem('jwt'), user?.phoneNo)
			.then((data) => {
				setReferrals(data)
				setLoading(false)
			})
			.catch((err) => {
				console.error(err)
				toast.error('Failed to load referrals')
			})
	}, [sectionsConfig, user])

	if (!sectionsConfig?.referrals) return <NotActive />
	else if (loading) return <DashboardLoading />
	else
		return (
			<div className='dashboard-main-content'>
				<div className='referral-code'>
					<div className='code'>REFERRALS</div>
					<div>{referrals?.length || 0}</div>
				</div>

				<div className='spacerv-sm'></div>

				{/* <div className='referrals-points'>
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
				</div> */}
				<div className='spacerv-sm'></div>
				<YourReferrals referrals={referrals} />
			</div>
		)
}
