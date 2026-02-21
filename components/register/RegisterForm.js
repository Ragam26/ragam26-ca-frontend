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
				router.push('/')
			})
			.catch(console.error)
	}

	return (
		<div className='container'>
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
					<label>Whatsapp no.*</label>
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
