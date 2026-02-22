import { useState, useEffect, useRef } from 'react'
import { submitContact } from 'lib/req/contact'
import { useUserContext } from 'context/UserContext'
import { toast } from 'react-toastify'

import { IoMdCall } from 'react-icons/io'
import { MdEmail } from 'react-icons/md'
import { FaFacebook, FaInstagram, FaLinkedin } from 'react-icons/fa'
import SubHeading from 'components/common/SubHeading'

import styles from './contact-us.module.css'

const Contacts = [
	{
		name: 'Adwaith P',
		no: 7356290030,
	},
	{
		name: 'Athulya Saji',
		no: 9778369862, 
	},
]

export default function ContactUs() {
	const { user } = useUserContext()
	const formElement = useRef()

	const [form, setForm] = useState({ name: '', email: '', message: '' })

	useEffect(() => {
		setForm({ name: user?.name || '', email: user?.email || '', message: '' })
	}, [user])

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value })
	}

	function handleSubmit(e) {
		e.preventDefault()
		toast
			.promise(submitContact(new FormData(formElement.current)), {
				pending: 'Sending message',
				success: 'Message sent',
				error: 'Failed to send message',
			})
			.then(() => setForm({ name: user?.name || '', email: user?.email || '', message: '' }))
			.catch((err) => {
				console.error(err)
				toast.error('Failed to send message')
			})
	}

	return (
		<div className='container'>
			<div className={styles['contact-us']}>
				<div className={styles['contact-us-left']}>
					<div>
						<SubHeading title='Get in touch' icon='/images/hand.png' />
						<div className={styles['git-content']}>
							{Contacts.map((details, idx) => (
								<div className={styles['contact']} key={idx}>
									<div className={styles['contact-icon-wrapper']}>
										<IoMdCall className={styles['contact-icon']} />
									</div>
									<div className={styles['contact-details']}>
										<a href={'tel: +91' + details.no}>
											<h5>{details.name}</h5>
											<p>+91 {details.no}</p>
										</a>
									</div>
								</div>
							))}
							<div className={styles['contact']}>
								<div className={styles['contact-icon-wrapper']}>
									<MdEmail className={styles['contact-icon']} />
								</div>
								<div className={styles['contact-details']}>
									<h5>Email</h5>
									<p>ragam@nitc.ac.in</p>
								</div>
							</div>
						</div>
					</div>

					<div className={styles['social']}>
						<SubHeading title='Social' icon='/images/earth.png' />
						<div className={styles['social-icons-wrapper']}>
							<a href='https://instagram.com/ragam_nitc' target='_blank' rel='noreferrer noopener'>
								<div className={`${styles['contact-icon-wrapper']} ${styles['social-icon']}`}>
									<FaInstagram className={styles['contact-icon']} />
								</div>
							</a>
							<a
								href='https://www.facebook.com/Ragam.nitc/'
								target='_blank'
								rel='noreferrer noopener'
							>
								<div className={`${styles['contact-icon-wrapper']} ${styles['social-icon']}`}>
									<FaFacebook className={styles['contact-icon']} />
								</div>
							</a>
							<a
								href='https://www.linkedin.com/company/ragam-nit-calicut'
								target='_blank'
								rel='noreferrer noopener'
							>
								<div className={`${styles['contact-icon-wrapper']} ${styles['social-icon']}`}>
									<FaLinkedin className={styles['contact-icon']} />
								</div>
							</a>
						</div>
					</div>
				</div>

				<form className={styles['contact-us-right']} onSubmit={handleSubmit} ref={formElement}>
					<SubHeading title='Message' icon='/images/message.png' />

					<fieldset>
						<label>Name</label>
						<input
							type='text'
							name='name'
							placeholder='Enter your name'
							autoComplete='off'
							required
							value={form.name}
							onChange={handleChange}
						/>
					</fieldset>
					<fieldset>
						<label>Email</label>
						<input
							type='email'
							name='email'
							placeholder='Enter your email'
							autoComplete='off'
							value={form.email}
							onChange={handleChange}
							required
						/>
					</fieldset>
					<fieldset>
						<label>Message</label>
						<textarea
							placeholder='Enter message'
							name='message'
							value={form.message}
							onChange={handleChange}
							required
						></textarea>
					</fieldset>
					<button type='submit' className='btn-secondary'>
						Submit
					</button>
				</form>
			</div>
		</div>
	)
}
