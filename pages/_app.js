// FONTS
import 'assets/fonts/inter/inter.css'
import 'assets/fonts/clash-display/clash-display.css'

// COMMON CSS
import 'styles/text-styles.css'
import 'styles/layout.css'
import 'styles/form.css'
import 'styles/app.css'
import 'styles/global.css'
import 'styles/animation.css'

// COMPONENT CSS
import 'components/homepage/homepage.css'
import 'components/homepage/card.css'
import 'components/homepage/page2.css'
import 'components/homepage/page4.css'
import 'components/homepage/hero.css'
import 'components/homepage/benefits.css'
import 'components/homepage/sponsors.css'
import 'components/homepage/ringed-icon.css'

import 'components/dashboard/dashboard.css'
import 'components/dashboard/side-nav.css'
import 'components/dashboard/referrals.css'
import 'components/dashboard/posters.css'

import 'lib/firebase'

import { useRouter } from 'next/router'

import Head from 'next/head'
import Nav from 'components/common/Nav'
import Footer from 'components/common/Footer'
import UserContextWrapper from 'context/UserContext'
import DashboardLayout from 'components/layouts/DashboardLayout'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const TITLE = `Ragam'25 — Campus Ambassador`
const DESCRIPTION =
	'Be the voice of Ragam in your campus. Help Ragam in its mission to educate and inspire the next generation of leaders and stand to win prizes including internships, certificates and cash prizes.'
const SOCIAL_BANNER = 'https://ca.ragam.co.in/social-banner.png'
const SITE_URL = 'https://ca.ragam.co.in/'
const SITE_DOMAIN = 'ca.ragam.co.in'

export default function MyApp({ Component, pageProps }) {
	const router = useRouter()

	return (
		<>
			<Head>
				<title>{TITLE}</title>
				<meta name='description' content={DESCRIPTION} />

				<meta charset='utf-8' />
				<link rel='manifest' href='/manifest.json' />
				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<meta name='theme-color' content='#000000' />

				<link rel='icon' href='/title-icon.ico' />
				<link rel='apple-touch-icon' href='/favicon.png' />
				<link rel='manifest' href='/manifest.json' />

				<meta name='viewport' content='width=device-width, initial-scale=1' />
				<meta name='theme-color' content='#000000' />

				<meta property='og:url' content={SITE_URL} />
				<meta property='og:type' content='website' />
				<meta property='og:title' content={TITLE} />
				<meta property='og:description' content={DESCRIPTION} />
				<meta property='og:image' content={SOCIAL_BANNER} />

				{/* 1200 x 630px */}
				<meta name='twitter:card' content='summary_large_image' />
				<meta property='twitter:domain' content={SITE_DOMAIN} />
				<meta property='twitter:url' content={SITE_URL} />
				<meta name='twitter:title' content={TITLE} />
				<meta name='twitter:description' content={DESCRIPTION} />
				<meta name='twitter:image' content={SOCIAL_BANNER} />
			</Head>
			<UserContextWrapper>
				<Nav />
				{router?.pathname?.includes('/dashboard') ? (
					<DashboardLayout>
						<Component {...pageProps} />
					</DashboardLayout>
				) : (
					<Component {...pageProps} />
				)}
				<Footer />
			</UserContextWrapper>
			<ToastContainer />
		</>
	)
}
