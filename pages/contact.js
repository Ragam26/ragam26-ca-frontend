import PageHeader from '../components/common/PageHeader'
import ContactUs from 'components/contact/ContactUs'
import RUReady from 'components/common/RUReady'

export default function Contact() {
	return (
		<>
			<PageHeader title='Contact us' icon='/images/contact.png' />
			<ContactUs />
			<RUReady />
		</>
	)
}
