import { useUserContext } from 'context/UserContext'
import CountUp from 'react-countup'

const HeroText = () => {
	const { signIn } = useUserContext()

	return (
		<div className='hero-text container'>
			<h1 className='hero-heading'>
				Campus <br />
				Ambassador
			</h1>
			<p className='hero-tagline'>Be the emissary of Ragam 2025</p>
			<div className='hero-cta-wrapper'>
				<button onClick={signIn} className='btn-primary'>
					Sign up
				</button>
				<a href='#explore'>
					<button className='btn-outline'>Explore</button>
				</a>
			</div>
			<div className='hero-stats'>
				<div className='stat-wrapper'>
					<CountUp
						className='stat-num'
						end={30}
						duration={1.5}
						delay={0.5}
						suffix='+'
						useEasing={true}
					/>
					<p>Workshops</p>
				</div>
				<div className='stat-wrapper'>
					<CountUp
						className='stat-num'
						end={12}
						duration={1.3}
						delay={0.5}
						suffix='+'
						useEasing={true}
					/>
					<p>Lectures</p>
				</div>
				<div className='stat-wrapper'>
					<CountUp
						className='stat-num'
						end={150}
						duration={1.8}
						delay={0.5}
						suffix='+'
						useEasing={true}
					/>
					<p>Sponsors</p>
				</div>
			</div>
		</div>
	)
}
export default HeroText
