import { IoMdPerson, IoMdSchool, IoMdCalendar } from 'react-icons/io'

export default function YourReferrals({ referrals }) {
	return (
		<div className='your-referrals'>
			<h4>Your referrals</h4>

			{referrals?.length > 0 ? (
				<div className='your-referrals-list'>
					{referrals.map((item, index) => (
						<div key={index} className='referral-card'>
							<div className='referral-card-header'>
								<span className='referral-card-name'>{item?.name || 'Unknown User'}</span>
								<span className='referral-card-date'>
									{item?.registeredAt
										? new Date(item.registeredAt).toLocaleDateString('en-GB', {
												day: '2-digit',
												month: 'short',
												year: 'numeric',
										  })
										: '--'}
								</span>
							</div>

							<div className='referral-card-info'>
								<div className='info-item'>
									<IoMdSchool />
									<span className='info-text'>{item?.collegeName || 'N/A'}</span>
								</div>
								<div className='info-item'>
									<IoMdCalendar />
									<span className='label'>Event</span>
									<span className='info-text'>{item?.eventName || 'Default'}</span>
								</div>
							</div>

							<div className='referral-card-footer'>
								<span className='referral-event-badge'>
									{item?.eventName === 'default' ? 'Registration' : item?.eventName}
								</span>
							</div>
						</div>
					))}
				</div>
			) : (
				<div className='empty'>
					<p>Nothing here yet. Share your code to get started!</p>
				</div>
			)}
		</div>
	)
}
