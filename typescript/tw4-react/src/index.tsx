import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './page/App'
import { Provider } from 'react-redux'
import { dataStore } from '@store/index'

const rootEl = document.getElementById('root')
if (rootEl) {
	const root = ReactDOM.createRoot(rootEl)
	root.render(
		<Provider store={dataStore}>
			<React.StrictMode>
				<App />
			</React.StrictMode>
			,
		</Provider>
	)
}
