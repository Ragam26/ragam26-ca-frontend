export default function Benefits() {
	return (
		<div className='benefits'>
			<div className='benefits-image-container'>
				<div className='benefits-image-wrapper'>
					<h2 className='benefits-heading'>Social Media Rewards</h2>
					<img src='/images/instagram.svg' alt='' className='benefits-image' />
				</div>
			</div>
			<div className='benefits-content'>
				<div className='prizes-worth-wrapper'>
					<img src='/images/prizes-worth.svg' alt='Prizes worth ₹22k' />
				</div>
				<div className='prizes-wrapper'>
					<img src='/images/first-prize.svg' alt='🥇 ₹5,000' />
					<img src='/images/second-prize.svg' alt='🥈 ₹4,000' />
					<img src='/images/third-prize.svg' alt='🥉 ₹3,000' />
				</div>
				<div className='benefits-content-bottom'>
					<div className='other-prizes-wrapper'>
						<div className='other-prize-wrapper'>
							<p className='other-prize-position'>4th to 6th</p>
							<p className='other-prize'>₹2000</p>
							<span className='goodies-1000'>+ Goodies</span>
						</div>
						<div className='other-prize-wrapper'>
							<p className='other-prize-position'>7th to 10th</p>
							<p className='other-prize'>₹1000</p>
							<span className='goodies-500'>+ Goodies</span>
						</div>
					</div>
					<div className='benefits-desc-wrapper'>
						<p>
							Points will be awarded based on four key promotional activities:
							WhatsApp group sharing, WhatsApp status updates, Instagram posts,
							and Instagram stories. Detailed point structure will be shared
							with registered Campus Ambassadors.
						</p>
						<p>Special certificate for top 20 people</p>
						<p>Certificate for those who completed a certain tier (% of work)</p>
						<p>Extra benefits for excellence in work (Awarded by Ragam PRC)</p>
					</div>
				</div>
			</div>
		</div>
	)
}
