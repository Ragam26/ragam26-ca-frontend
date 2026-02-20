export default function YourReferrals({ referrals }) {
	return (
		<div className='your-referrals'>
			<h4>Your referrals</h4>

			{referrals?.length > 0 ? (
				<div className='your-referrals-table-wrapper'>
					<table className='your-referrals-table'>
						<tbody>
							<tr>
								<th>Title</th>
								<th>Type</th>
								<th>Points</th>
							</tr>
							{referrals.map((item, index) => (
								<tr key={index}>
									<td>{item?.title}</td>
									<td>{item?.type}</td>
									<td>{item?.points}</td>
								</tr>
							))}
						</tbody>
					</table>
				</div>
			) : (
				<div className='empty'>Nothing here yet</div>
			)}
		</div>
	)
}
