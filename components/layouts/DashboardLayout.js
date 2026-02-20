import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useUserContext } from 'context/UserContext'

import SideNav from 'components/dashboard/SideNav'
import PageHeader from 'components/common/PageHeader'
import { BiMenu } from 'react-icons/bi'
import SubHeading from 'components/common/SubHeading'

export default function DashboardLayout({ children }) {
	const router = useRouter()
	const { getUser, logout, sectionsConfig } = useUserContext()

	const [showSideNav, setShowSideNav] = useState(false)

	useEffect(() => {
		getUser().then((user) => {
			if (!user) router.push('/')
			else if (!user?.name) {
				if (sectionsConfig?.regOpen) router.push('/register')
				else router.push('/regclosed')
			}
		})
	}, [])

	function getSubHeading(pathname) {
		const data = {
			posters: { title: 'Posters', icon: '/images/posters.png' },
			referrals: { title: 'Referrals', icon: '/images/referrals.png' },
			feedback: { title: 'Feedback', icon: '/images/feedback.png' },
			whatsapp: { title: 'Whatsapp', icon: '/images/whatsapp.png' },
		}
		return data[pathname.split('/').at(-1)]
	}

	return (
		<>
			<div className='dashboard-top-spacer'></div>

			{/* <PageHeader title='Dashboard' icon='/images/dashboard.png' /> */}
			<div className='container dashboard-container'>
				<div className='dashboard'>
					{showSideNav && (
						<div className='dashboard-nav-wrapper'>
							<SideNav onClose={() => setShowSideNav(false)} />
						</div>
					)}
					<div className='dashboard-nav-wrapper side-nav-desktop'>
						<SideNav onClose={() => setShowSideNav(false)} />
					</div>

					<div className='dashboard-main'>
						<div className='dashboard-main-heading-wrapper'>
							<div className='dashboard-main-heading-left'>
								<BiMenu className='dashboard-menu-icon' onClick={() => setShowSideNav(true)} />
								<SubHeading
									title={getSubHeading(router.pathname)?.title}
									icon={getSubHeading(router.pathname)?.icon}
								/>
							</div>
							<button className='btn-outline dashboard-main-logout' onClick={logout}>
								Logout
							</button>
						</div>
						{/* {notification && (
							<div className='notification'>
								<h4 className='notification-header'> Notification </h4>
								<p>{notification.message}</p>
							</div>
						)} */}
						{children}
					</div>
				</div>
				<div className='dashboard-bottom-spacer'></div>
			</div>
		</>
	)
}
