import { useAsyncError } from 'react-router'

function ErrorElement() {
	const error: any = useAsyncError()
	return (
		<article>
			<div>Ooops😬. Об ошибке: {error.message}</div>
			<div>
				Подробнее:
				{error.stack}
			</div>
		</article>
	)
}

export default ErrorElement
