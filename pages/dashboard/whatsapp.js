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
					images: [
						{ id: 4, url: 'https://placehold.co/300x600/fbbf24/ffffff?text=WA+Screenshot' },
					],
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
	return (
		<div className='dashboard-main-content'>
			<div className='feedback-content'>
				{/* Join WhatsApp Group Button */}
				<div style={{ marginBottom: '2rem' }}>
					<a href={sectionsConfig?.whatsappLink} target='_blank' rel='noopener noreferrer'>
						<button className='btn-secondary'>Join our WhatsApp group</button>
					</a>
				</div>

				{/* Screenshot Upload Section */}
				<div
					style={{
						background: 'rgba(255, 255, 255, 0.05)',
						padding: '2rem',
						borderRadius: '12px',
						marginTop: '2rem',
					}}
				>
					<h3 style={{ marginBottom: '1rem' }}>Submit Screenshots</h3>
					<p style={{ marginBottom: '1.5rem', opacity: 0.8 }}>
						Share your WhatsApp or Instagram story screenshots
					</p>

					{/* Platform Selection */}
					<div style={{ marginBottom: '1.5rem' }}>
						<label style={{ display: 'block', marginBottom: '0.5rem' }}>Select Platform:</label>
						<div style={{ display: 'flex', gap: '1rem' }}>
							<button
								className={platform === 'whatsapp' ? 'btn-secondary' : 'btn-outline'}
								onClick={() => setPlatform('whatsapp')}
								style={{ padding: '0.5rem 1.5rem' }}
							>
								WhatsApp
							</button>
							<button
								className={platform === 'instagram' ? 'btn-secondary' : 'btn-outline'}
								onClick={() => setPlatform('instagram')}
								style={{ padding: '0.5rem 1.5rem' }}
							>
								Instagram
							</button>
						</div>
					</div>

					{/* File Upload */}
					<div style={{ marginBottom: '1.5rem' }}>
						<label
							htmlFor='screenshot-upload'
							style={{
								display: 'block',
								padding: '2rem',
								border: '2px dashed rgba(255, 255, 255, 0.3)',
								borderRadius: '8px',
								textAlign: 'center',
								cursor: 'pointer',
								transition: 'all 0.2s',
							}}
							onMouseEnter={(e) => {
								e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.6)'
							}}
							onMouseLeave={(e) => {
								e.currentTarget.style.borderColor = 'rgba(255, 255, 255, 0.3)'
							}}
						>
							<input
								id='screenshot-upload'
								type='file'
								accept='image/*'
								multiple
								onChange={handleFileChange}
								style={{ display: 'none' }}
							/>
							<p>Click to upload screenshots (Max 3)</p>
							{selectedFiles.length > 0 && (
								<p style={{ marginTop: '0.5rem', color: '#4ade80' }}>
									{selectedFiles.length} file(s) selected
								</p>
							)}
						</label>

				{/* Image Preview */}
				{selectedFiles.length > 0 && (
					<div
						style={{
							display: 'grid',
							gridTemplateColumns: 'repeat(auto-fill, minmax(100px, 1fr))',
							gap: '1rem',
							marginTop: '1rem',
						}}
					>
						{Array.from(selectedFiles).map((file, index) => (
							<div
								key={index}
								style={{
									position: 'relative',
									aspectRatio: '1',
									borderRadius: '8px',
									overflow: 'hidden',
									border: '2px solid rgba(255, 255, 255, 0.1)',
								}}
							>
								<img
									src={URL.createObjectURL(file)}
									alt={`Preview ${index + 1}`}
									style={{
										width: '100%',
										height: '100%',
										objectFit: 'cover',
									}}
								/>
								<button
									onClick={(e) => {
										e.preventDefault()
										const newFiles = Array.from(selectedFiles).filter((_, i) => i !== index)
										setSelectedFiles(newFiles)
									}}
									style={{
										position: 'absolute',
										top: '4px',
										right: '4px',
										background: 'rgba(0, 0, 0, 0.7)',
										border: 'none',
										borderRadius: '50%',
										width: '24px',
										height: '24px',
										cursor: 'pointer',
										color: 'white',
										display: 'flex',
										alignItems: 'center',
										justifyContent: 'center',
										fontSize: '16px',
									}}
									title='Remove'
								>
										×
								</button>
								<p
									style={{
										position: 'absolute',
										bottom: '0',
										left: '0',
										right: '0',
										background: 'rgba(0, 0, 0, 0.7)',
										padding: '4px',
										fontSize: '10px',
										textAlign: 'center',
										whiteSpace: 'nowrap',
										overflow: 'hidden',
										textOverflow: 'ellipsis',
									}}
								>
									{file.name}
								</p>
							</div>
						))}
					</div>
				)}
			</div>

			{/* Progress Bar */}
			{isSubmitting && (
				<div style={{ marginBottom: '1rem' }}>
					<div
						style={{
							width: '100%',
							height: '8px',
							background: 'rgba(255, 255, 255, 0.1)',
							borderRadius: '4px',
							overflow: 'hidden',
						}}
					>
						<div
							style={{
								width: `${uploadProgress}%`,
								height: '100%',
								background: '#4ade80',
								transition: 'width 0.3s',
							}}
						/>
					</div>
					<p style={{ marginTop: '0.5rem', fontSize: '0.9rem' }}>
						Uploading... {uploadProgress}%
					</p>
				</div>
			)}

					{/* Submit Button */}
					<button
						className='btn-secondary'
						onClick={handleSubmit}
						disabled={isSubmitting || !selectedFiles.length}
						style={{
							opacity: isSubmitting || !selectedFiles.length ? 0.5 : 1,
							cursor: isSubmitting || !selectedFiles.length ? 'not-allowed' : 'pointer',
						}}
					>
						{isSubmitting ? 'Submitting...' : 'Submit Screenshots'}
					</button>
				</div>

				{/* Previous Submissions */}
				{submissions.length > 0 && (
					<div style={{ marginTop: '2rem' }}>
						<h3 style={{ marginBottom: '1rem' }}>Your Submissions</h3>
						<div
							style={{
								display: 'grid',
								gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
								gap: '1rem',
							}}
						>
							{submissions.map((sub) => (
								<div
									key={sub.id}
									style={{
										background: 'rgba(255, 255, 255, 0.05)',
										padding: '1rem',
										borderRadius: '8px',
									}}
								>
									<p style={{ textTransform: 'capitalize', marginBottom: '0.5rem' }}>
										{sub.platform}
									</p>
									<p
										style={{
											fontSize: '0.85rem',
											opacity: 0.7,
											marginBottom: '0.5rem',
										}}
									>
										{new Date(sub.createdAt).toLocaleDateString()}
									</p>
									<p
										style={{
											fontSize: '0.85rem',
											color: sub.status === 'approved' ? '#4ade80' : '#fbbf24',
										}}
									>
										Status: {sub.status || 'Pending'}
									</p>
									{sub.images && sub.images.length > 0 && (
										<div
											style={{
												marginTop: '0.5rem',
												display: 'flex',
												gap: '0.5rem',
												flexWrap: 'wrap',
											}}
										>
											{sub.images.map((img) => (
												<img
													key={img.id}
													src={img.url}
													alt='Screenshot'
													style={{
														width: '60px',
														height: '60px',
														objectFit: 'cover',
														borderRadius: '4px',
													}}
												/>
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
