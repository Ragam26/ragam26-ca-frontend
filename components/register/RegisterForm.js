import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { toast } from 'react-toastify'
import { fetchCaProfile } from 'lib/req/register'
import { useUserContext } from 'context/UserContext'
import { register } from 'lib/req/register'

import styles from './register-form.module.css'

export default function RegisterForm({ editProfile }) {
	const { user, jwt } = useUserContext()
	const router = useRouter()

	const [form, setForm] = useState(null)
	const [showPopup, setShowPopup] = useState(false)

	useEffect(() => {
		if (!user) return
		fetchCaProfile(jwt)
			.then(setForm)
			.catch((err) => {
				console.error(err)
			})
	}, [jwt, user])

	const handleChange = (e) => {
		setForm({ ...form, [e.target.name]: e.target.value })
	}

	function handleSubmit(e) {
		e.preventDefault()

		const phone = form?.phone?.trim()

		if (!/^\d{10}$/.test(phone)) {
			toast.error('Please enter a valid 10-digit phone number')
			return
		}

		toast
			.promise(register(jwt, form), {
				pending: 'Loading',
				success: 'Successfull',
				error: 'Try again!',
			})
			.then(() => {
				const seen = localStorage.getItem(`reg-popup-seen-${user?.email}`)
				if (!seen) {
					setShowPopup(true)
					localStorage.setItem(`reg-popup-seen-${user?.email}`, 'true')
				} else {
					router.push('/')
				}
			})
			.catch(console.error)
	}

	return (
		<div className='container'>
			{showPopup && (
				<div
					style={{
						position: 'fixed',
						inset: 0,
						backgroundColor: 'rgba(0,0,0,0.7)',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						zIndex: 1000,
					}}
				>
					<div
						style={{
							background: '#0a0a0a',
							border: '1px solid rgba(255,255,255,0.08)',
							boxShadow:
								'0 0 0 1px rgba(255,255,255,0.04), 0 8px 40px rgba(0,0,0,0.6), 0 0 80px rgba(220,38,38,0.06)',
							borderRadius: '12px',
							padding: '2.5rem',
							maxWidth: '420px',
							width: '90%',
							textAlign: 'center',
							animation: 'popupFade 0.25s ease-out',
							position: 'relative',
						}}
					>
						<button
							onClick={() => {
								setShowPopup(false)
								router.push('/')
							}}
							style={{
								position: 'absolute',
								top: '14px',
								right: '16px',
								background: 'transparent',
								border: 'none',
								color: '#555',
								fontSize: '20px',
								cursor: 'pointer',
								lineHeight: 1,
							}}
						>
							×
						</button>

						<div
							style={{
								width: '40px',
								height: '3px',
								background: '#dc2626',
								borderRadius: '2px',
								margin: '0 auto 1.5rem',
							}}
						/>

						<h2
							style={{
								marginBottom: '0.5rem',
								color: '#ffffff',
								fontSize: '20px',
								fontWeight: '700',
								letterSpacing: '-0.2px',
							}}
						>
							Registration Successful
						</h2>

						<p
							style={{
								color: '#aaa',
								marginBottom: '0.75rem',
								fontSize: '14px',
								lineHeight: '1.7',
							}}
						>
							You are now a Campus Ambassador for{' '}
							<span style={{ color: '#fff', fontWeight: '600' }}>Ragam 2026.</span>
						</p>

						<p
							style={{ color: '#aaa', marginBottom: '0.4rem', fontSize: '14px', lineHeight: '1.7' }}
						>
							Join this group after you complete your CA Registration. All updates will be given to
							you through this group.
						</p>

						<p style={{ marginBottom: '2rem', fontSize: '14px', lineHeight: '1.7' }}>
							<span style={{ color: '#ef4444', fontWeight: '700' }}>Mandatory</span>
							<span style={{ color: '#aaa' }}> to join the group.</span>
						</p>

						<a
							href='https://chat.whatsapp.com/C0FA6SNtbYY2PQ9lvgsWsY?mode=hq2tsha'
							target='_blank'
							rel='noreferrer'
							style={{
								display: 'inline-block',
								background: '#c0392b',
								color: '#fff',
								padding: '0.7rem 2rem',
								borderRadius: '8px',
								textDecoration: 'none',
								fontWeight: '600',
								fontSize: '14px',
								letterSpacing: '0.2px',
							}}
						>
							Join
						</a>

						<p
							onClick={() => {
								setShowPopup(false)
								router.push('/')
							}}
							style={{ marginTop: '1rem', fontSize: '13px', color: '#444', cursor: 'pointer' }}
						>
							Dismiss
						</p>
					</div>

					<style>{`
						@keyframes popupFade {
							from { opacity: 0; transform: translateY(12px); }
							to   { opacity: 1; transform: translateY(0); }
						}
					`}</style>
				</div>
			)}

			<form className={styles['register-form']} onSubmit={handleSubmit}>
				<div className={styles['register-form-avatar-wrapper']}>
					<div
						className={styles['register-form-avatar']}
						style={{ backgroundImage: `url(${user?.imageUrl})` }}
					></div>
					<div className={styles['register-form-email-wrapper']}>
						<span className={styles['register-form-email-tag']}>Email</span>
						<span className={styles['register-form-email']}>{user?.email}</span>
					</div>
				</div>
				<fieldset>
					<label>Name*</label>
					<input
						type='text'
						name='name'
						placeholder='Enter your name'
						value={form?.name || ''}
						onChange={handleChange}
						required
					/>
				</fieldset>
				<fieldset>
					<label>Whatsapp No. (This will be your referral code)*</label>
					<input
						type='text'
						name='phone'
						placeholder='Enter your whatsapp no.'
						value={form?.phone || ''}
						onChange={handleChange}
						required
					/>
				</fieldset>
				<fieldset>
					<label>GPay No.*</label>
					<input
						type='text'
						name='gPayNumber'
						placeholder='Enter your GPay no.'
						value={form?.gPayNumber || ''}
						onChange={handleChange}
						required
					/>
				</fieldset>
				<fieldset>
					<label>College/Institute*</label>
					<input
						type='text'
						name='college'
						placeholder='Enter your institute'
						value={form?.college || ''}
						required
						onChange={handleChange}
					/>
				</fieldset>
				<fieldset>
					<label>District*</label>
					<input
						type='text'
						name='district'
						placeholder='Enter your district'
						value={form?.district || ''}
						required
						onChange={handleChange}
					/>
				</fieldset>
				<fieldset>
					<label>Year of study*</label>
					<select name='year' value={form?.year || ''} required onChange={handleChange}>
						<option value=''>Choose year of study</option>
						<option value='Year 1'>Year 1</option>
						<option value='Year 2'>Year 2</option>
						<option value='Year 3'>Year 3</option>
						<option value='Year 4'>Year 4</option>
						<option value='Year 5'>Year 5</option>
						<option value='Other'>Other</option>
					</select>
				</fieldset>

				<button className={`btn-secondary ${styles['register-form-submit']}`}>
					{editProfile ? 'Save' : 'Register'}
				</button>
			</form>
			<div className='spacerv-md'></div>
			<div className='spacerv-sm'></div>
		</div>
	)
}
