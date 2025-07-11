import { FC, Suspense } from 'react'
import { Await, useLoaderData, useParams } from 'react-router'
import ListCompany from '@src/cmp/list/company'
import Loader from '@src/cmp/loader'

const LazyList: FC = () => {
	const list = useLoaderData()
	console.log(333, list)
	return (
		<Suspense fallback={<Loader type='red' />}>
			<Await resolve={list.list} errorElement={<div>Could not load reviews 😬</div>}>
				{(props) => <ListCompany list={props} />}
			</Await>
		</Suspense>
	)
}

export default LazyList
