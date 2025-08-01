import { useAsyncError } from 'react-router'

function ErrorElement() {
	const error = useAsyncError() as Error
	return (
		<article>
			<div title={error.stack}>Ooops😬. {error.message}</div>
		</article>
	)
}

export default ErrorElement
