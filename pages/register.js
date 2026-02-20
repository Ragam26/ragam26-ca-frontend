import { useRouter } from 'next/router'

import { useUserContext } from 'context/UserContext'
import PageHeader from 'components/common/PageHeader'
import RegisterForm from 'components/register/RegisterForm'

export default function Register() {
	const router = useRouter()

	const { sectionsConfig } = useUserContext()
	if (!sectionsConfig?.regOpen) {
		router.push('/regclosed')
	} else {
		return (
			<>
				<PageHeader
					title={router?.query?.editprofile === 'true' ? 'Edit profile' : 'Register'}
					icon='/images/pen.png'
				/>
				<RegisterForm editProfile={router?.query?.editprofile === 'true'} />
			</>
		)
	}
}
