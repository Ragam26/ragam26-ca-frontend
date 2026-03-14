import { useState } from 'react'
import { useRouter } from 'next/router'
import { useUserContext } from 'context/UserContext'
import { BiImageAdd, BiCloudUpload, BiArrowBack } from 'react-icons/bi'
import { toast } from 'react-toastify'
import { submitUpload } from 'lib/req/uploads'

export default function AdminPostersPage() {
	const router = useRouter()
	const { jwt } = useUserContext()

	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [selectedFile, setSelectedFile] = useState(null)
	const [isSubmitting, setIsSubmitting] = useState(false)
	const [uploadProgress, setUploadProgress] = useState(0)

	function handleFileChange(e) {
		const files = Array.from(e.target.files)
		if (files.length === 0) return
		
		const file = files[0]
		const maxSize = 1.5 * 1024 * 1024 // 1.5MB
		
		if (file.size > maxSize) {
			toast.error('File is too large! Maximum allowed size is 1.5MB')
			return
		}
		
		setSelectedFile(file)
	}

	function handleSubmit(e) {
		e.preventDefault()
		if (!selectedFile) {
			toast.error('Please select an image file for the poster')
			return
		}

		setIsSubmitting(true)
		setUploadProgress(0)

		submitUpload(
			jwt,
			[selectedFile],
			'poster',
			{
				title: title.trim() || 'Poster Campaign',
				description: description.trim(),
			},
			(progress) => {
				setUploadProgress(progress)
			}
		)
			.then((result) => {
				if (result?.failedFiles?.length) {
					result.failedFiles.forEach((f) => toast.warn(`${f.name}: ${f.reason}`))
				} else {
					toast.success('Poster uploaded successfully!')
					// Reset form
					setTitle('')
					setDescription('')
					setSelectedFile(null)
					setUploadProgress(0)
				}
			})
			.catch((err) => {
				console.error(err)
				toast.error('Failed to upload poster')
			})
			.finally(() => {
				setIsSubmitting(false)
			})
	}

	return (
		<div className='admin-page-container'>
			<div className='admin-page-header-flex'>
				<div>
					<h1 className='admin-main-title'>Campaign Posters</h1>
					<p className='admin-sub-title'>Create and manage poster campaigns for CAs</p>
				</div>
			</div>

			<div className='admin-content-grid'>
				<div className='admin-form-card'>
					<form onSubmit={handleSubmit}>
						<div className='form-section'>
							<h3 className='section-title'>Poster Image</h3>
							<p className='section-hint'>Max file size: 1.5MB. Recommended ratio 4:5 or 1:1.</p>
							
							<div className={`poster-upload-zone ${selectedFile ? 'has-file' : ''}`}>
								<input
									type='file'
									accept='image/*'
									onChange={handleFileChange}
									style={{ display: 'none' }}
									id='poster-image-upload'
								/>
								<label htmlFor='poster-image-upload' className='upload-label'>
									{selectedFile ? (
										<div className='preview-container'>
											<img
												src={URL.createObjectURL(selectedFile)}
												alt='Preview'
												className='image-preview'
											/>
											<div className='preview-overlay'>
												<BiImageAdd size={24} />
												<span>Change Image</span>
											</div>
										</div>
									) : (
										<div className='upload-placeholder'>
											<div className='icon-circle'>
												<BiImageAdd size={32} />
											</div>
											<span className='main-text'>Click to select poster image</span>
											<span className='sub-text'>PNG, JPG, WEBP (Max 1.5MB)</span>
										</div>
									)}
								</label>
							</div>
						</div>

						<div className='form-grid'>
							<div className='form-group'>
								<label className='form-label'>Campaign Title</label>
								<input
									type='text'
									value={title}
									onChange={(e) => setTitle(e.target.value)}
									placeholder='e.g., Main Event Announcement'
									className='form-input'
								/>
							</div>

							<div className='form-group'>
								<label className='form-label'>Caption / Sharing Text</label>
								<textarea
									value={description}
									onChange={(e) => setDescription(e.target.value)}
									placeholder='Enter the text CAs should copy and share...'
									rows={5}
									className='form-textarea'
								/>
							</div>
						</div>

						{isSubmitting && (
							<div className='upload-progress-container'>
								<div className='progress-track'>
									<div 
										className='progress-fill' 
										style={{ width: `${uploadProgress}%` }}
									></div>
								</div>
								<span className='progress-text'>Uploading... {uploadProgress}%</span>
							</div>
						)}

						<button
							type='submit'
							disabled={isSubmitting || !selectedFile}
							className={`admin-submit-btn ${isSubmitting ? 'submitting' : ''}`}
						>
							{isSubmitting ? (
								'Processing...'
							) : (
								<>
									<BiCloudUpload size={20} />
									Publish Campaign
								</>
							)}
						</button>
					</form>
				</div>
			</div>
		</div>
	)
}
