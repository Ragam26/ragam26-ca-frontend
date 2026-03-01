import { useState, useEffect } from 'react'
import { useUserContext } from 'context/UserContext'
import { toast } from 'react-toastify'
import { submitWhatsappScreenshot, fetchWhatsappSubmissions } from 'lib/req/whatsapp'

import NotActive from 'components/dashboard/NotActive'

export default function Whatsapp() {
	const { sectionsConfig, user, jwt } = useUserContext()
	const [platform, setPlatform] = useState('whatsapp')
	const [selectedFiles, setSelectedFiles] = useState([])
	const [uploadProgress, setUploadProgress] = useState(0)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [submissions, setSubmissions] = useState([])
	const [loading, setLoading] = useState(false)

	useEffect(() => {
		if (user && jwt && sectionsConfig?.whatsapp) {
			fetchSubmissions()
		}
	}, [user, jwt, sectionsConfig])

	function fetchSubmissions() {
		setLoading(true)
		//! BYPASSING BACKEND - Using fake data
		setTimeout(() => {
			const fakeData = [
				{
					id: 1,
					platform: 'whatsapp',
					status: 'approved',
					createdAt: '2026-02-28T10:30:00Z',
					images: [
						{ id: 1, url: 'https://placehold.co/300x600/4ade80/ffffff?text=WhatsApp+Story' },
						{ id: 2, url: 'https://placehold.co/300x600/60a5fa/ffffff?text=Screenshot+2' },
					],
				},
				{
					id: 2,
					platform: 'instagram',
					status: 'pending',
					createdAt: '2026-02-27T15:45:00Z',
					images: [
						{
							id: 3,
							url: 'https://placehold.co/300x600/ec4899/ffffff?text=Instagram+Story',
						},
					],
				},
				{
					id: 3,
					platform: 'whatsapp',
					status: 'approved',
					createdAt: '2026-02-26T09:20:00Z',
					images: [{ id: 4, url: 'https://placehold.co/300x600/fbbf24/ffffff?text=WA+Screenshot' }],
				},
			]
			setSubmissions(fakeData)
			setLoading(false)
		}, 500) //! Simulate loading delay
		/*
		fetchWhatsappSubmissions(jwt, user?.caId)
			.then((data) => {
				setSubmissions(data)
				setLoading(false)
			})
			.catch((err) => {
				console.error(err)
				setLoading(false)
			})
		*/
	}

	function handleFileChange(e) {
		const files = Array.from(e.target.files)
		// Combine with already selected files, but max 3
		let newFiles = [...selectedFiles, ...files]
		if (newFiles.length > 3) {
			toast.error('Maximum 3 screenshots allowed')
			newFiles = newFiles.slice(0, 3)
		}
		setSelectedFiles(newFiles)
	}

	function handleSubmit() {
		if (!selectedFiles.length) {
			toast.error('Please select at least one screenshot')
			return
		}

		setIsSubmitting(true)
		setUploadProgress(0)

		//! BYPASSING BACKEND - Simulating upload
		const interval = setInterval(() => {
			setUploadProgress((prev) => {
				if (prev >= 100) {
					clearInterval(interval)
					return 100
				}
				return prev + 10
			})
		}, 100)

		setTimeout(() => {
			clearInterval(interval)
			toast.success('Screenshot submitted successfully!')
			setSelectedFiles([])
			setUploadProgress(0)
			fetchSubmissions()
			setIsSubmitting(false)
		}, 1200)

		/*
		submitWhatsappScreenshot(jwt, user?.caId, selectedFiles, platform, (progress) => {
			setUploadProgress(progress)
		})
			.then(() => {
				toast.success('Screenshot submitted successfully!')
				setSelectedFiles([])
				setUploadProgress(0)
				fetchSubmissions()
			})
			.catch((err) => {
				console.error(err)
				toast.error('Failed to submit screenshot')
			})
			.finally(() => {
				setIsSubmitting(false)
			})
		*/
	}

	if (!sectionsConfig?.whatsapp) return <NotActive />

	const platformColor = platform === 'whatsapp' ? '#25d366' : '#e1306c'

	return (
		<div className='dashboard-main-content'>
			<div className='wa-page'>

				{/* ── Hero banner ── */}
				<div className='wa-hero'>
					<div className='wa-hero-text'>
						<h2 className='wa-hero-title'>Screenshots &amp; Promotions</h2>
						<p className='wa-hero-sub'>
							Share your WhatsApp or Instagram story screenshots to earn points.
						</p>
					</div>
					<a href={sectionsConfig?.whatsappLink} target='_blank' rel='noopener noreferrer' className='wa-join-btn'>
						<svg width='20' height='20' viewBox='0 0 24 24' fill='currentColor'>
							<path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z'/>
							<path d='M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.852L.057 23.57a.75.75 0 0 0 .916.919l5.83-1.527A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.896 0-3.676-.51-5.21-1.402l-.374-.22-3.868 1.013 1.03-3.772-.242-.388A9.956 9.956 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z'/>
						</svg>
						Join our WhatsApp Group
					</a>
				</div>

				{/* ── Upload card ── */}
				<div className='wa-card'>
					<div className='wa-card-header'>
						<span className='wa-card-title'>Submit Screenshots</span>
						<span className='wa-card-hint'>Max 3 images per submission</span>
					</div>

					{/* Platform toggle */}
					<div className='wa-platform-row'>
						<button
							className={`wa-platform-btn ${platform === 'whatsapp' ? 'active whatsapp' : ''}`}
							onClick={() => setPlatform('whatsapp')}
						>
							<svg width='16' height='16' viewBox='0 0 24 24' fill='currentColor'>
								<path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z'/>
								<path d='M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.852L.057 23.57a.75.75 0 0 0 .916.919l5.83-1.527A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.896 0-3.676-.51-5.21-1.402l-.374-.22-3.868 1.013 1.03-3.772-.242-.388A9.956 9.956 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z'/>
							</svg>
							WhatsApp
						</button>
						<button
							className={`wa-platform-btn ${platform === 'instagram' ? 'active instagram' : ''}`}
							onClick={() => setPlatform('instagram')}
						>
							<svg width='16' height='16' viewBox='0 0 24 24' fill='currentColor'>
								<path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z'/>
							</svg>
							Instagram
						</button>
					</div>

					{/* Drop zone */}
					<label htmlFor='screenshot-upload' className='wa-dropzone'>
						<input
							id='screenshot-upload'
							type='file'
							accept='image/*'
							multiple
							onChange={handleFileChange}
							style={{ display: 'none' }}
						/>
						<svg className='wa-upload-icon' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='1.5'>
							<path strokeLinecap='round' strokeLinejoin='round' d='M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5'/>
						</svg>
						{selectedFiles.length === 0 ? (
							<>
								<span className='wa-dropzone-main'>Click to upload screenshots</span>
								<span className='wa-dropzone-sub'>PNG, JPG, WEBP — max 3 files</span>
							</>
						) : (
							<span className='wa-dropzone-main' style={{ color: '#4ade80' }}>
								{selectedFiles.length} file{selectedFiles.length > 1 ? 's' : ''} selected
							</span>
						)}
					</label>

					{/* Preview grid */}
					{selectedFiles.length > 0 && (
						<div className='wa-preview-grid'>
							{Array.from(selectedFiles).map((file, index) => (
								<div key={index} className='wa-preview-item'>
									<img src={URL.createObjectURL(file)} alt={`Preview ${index + 1}`} className='wa-preview-img' />
									<button
										className='wa-preview-remove'
										onClick={(e) => {
											e.preventDefault()
											setSelectedFiles(Array.from(selectedFiles).filter((_, i) => i !== index))
										}}
										title='Remove'
									>
										×
									</button>
									<span className='wa-preview-name'>{file.name}</span>
								</div>
							))}
						</div>
					)}

					{/* Progress bar */}
					{isSubmitting && (
						<div className='wa-progress-wrap'>
							<div className='wa-progress-bar'>
								<div className='wa-progress-fill' style={{ width: `${uploadProgress}%` }} />
							</div>
							<span className='wa-progress-label'>Uploading… {uploadProgress}%</span>
						</div>
					)}

					<button
						className='wa-submit-btn'
						onClick={handleSubmit}
						disabled={isSubmitting || !selectedFiles.length}
					>
						{isSubmitting ? (
							<>
								<span className='wa-spinner' /> Submitting…
							</>
						) : (
							<>
								<svg width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' strokeWidth='2'>
									<path strokeLinecap='round' strokeLinejoin='round' d='M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5m-13.5-9L12 3m0 0 4.5 4.5M12 3v13.5'/>
								</svg>
								Submit Screenshots
							</>
						)}
					</button>
				</div>

				{/* ── Previous submissions ── */}
				{submissions.length > 0 && (
					<div className='wa-submissions'>
						<h3 className='wa-submissions-title'>Your Submissions</h3>
						<div className='wa-submissions-grid'>
							{submissions.map((sub) => (
								<div key={sub.id} className={`wa-sub-card ${sub.status}`}>
									<div className='wa-sub-top'>
										<span className={`wa-sub-platform ${sub.platform}`}>
											{sub.platform === 'whatsapp' ? (
												<svg width='13' height='13' viewBox='0 0 24 24' fill='currentColor'>
													<path d='M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z'/><path d='M12 0C5.373 0 0 5.373 0 12c0 2.123.554 4.118 1.528 5.852L.057 23.57a.75.75 0 0 0 .916.919l5.83-1.527A11.95 11.95 0 0 0 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 22c-1.896 0-3.676-.51-5.21-1.402l-.374-.22-3.868 1.013 1.03-3.772-.242-.388A9.956 9.956 0 0 1 2 12C2 6.477 6.477 2 12 2s10 4.477 10 10-4.477 10-10 10z'/>
												</svg>
											) : (
												<svg width='13' height='13' viewBox='0 0 24 24' fill='currentColor'>
													<path d='M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 0 0 0-12.324zM12 16a4 4 0 1 1 0-8 4 4 0 0 1 0 8zm6.406-11.845a1.44 1.44 0 1 0 0 2.881 1.44 1.44 0 0 0 0-2.881z'/>
												</svg>
											)}
											{sub.platform.charAt(0).toUpperCase() + sub.platform.slice(1)}
										</span>
										<span className={`wa-sub-status ${sub.status}`}>
											{sub.status === 'approved' ? '✓ Approved' : sub.status === 'rejected' ? '✕ Rejected' : '⏳ Pending'}
										</span>
									</div>
									<span className='wa-sub-date'>{new Date(sub.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
									{sub.images && sub.images.length > 0 && (
										<div className='wa-sub-images'>
											{sub.images.map((img) => (
												<img key={img.id} src={img.url} alt='Screenshot' className='wa-sub-thumb' />
											))}
										</div>
									)}
								</div>
							))}
						</div>
					</div>
				)}

			</div>
		</div>
	)
}
