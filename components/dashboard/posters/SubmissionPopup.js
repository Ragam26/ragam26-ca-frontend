import { useState, useRef } from 'react'
import { submitPoster } from 'lib/req/posters'
import { toast } from 'react-toastify'
import { useUserContext } from 'context/UserContext'

import { BiPlus } from 'react-icons/bi'
import { MdClose } from 'react-icons/md'
import { RiEditBoxFill } from 'react-icons/ri'

import styles from './submission-popup.module.css'

export default function SubmissionPopup({ submission, onCancel, onSubmit }) {
	const { jwt } = useUserContext()

	const [comment, setComment] = useState(submission?.comment)
	const [images, setImages] = useState(submission?.images || [])
	const [percent, setPercent] = useState(0)
	const [uploading, setUploading] = useState(false)

	function handleRemoveImage(image) {
		let temp
		if (image.type == 'file') {
			temp = images.filter((item) => item?.url != image?.url)
		} else temp = images.filter((item) => item?.id != image?.id)
		setImages(temp)
	}

	function handleAddFile(files) {
		const temp = images.filter((item) => true)
		for (let f of files) temp.push({ url: URL.createObjectURL(f), type: 'file', file: f })
		setImages(temp)
	}

	function handleSubmit() {
		if (uploading) setPercent(100)
		else setPercent(0)
		if (!images.length) {
			toast.error('No images added')
			return
		}

		//! BYPASSING BACKEND - Simulating poster submission
		setUploading(true)
		const interval = setInterval(() => {
			setPercent((prev) => {
				if (prev >= 100) {
					clearInterval(interval)
					return 100
				}
				return prev + 10
			})
		}, 100)

		setTimeout(() => {
			clearInterval(interval)
			setUploading(false)
			toast.success('Submitted')
			onSubmit()
		}, 1200)

		/*
		toast
			.promise(
				submitPoster(
					jwt,
					submission,
					comment,
					images,
					(newImages) => {
						const temp = images.filter((item) => item?.type != 'file')
						setImages([...temp, ...newImages])
					},
					(p) => {
						setPercent(p)
						setUploading(true)
					}
				),
				{
					pending: 'Submitting...',
					success: 'Submitted',
					error: 'Failed to submit',
				}
			)
			.then(onSubmit)
			.catch(console.error)
		*/
	}

	return (
		<div className={styles['submission-popup']}>
			<div className={styles['card']}>
				<div className={styles['heading-wrapper']}>
					<div className={styles['heading-left']}>
						<RiEditBoxFill className={styles['heading-left-icon']} />
						<h3 className={styles['heading']}>Submission</h3>
					</div>
					<div className={styles['close-icon-wrapper']} onClick={onCancel}>
						<MdClose className={styles['close-icon']} />
					</div>
				</div>
				<div className={styles['poster-wrapper']}>
					<div
						className={styles['poster-image']}
						style={{ backgroundImage: `url('${submission?.posterImageUrl}')` }}
					></div>
					<p className={styles['poster-title']}>{submission?.posterTitle || 'N/A'}</p>
				</div>
				<div className={styles['images-section']}>
					<span className={styles['section-title']}>IMAGES</span>
					<Images images={images || []} onRemove={handleRemoveImage} onAdd={handleAddFile} />
				</div>
				{uploading && <UploadProgress percent={percent} />}
				<div className={styles['comment-section']}>
					<span className={styles['section-title']}>COMMENT</span>
					<textarea
						type='text'
						placeholder='Enter your comment'
						value={comment || ''}
						onChange={(e) => setComment(e.target.value)}
						style={{ resize: 'none', height: '80px' }}
					></textarea>
				</div>
				<div className={styles['buttons-wrapper']}>
					<button className={styles['cancel-button']} onClick={onCancel}>
						Cancel
					</button>
					<button onClick={handleSubmit}>Submit</button>
				</div>
			</div>
		</div>
	)
}

function Images({ images, onAdd, onRemove }) {
	const inputRef = useRef()

	return (
		<div className={styles['images-wrapper']}>
			{images?.map((item, index) => (
				<ImageItem key={index} url={item?.url} onRemove={() => onRemove(item)} />
			))}
			<div className={styles['add-image']} onClick={() => inputRef.current.click()}>
				<BiPlus />
			</div>
			<input
				ref={inputRef}
				style={{ visibility: 'hidden' }}
				type='file'
				multiple
				accept='image/png, image/jpeg'
				onChange={(e) => {
					onAdd(e.target.files)
					e.target.value = null
				}}
			/>
		</div>
	)
}

function ImageItem({ url, onRemove }) {
	return (
		<div className={styles['image']} style={{ backgroundImage: `url('${url}')` }}>
			<div className={styles['image-close-icon-wrapper']} onClick={onRemove}>
				<MdClose />
			</div>
		</div>
	)
}

function UploadProgress({ percent }) {
	return (
		<div className={styles['upload-progress']}>
			<div className={styles['upload-progress-bg']}>
				<div className={styles['upload-progress-green']} style={{ width: `${percent}%` }}></div>
			</div>
		</div>
	)
}
