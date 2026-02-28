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
					<a
						href={imageLink}
						download
						target='_blank'
						rel='noopener noreferrer'
						className='download-poster-button'
					>
						<button className='btn-outline'>Download</button>
					</a>
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
