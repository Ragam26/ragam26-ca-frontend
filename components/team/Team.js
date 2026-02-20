import { FaGithub, FaInstagram, FaLinkedin } from 'react-icons/fa'
import { FiGlobe } from 'react-icons/fi'
import styles from './team.module.css'

const people = [
	{
		name: 'Emanuel Christo',
		imageUrl: '/images/christo.jpg',
		role: 'Developer/Designer',
		githubLink: 'https://github.com/emanuelchristo',
		websiteLink: 'https://ecris.in/',
		instagramLink: '',
		linkedinLink: '',
	},
	{
		name: 'Amal P Mathews',
		imageUrl: '/images/amal-mathews.jpg',
		role: 'Developer',
		githubLink: 'https://github.com/amalpmathews2003',
		websiteLink: 'https://www.amalpmathews.tech/',
		instagramLink: '',
		linkedinLink: '',
	},
	{
		name: 'Vaibhav',
		imageUrl: '/images/vaibhav.jpg',
		role: 'Developer',
		githubLink: 'https://github.com/DastaanDZ',
		websiteLink: '',
		instagramLink: 'https://www.instagram.com/dastaandz/',
		linkedinLink: '',
	},
]

export default function Team() {
	return (
		<div className='container'>
			<div className={styles['developer-container']}>
				{people.map((item, index) => (
					<PeopleItem
						key={index}
						name={item.name}
						role={item.role}
						imageUrl={item.imageUrl}
						githubLink={item.githubLink}
						websiteLink={item.websiteLink}
						instagramLink={item.instagramLink}
						linkedinLink={item.linkedinLink}
					/>
				))}
			</div>
		</div>
	)
}

function PeopleItem({
	name,
	role,
	imageUrl,
	githubLink,
	websiteLink,
	instagramLink,
	linkedinLink,
}) {
	return (
		<div className={styles['developer-details']}>
			<img className={styles['developer-img']} src={imageUrl} alt={name} />
			<p className={styles['developer-name']}>{name}</p>
			<p className={styles['developer-position']}>{role}</p>
			<div className={styles['developer-social-wrapper']}>
				{githubLink && (
					<a href={githubLink} target='_blank' rel='noopener noreferrer'>
						<FaGithub className={styles['developer-social-icon']} />
					</a>
				)}
				{websiteLink && (
					<a href={websiteLink} target='_blank' rel='noopener noreferrer'>
						<FiGlobe className={styles['developer-social-icon']} />
					</a>
				)}
				{instagramLink && (
					<a href={instagramLink} target='_blank' rel='noopener noreferrer'>
						<FaInstagram className={styles['developer-social-icon']} />
					</a>
				)}
				{linkedinLink && (
					<a href={linkedinLink} target='_blank ' rel='noopener noreferrer'>
						<FaLinkedin className={styles['developer-social-icon']} />
					</a>
				)}
			</div>
		</div>
	)
}
