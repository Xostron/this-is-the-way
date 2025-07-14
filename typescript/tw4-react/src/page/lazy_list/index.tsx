import { FC, Suspense } from 'react'
import { Await, useLoaderData, useParams } from 'react-router'
import ListCompany from '@src/cmp/list/company'
import Loader from '@src/cmp/loader'
import ErrorElement from '@src/cmp/error'

const LazyList: FC = () => {
	const list = useLoaderData()
	console.log(333, list.list)
	return (
		<Suspense fallback={<Loader type='red' />}>
			<Await resolve={list.list} errorElement={<ErrorElement/>}>
				{(props) => <ListCompany list={props} />}
			</Await>
		</Suspense>
	)
}

export default LazyList
