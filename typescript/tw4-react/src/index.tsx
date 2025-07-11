import { StrictMode } from 'react'
import { RouterProvider } from 'react-router'
import { createRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { dataStore } from '@store/index'
import router from './router'
import './style.css'

const domNode = document.getElementById('root')
if (!domNode) throw new Error('Не найден корневой узел')
const root = createRoot(domNode)

root.render(
	// <StrictMode>
		<Provider store={dataStore}>
			<RouterProvider router={router} />
		</Provider>
	// </StrictMode>
)
