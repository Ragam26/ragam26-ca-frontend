import { useUserContext } from 'context/UserContext'
import { useState } from 'react'
import NotActive from 'components/dashboard/NotActive'

export default function Instagram() {
	const { sectionsConfig } = useUserContext()

	const [showUpload, setShowUpload] = useState(false)
	const [file, setFile] = useState(null)

	if (!sectionsConfig?.whatsapp) return <NotActive />

	const handleFileChange = (e) => {
		setFile(e.target.files[0])
	}

	const handleUpload = () => {
		if (!file) return alert('Please select a file')

		// TODO: connect backend upload API here
		console.log('Uploading:', file)

		setShowUpload(false)
		setFile(null)
	}

	return (
		<div className='dashboard-main-content'>
			<div className='feedback-content'>
				{/* Join Group Button
          <a href={sectionsConfig?.whatsappLink} target='_blank' rel='noopener noreferrer'>
            <button className='btn-secondary'>Join our WhatsApp group</button>
          </a> */}
			</div>

			{/* FLOATING UPLOAD BUTTON */}
			<button className='upload-fab' onClick={() => setShowUpload(true)}>
				<span className='upload-fab-text'>Upload screenshots</span>
				<span className='upload-fab-plus'>+</span>
			</button>

			{/* ===== POPUP MODAL ===== */}
			{showUpload && (
				<div className='upload-modal-overlay'>
					<div className='upload-modal'>
						<h3>Upload Screenshot</h3>

						<input type='file' accept='image/*' onChange={handleFileChange} />

						<div className='modal-actions'>
							<button className='btn-secondary' onClick={handleUpload}>
								Upload
							</button>

							<button className='btn-danger' onClick={() => setShowUpload(false)}>
								Cancel
							</button>
						</div>
					</div>
				</div>
			)}
		</div>
	)
}
