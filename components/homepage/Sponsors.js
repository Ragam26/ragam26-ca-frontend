const sponsors = [
	{
		img: '/images/logos/adobe.svg',
		alt: 'Adobe',
	},
	{
		img: '/images/logos/dell.svg',
		alt: 'Dell',
	},
	{
		img: '/images/logos/reliance.svg',
		alt: 'Reliance',
	},
	{
		img: '/images/logos/ibm.svg',
		alt: 'IBM',
	},
	{
		img: '/images/logos/tata.svg',
		alt: 'Tata Motors',
	},
	{
		img: '/images/logos/bosch.svg',
		alt: 'Bosch',
	},
	{
		img: '/images/logos/texas.svg',
		alt: 'Texas Instruments',
	},
	{
		img: '/images/logos/apollo.svg',
		alt: 'Apollo',
	},
]

export default function Sponsors() {
	return (
		<div className='sponsors container'>
			{sponsors.map((item, index) => (
				<img
					key={index}
					className='sponsor-img'
					src={item.img}
					alt={item?.alt}
					height='80px'
					width='auto'
				/>
			))}
		</div>
	)
}
