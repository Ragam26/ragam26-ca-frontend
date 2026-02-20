import PageHeader from 'components/common/PageHeader'
import RegisterClosed from 'components/regclosed/RegisterClosed'

export default function RegClosed() {
	return (
		<>
			<PageHeader title='Register' icon='/images/pen.png' />
			<RegisterClosed />
		</>
	)
}
