export default function Workshops() {
	return (
		<div className='workshops'>
			<div className='workshops-image-container'>
				<div className='workshops-image-wrapper'>
					<img src='/images/workshop.svg' alt='' className='workshops-image' />
					<h2 className='workshops-heading'>Workshop Commission</h2>
				</div>
			</div>
			<div className='workshops-content'>
				<div className='workshops-content-bottom'>
					<div className='workshops-reward-rules'>
						<h3>Reward Rules:</h3>
						<p>
							• A minimum of 5 workshop registrations is required to become eligible for commission.
						</p>
						<h4>Commission slabs:</h4>
						<ul>
							<li>• 1–20 registrations: 5% commission per registration</li>
							<li>• 21–50 registrations: 10% commission per registration</li>
							<li>• 51 registrations: 15% commission per registration</li>
						</ul>
						<p className='reward-rules-note'>
							(Each percentage applies only to registrations within that slab)
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}
