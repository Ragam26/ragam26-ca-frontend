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
		fetchWhatsappSubmissions(jwt, user?.caId)
			.then((data) => {
				setSubmissions(data)
				setLoading(false)
			})
			.catch((err) => {
				console.error(err)
				setLoading(false)
			})
	}

	function handleFileChange(e) {
		const files = Array.from(e.target.files)
		if (files.length > 3) {
			toast.error('Maximum 3 screenshots allowed')
			return
		}
		setSelectedFiles(files)
	}

	function handleSubmit() {
		if (!selectedFiles.length) {
			toast.error('Please select at least one screenshot')
			return
		}

		setIsSubmitting(true)
		setUploadProgress(0)

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
