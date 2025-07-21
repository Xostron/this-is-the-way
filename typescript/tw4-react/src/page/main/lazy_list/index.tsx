import { FC, Suspense } from 'react'
import { Await, useLoaderData, useParams } from 'react-router'
import ListCompany from '@src/cmp/list/company'
import Loader from '@src/cmp/loader'
import ErrorElement from '@src/cmp/error'

const LazyList: FC = () => {
	const list = useLoaderData()
	return (
		<Suspense fallback={<Loader />}>
			<Await resolve={list.list} errorElement={<ErrorElement />}>
				{(props) => <ListCompany list={props} />}
			</Await>
		</Suspense>
	)
}

export default LazyList
