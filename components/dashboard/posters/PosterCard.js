import { CopyToClipboard } from 'react-copy-to-clipboard'
import { toast } from 'react-toastify'

export default function PosterCard({
	imageLink,
	heading,
	writeup,
	registerLink,
	refCode,
	onSubmit,
}) {
	function generateDescription(description, registerLink, refCode) {
		if (!registerLink || !refCode) return description
		let newDesc = description + '\n\nRegister at:\n'
		try {
			const url = new URL(registerLink)
			url.searchParams.append('ref', refCode)
			newDesc += url.href
			return newDesc
		} catch (err) {
			return description
		}
	}

	async function handleDownload() {
		try {
			toast.info('Preparing download...')
			const response = await fetch(imageLink)
			const blob = await response.blob()
			const url = window.URL.createObjectURL(blob)
			const link = document.createElement('a')
			link.href = url
			link.download = `${heading.replace(/[^a-z0-9]/gi, '_')}.jpg`
			document.body.appendChild(link)
			link.click()
			document.body.removeChild(link)
			window.URL.revokeObjectURL(url)
			toast.success('Downloaded!')
		} catch (error) {
			console.error('Download failed:', error)
			toast.error('Download failed. Opening in new tab instead.')
			window.open(imageLink, '_blank')
		}
	}

	return (
		<div className='poster-card'>
			<div className='poster-card-image' style={{ backgroundImage: `url('${imageLink}')` }}></div>
			<div className='poster-card-content'>
				<h4>{heading}</h4>
				<p style={{ whiteSpace: 'pre-line' }}>
					{generateDescription(writeup, registerLink, refCode)}
				</p>
				<div className='poster-card-buttons-wrapper'>
					<button className='btn-secondary' onClick={onSubmit}>
						Submit
					</button>
					<button className='btn-outline' onClick={handleDownload}>
						Download
					</button>
					<CopyToClipboard
						text={generateDescription(writeup, registerLink, refCode)}
						onCopy={() => toast('Copied!')}
					>
						<button className='btn-outline'>Copy</button>
					</CopyToClipboard>
				</div>
			</div>
		</div>
	)
}
