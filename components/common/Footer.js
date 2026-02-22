import Link from 'next/link'
import { FaFacebook, FaLinkedin, FaInstagram } from 'react-icons/fa'
import { HiOutlineExternalLink } from 'react-icons/hi'

import styles from './footer.module.css'

export default function Footer() {
	return (
		<footer className={styles['footer']}>
			<div className='container'>
				<div className={styles['footer-top']}>
					<Link href='/'>
						<img className={styles['footer-logo']} src='/images/ragam.svg' alt='Ragam 2025' />
					</Link>
					<div className={styles['footer-links-wrapper']}>
						<ul>
							<li>
								<p>Site</p>
							</li>
							<li>
								<Link href='/'>Home</Link>
							</li>
							{/* <li>
								<a href='https://marketing.ragam.co.in/' target='_blank' rel='noreferrer noopener'>
									Marketing <HiOutlineExternalLink className={styles['external-icon']} />
								</a>
							</li> */}
							{/* <li>
								<a href='https://reg.ragam.co.in/' target='_blank' rel='noreferrer noopener'>
									Registrations <HiOutlineExternalLink className={styles['external-icon']} />
								</a>
							</li> */}
							{/* <li>
								<Link href='/team'>Team</Link>
							</li> */}
						</ul>
						<ul>
							<li>
								<p>Social</p>
							</li>
							<li>
								<a
									className={styles['social-link']}
									href='https://instagram.com/ragam_nitc'
									target='_blank'
									rel='noreferrer noopener'
								>
									<FaInstagram className={styles['social-icon']} />
									Instagram
								</a>
							</li>
							<li>
								<a
									className={styles['social-link']}
									href='https://www.facebook.com/Ragam.nitc/'
									target='_blank'
									rel='noreferrer noopener'
								>
									<FaFacebook className={styles['social-icon']} />
									Facebook
								</a>
							</li>
							<li>
								<a
									className={styles['social-link']}
									href='https://www.linkedin.com/company/ragam-nit-calicut'
									target='_blank'
									rel='noreferrer noopener'
								>
									<FaLinkedin className={styles['social-icon']} />
									Linkedin
								</a>
							</li>
						</ul>
					</div>
				</div>
				<div className={styles['footer-bottom']}>
					<p className={styles['footer-copy']}>&#169; Ragam {new Date().getFullYear()}</p>
					<a
						className={styles['footer-link']}
						href='https://ragam.co.in/'
						target='_blank'
						rel='noreferrer noopener'
					>
						Ragam <HiOutlineExternalLink className={styles['external-icon']} />
					</a>
				</div>
			</div>
		</footer>
	)
}
