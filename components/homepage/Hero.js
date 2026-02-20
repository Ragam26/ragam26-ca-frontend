import Sponsors from './Sponsors'
import Nav from 'components/common/Nav'
import HeroText from './HeroText'

export default function Hero() {
	return (
		<div className='hero'>
			<div className='spacerv-lg'></div>
			<div className='hero-content'>
				<HeroText />
			</div>
			<div className='spacerv-lg'></div>

			<div className='hero-sponsors-wrapper'>
				<Sponsors />
			</div>

			<img className='hero-arrow' alt='' src='/images/arrow-down.svg' />
		</div>
	)
}
