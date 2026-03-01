import { useState, useRef } from 'react'
import { useUserContext } from 'context/UserContext'
import axios from 'axios'
import { BiCloudUpload, BiFile, BiX, BiCheckCircle, BiErrorCircle } from 'react-icons/bi'

export default function UploadCSV() {
  const { jwt } = useUserContext()
  const [selectedFiles, setSelectedFiles] = useState([])
  const [uploading, setUploading] = useState(false)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)
  const fileInputRef = useRef(null)

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files)
    // Filter for files ending in .csv OR with text/csv mime type
    // Some systems/files might not have the correct mime type, so checking extension is safer for CA users
    const csvFiles = files.filter(file => {
      const fileName = file.name.toLowerCase();
      return fileName.endsWith('.csv') || file.type === 'text/csv' || file.type === 'application/vnd.ms-excel';
    })

    if (csvFiles.length < files.length) {
      setError('Only CSV files are allowed.')
    } else {
      setError(null)
    }

    // Append to existing selection or replace? Let's append
    setSelectedFiles(prev => [...prev, ...csvFiles])
    setMessage(null)

    // Clear input so same file can be selected again
    if (fileInputRef.current) fileInputRef.current.value = ''
  }

  const removeFile = (index) => {
    const newFiles = [...selectedFiles]
    newFiles.splice(index, 1)
    setSelectedFiles(newFiles)
  }

  const handleUpload = async () => {
    if (selectedFiles.length === 0) {
      setError('Please select at least one CSV file.')
      return
    }

    setUploading(true)
    setError(null)
    setMessage(null)

    const formData = new FormData()
    selectedFiles.forEach((file) => {
      formData.append('files', file)
    })

    try {
      const { data } = await axios.post('/api/admin/upload-csv', formData, {
        headers: {
          Authorization: `Bearer ${jwt}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      setMessage(data.message || 'Files uploaded successfully!')
      setSelectedFiles([])
    } catch (err) {
      console.error('Failed to upload CSV:', err)
      const errorMsg = err.response?.data?.error || err.response?.data?.details || 'Failed to upload files. Please try again.'
      setError(errorMsg)
    } finally {
      setUploading(false)
    }
  }

  return (
    <>
      <div className='admin-page-heading'>
        <h1>Upload CSV</h1>
      </div>

      <div className='admin-upload-container'>
        <div className='admin-upload-card'>
          <div className='admin-upload-icon-wrapper'>
            <BiCloudUpload size={48} className='admin-upload-icon' />
          </div>
          <h2 className='admin-upload-title'>Select CSV Files</h2>
          <p className='admin-upload-description'>
            Upload your referral CSV files here. Only .csv files are accepted.
          </p>

          <input
            type='file'
            accept='.csv'
            multiple
            onChange={handleFileChange}
            ref={fileInputRef}
            style={{ display: 'none' }}
            id='csv-upload-input'
          />

          <label htmlFor='csv-upload-input' className='admin-upload-btn gateway-btn'>
            {selectedFiles.length > 0 ? 'Add More CSVs' : 'Upload CSVs'}
          </label>

          {selectedFiles.length > 0 && (
            <div className='admin-selected-files'>
              <h3>Selected Files ({selectedFiles.length})</h3>
              <ul className='admin-file-list'>
                {selectedFiles.map((file, index) => (
                  <li key={`${file.name}-${index}`} className='admin-file-item'>
                    <BiFile size={18} />
                    <span className='admin-file-name'>{file.name}</span>
                    <button
                      onClick={() => removeFile(index)}
                      className='admin-remove-file'
                      disabled={uploading}
                      title="Remove file"
                    >
                      <BiX size={20} />
                    </button>
                  </li>
                ))}
              </ul>

              <button
                className='admin-primary-btn upload-submit-btn'
                onClick={handleUpload}
                disabled={uploading}
              >
                {uploading ? 'Uploading...' : 'Confirm Upload'}
              </button>
            </div>
          )}

          {message && (
            <div className='admin-success-message'>
              <BiCheckCircle size={20} />
              <span>{message}</span>
            </div>
          )}

          {error && (
            <div className='admin-error-message'>
              <BiErrorCircle size={20} />
              <span>{error}</span>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
