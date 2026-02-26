import { useEffect, useState } from 'react'
import { useUserContext } from 'context/UserContext'
import axios from 'axios'
import { BiSearch } from 'react-icons/bi'

export default function AdminOverview() {
  const { jwt } = useUserContext()

  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState([])
  const [total, setTotal] = useState(0)
  const [error, setError] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')

  const filteredUsers = users.filter((user) => {
    if (!searchQuery.trim()) return true
    const q = searchQuery.toLowerCase()
    return (
      (user.name || '').toLowerCase().includes(q) ||
      (user.email || '').toLowerCase().includes(q) ||
      (user.phone || user.phoneNo || '').toLowerCase().includes(q) ||
      (user.college || user.collegeName || '').toLowerCase().includes(q) ||
      (user.district || '').toLowerCase().includes(q)
    )
  })

  useEffect(() => {
    if (!jwt) return
    fetchUsers()
  }, [jwt])

  async function fetchUsers() {
    setLoading(true)
    setError(null)
    try {
      const { data } = await axios.post(
        '/api/admin/get-ca?verified=false',
        {},
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      )
      setUsers(data.users || data.data || data || [])
      setTotal(data.total || (data.users || data.data || data || []).length)
    } catch (err) {
      console.error('Failed to fetch users:', err)
      setError('Failed to fetch users')
    }
    setLoading(false)
  }

  function formatDate(dateStr) {
    if (!dateStr) return '--'
    const d = new Date(dateStr)
    return d.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  if (loading) {
    return <div className='admin-loading'><span>Loading registered CAs...</span></div>
  }

  return (
    <>
      <div className='admin-page-heading'>
        <h1>Registered CAs</h1>
        <span className='count'>{total}</span>
      </div>

      {error && <p className='admin-error-text'>{error}</p>}

      <div className='admin-search-bar'>
        <BiSearch size={18} />
        <input
          type='text'
          placeholder='Search by name, email, phone, college or district...'
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className='admin-search-input'
        />
        {searchQuery && (
          <span className='admin-search-count'>
            {filteredUsers.length} of {total} results
          </span>
        )}
      </div>

      <div className='admin-table-container'>
        <table className='admin-table'>
          <thead>
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>College</th>
              <th>District</th>
              <th>Registered On</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.length > 0 ? (
              filteredUsers.map((user, index) => (
                <tr key={user.userId || index}>
                  <td>{index + 1}</td>
                  <td className='name-cell'>{user.name || '--'}</td>
                  <td>{user.email || '--'}</td>
                  <td>{user.phone || user.phoneNo || '--'}</td>
                  <td>{user.college || user.collegeName || '--'}</td>
                  <td>{user.district || '--'}</td>
                  <td>{formatDate(user.updatedAt)}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className='admin-empty-row'>
                  No users found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  )
}
