// Аналог redirect react-router
function myRedirect(path:string) {
	const headers = new Headers()
	headers.set('Location', `http://localhost:5010${path}`)
	return new Response(null, { status: 302, statusText: '302', headers })
}