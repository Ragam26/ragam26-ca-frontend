import { useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { BiGridAlt, BiLogOut, BiCloudUpload, BiMenu, BiChevronLeft } from 'react-icons/bi'

const FAKE_USER = {
	name: 'Admin User',
	email: 'admin@ragam.in',
	role: 'admin',
}

export default function AdminLayout({ children }) {
	const router = useRouter()
	const [isSidebarOpen, setIsSidebarOpen] = useState(false)

	const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen)
	const closeSidebar = () => setIsSidebarOpen(false)

	function handleLogout() {
		router.push('/')
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
						<div className='admin-user-avatar'>
							{FAKE_USER.name?.charAt(0)?.toUpperCase() || 'A'}
						</div>
						<span className='admin-user-name'>{FAKE_USER.name}</span>
					</div>
					<button className='admin-logout-btn' onClick={handleLogout}>
						<BiLogOut size={18} />
						Logout
					</button>
				</div>
			</aside>

			<main className='admin-content'>{children}</main>
		</div>
	)
}
