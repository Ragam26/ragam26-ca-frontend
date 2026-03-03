import axios from 'axios'

const BASE = process.env.API_BASE_URL

/**
 * POST /api/uploads
 * Upload 1-3 files with a category tag.
 * category: 'whatsapp' | 'instagram' | 'poster'
 */
export async function submitUpload(jwt, files, category, onProgress) {
	const formData = new FormData()
	formData.append('category', category)
	for (const file of files) {
		formData.append('files', file)
	}
	const { data } = await axios.post(`/api/uploads`, formData, {
		headers: { Authorization: `Bearer ${jwt}` },
		onUploadProgress: (e) => {
			if (onProgress && e.total) onProgress(Math.round((e.loaded / e.total) * 100))
		},
	})
	return data // { savedFiles: [...], failedFiles: [...] }
}

/**
 * GET /api/uploads
 * Fetch uploads list. As a CA: own uploads only. As admin: all uploads.
 * filters: { status, username, uploadId, category }
 */
export async function fetchUploads(jwt, filters = {}) {
	const params = new URLSearchParams()
	if (filters.status) params.append('status', filters.status)
	if (filters.username) params.append('username', filters.username)
	if (filters.uploadId) params.append('uploadId', filters.uploadId)
	if (filters.category) params.append('category', filters.category)
	const query = params.toString()
	const { data } = await axios.get(`/api/uploads${query ? '?' + query : ''}`, {
		headers: { Authorization: `Bearer ${jwt}` },
	})
	return data // array of upload objects
}

/**
 * PUT /api/uploads/:uploadId
 * Admin only. Update status to 'approved' or 'rejected'.
 * If approved, points can be awarded.
 */
export async function updateUploadStatus(jwt, uploadId, status, points) {
	const body = { status }
	if (status === 'approved' && points != null) body.points = Number(points)
	const { data } = await axios.put(`/api/uploads/${uploadId}`, body, {
		headers: { Authorization: `Bearer ${jwt}` },
	})
	return data // { msg: "Status set to approved successfully." }
}

/**
 * Helper: build the full image URL from a filePath returned by the backend.
 * e.g. "public/uploads/pending/1_123_file.png" → "<BASE>/public/uploads/..."
 */
export function buildImageUrl(filePath) {
	if (!filePath) return ''
	if (filePath.startsWith('http')) return filePath
	return `${BASE}/${filePath.replace(/^\//, '')}`
}
