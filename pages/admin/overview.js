import AdminTable from './AdminTable.js'

export default function AdminOverview() {
	return <AdminTable title='Registered CAs' dataKey='overview' csvName='registered-cas.csv' />
}
