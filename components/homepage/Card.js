import RingedIcon from 'components/homepage/RingedIcon'

export default function Card({ icon, title, info }) {
	return (
		<div className='card-wrapper'>
			<div className='card-bg'></div>
			<div className='card'>
				<RingedIcon icon={icon} />
				<h4 className='clash-sb'>{title}</h4>
				<p className='clash-r'>{info}</p>
			</div>
		</div>
	)
}
