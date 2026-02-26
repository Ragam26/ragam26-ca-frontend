import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUserContext } from 'context/UserContext'
import Link from 'next/link'
import { BiGridAlt, BiLogOut } from 'react-icons/bi'

export default function AdminLayout({ children }) {
  const router = useRouter()
  const { user, isLoggedIn, getUser, logout } = useUserContext()

  useEffect(() => {
    getUser().then((u) => {
      if (!u) {
        router.push('/')
        return
      }
      if (u.role !== 'admin') {
        router.push('/')
        return
      }
    })
  }, [])

  if (!isLoggedIn || user?.role !== 'admin') {
    return (
      <div className='admin-loading'>
        <span>Loading...</span>
      </div>
    )
  }

  return (
    <div className='admin-layout'>
      <aside className='admin-sidebar'>
        <div className='admin-sidebar-header'>
          <img src='/images/ragam.svg' alt='Ragam' className='admin-sidebar-logo' />
          <span className='admin-sidebar-title'>Admin</span>
        </div>

        <nav className='admin-sidebar-nav'>
          <Link href='/admin/overview' className={`admin-nav-item ${router.pathname === '/admin/overview' ? 'active' : ''}`}>
            <BiGridAlt size={18} />
            Overview
          </Link>
        </nav>

        <div className='admin-sidebar-footer'>
          <div className='admin-user-info'>
            <div className='admin-user-avatar'>
              {user?.name?.charAt(0)?.toUpperCase() || 'A'}
            </div>
            <span className='admin-user-name'>{user?.name || user?.email}</span>
          </div>
          <button className='admin-logout-btn' onClick={logout}>
            <BiLogOut size={18} />
            Logout
          </button>
        </div>
      </aside>

      <main className='admin-content'>
        {children}
      </main>
    </div>
  )
}
