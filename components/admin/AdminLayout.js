import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { useUserContext } from 'context/UserContext'
import Link from 'next/link'
import { BiGridAlt, BiLogOut, BiCloudUpload, BiMenu, BiChevronLeft } from 'react-icons/bi'

export default function AdminLayout({ children }) {
	const router = useRouter()
	const { user, isLoggedIn, getUser, logout } = useUserContext() // AUTH RESTORED
	const [isSidebarOpen, setIsSidebarOpen] = useState(false)

	const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)
	const closeSidebar = () => setIsSidebarOpen(false)

	// AUTH GUARD RESTORED: Redirects if not admin
	useEffect(() => {
		getUser().then((u) => {
			if (!u || u.role !== 'admin') {
				router.push('/')
				return
			}
		})
	}, [])

	// LOADING STATE RESTORED: Prevents flicker of admin content
	if (!isLoggedIn || user?.role !== 'admin') {
		return (
			<div className='admin-loading'>
				<span>Loading...</span>
			</div>
		)
	}

	return (
		<div className='admin-layout'>
			{/* Mobile Header */}
			<header className='admin-mobile-header'>
				<button className='admin-menu-toggle' onClick={toggleSidebar}>
					<BiMenu size={24} />
				</button>
				<div className='admin-mobile-title'>Admin Panel</div>
				<div className='admin-mobile-spacer'></div>
			</header>

			{/* Sidebar Backdrop */}
			{isSidebarOpen && <div className='admin-sidebar-backdrop' onClick={closeSidebar}></div>}

			<aside className={`admin-sidebar ${isSidebarOpen ? 'open' : ''}`}>
				<div className='admin-sidebar-header'>
					<img src='/images/ragam.svg' alt='Ragam' className='admin-sidebar-logo' />
					<span className='admin-sidebar-title'>Admin</span>
					<button className='admin-sidebar-close' onClick={closeSidebar}>
						<BiChevronLeft size={28} />
					</button>
				</div>

				<nav className='admin-sidebar-nav'>
					<Link
						href='/admin/overview'
						className={`admin-nav-item ${router.pathname === '/admin/overview' ? 'active' : ''}`}
						onClick={closeSidebar}
					>
						<BiGridAlt size={18} />
						Overview
					</Link>

					{/* NEW LINK INTEGRATED */}
					<Link
						href='/admin/referrals'
						className={`admin-nav-item ${router.pathname === '/admin/referrals' ? 'active' : ''}`}
						onClick={closeSidebar}
					>
						<BiGridAlt size={18} />
						Referrals
					</Link>

					<Link
						href='/admin/upload-csv'
						className={`admin-nav-item ${router.pathname === '/admin/upload-csv' ? 'active' : ''}`}
						onClick={closeSidebar}
					>
						<BiCloudUpload size={18} />
						Upload CSV
					</Link>
				</nav>

				<div className='admin-sidebar-footer'>
					<div className='admin-user-info'>
						{/* REAL USER DATA RESTORED */}
						<div className='admin-user-avatar'>{user?.name?.charAt(0)?.toUpperCase() || 'A'}</div>
						<span className='admin-user-name'>{user?.name || user?.email}</span>
					</div>
					{/* REAL LOGOUT FUNCTION RESTORED */}
					<button className='admin-logout-btn' onClick={logout}>
						<BiLogOut size={18} />
						Logout
					</button>
				</div>
			</aside>

			<main className='admin-content'>{children}</main>
		</div>
	)
}
