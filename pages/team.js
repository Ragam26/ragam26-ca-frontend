import PageHeader from 'components/common/PageHeader'
import Team from 'components/team/Team'

export default function team() {
	return (
		<>
			<PageHeader title='Team' icon='/images/developer-image.png' />
			<Team />
			<div className='spacerv-md'></div>
			<div className='spacerv-sm'></div>
		</>
	)
}
