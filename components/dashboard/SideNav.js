import Link from 'next/link'
import { useRouter } from 'next/router'
import { IoMdClose } from 'react-icons/io'
import { signOut } from 'lib/firebase'
import { toast } from 'react-toastify'
import { useEffect, useState } from 'react'
import { useUserContext } from 'context/UserContext'

export default function SideNav({ userDb, points, onClose }) {
	const router = useRouter()
	const { user, logout } = useUserContext()

	return (
		<div className='side-nav'>
			<div className='dashboard-menu-close-wrapper'>
				<IoMdClose className='dashboard-menu-icon' onClick={onClose} />
			</div>
			<div className='user-wrapper'>
				<div className='user-avatar' style={{ backgroundImage: `url(${user?.imageUrl})` }}></div>
				<h3 className='user-name'>{user?.name || '--'}</h3>
				<span className='user-email'>{user?.email}</span>
				<p className='user-points'>
					{Number.isInteger(parseInt(user?.points)) ? user?.points : '--'} Points
				</p>
				{/* <br /> */}
				{/* <div className='referral-code'>
					<div className='code'>REF</div>
					<div>{user?.refCode || '--'}</div>
				</div> */}
			</div>

			<div className='edit-profile-button-wrapper'>
				<Link href='/register?editprofile=true'>
					<button className='btn-outline'>Edit profile</button>
				</Link>
			</div>

			<ul className='side-nav-links' onClick={onClose}>
				<Link
					href='/dashboard/posters'
					className={router.pathname === '/dashboard/posters' ? 'active' : ''}
				>
					<img src='/images/posters.png' alt='🌁' /> Posters
				</Link>
				<Link
					href='/dashboard/whatsapp'
					className={router.pathname === '/dashboard/whatsapp' ? 'active' : ''}
				>
					<img src='/images/whatsapp.png' alt='✅' /> Whatsapp
				</Link>
				<Link
					href='/dashboard/referrals'
					className={router.pathname === '/dashboard/referrals' ? 'active' : ''}
				>
					<img src='/images/referrals.png' alt='🔗' /> Referrals
				</Link>
				<Link
					href='/dashboard/feedback'
					className={router.pathname === '/dashboard/feedback' ? 'active' : ''}
				>
					<img src='/images/feedback.png' alt='✍️' /> Feedback
				</Link>
				{/* <Link href='#'>
					<a onClick={logout}>
						<img src='/images/door.png' alt='🚪' /> Logout
					</a>
				</Link> */}
			</ul>
			<div className='spacerv-md'></div>
		</div>
	)
}
