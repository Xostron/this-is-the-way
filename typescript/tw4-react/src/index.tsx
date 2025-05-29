import React from 'react'
import { RouterProvider } from 'react-router-dom'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { dataStore } from '@store/index'
import App from './page/App'

const domNode = document.getElementById('root')
if (!domNode) throw new Error('Не найден корневой узел')
const root = createRoot(domNode)

root.render(
	<Provider store={dataStore}>
		<React.StrictMode>
			{/* <RouterProvider router={router} /> */}
			<App/>
		</React.StrictMode>
		,
	</Provider>
)
