import { useState } from 'react'

import { FaChevronDown, FaChevronUp } from 'react-icons/fa'

export default function PostersGuide() {
	const [show, setShow] = useState(false)

	return (
		<div className={`posters-guide ${show ? 'show' : ''}`}>
			<div className='posters-guide-row'>
				<h3 className=''>Guide</h3>
				<span className='toggle-button' onClick={() => setShow(!show)}>
					{!show ? <FaChevronDown /> : <FaChevronUp />}
				</span>
			</div>

			<div className='dashboard-main-content posters-guide-content'>
				<div className='posters-guide-details'>
					<h5>Whatsapp</h5>
					<p>
						For every group shared to 10 points will be awarded. For every 5th group shared to, an
						additional 10 points is awarded. eg: 4 groups means 40 points and 5 groups means 60
						points. For every status put up atleast 10 points will be awarded. For every 50 views 10
						points will be awarded and for every 150 views additional 10 points will be awarded. eg:
						If your status gets 30 views you will get 10 points, 50 views you will get 10 points,
						100 views you will get 20 points and so on. 150 vies you will get 30 + 10 = 40 points.
						The maximum points of the above mentioned criteria is 220 points
					</p>
					<div className='spacerv-xs'></div>
					<h5>Instagram</h5>
					<p>
						Instagam post will be awarded 100 points. For the points to be counted the post should
						stay up atleast 2 days. Sharing via instagram stories has the same point structure as
						WhatsApp status. The maximum will be 240 points for Instagram story
					</p>
					<div className='spacerv-xs'></div>
					<h5>Facebook</h5>
					<p>
						Facebook post will be awarded 100 points. For the points to be counted the post should
						stay up for atleast 2 days.
					</p>
				</div>
			</div>
		</div>
	)
}
