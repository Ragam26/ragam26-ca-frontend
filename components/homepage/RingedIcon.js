export default function RingedIcon({ icon }) {
	return (
		<div className='ringed-icon'>
			<div className='ring'></div>
			<div className='ring'></div>
			<div className='ring'></div>
			<div className='icon-wrapper'>{icon}</div>
		</div>
	)
}
