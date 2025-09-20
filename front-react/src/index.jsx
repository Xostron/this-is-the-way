import { RouterProvider } from 'react-router-dom'
import ReactDOM from 'react-dom/client'
import Socket from '@cmp/socket'
import router from './router'
import React from 'react'
import '@page/style.css'
import './style.css'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	// <>
	<React.StrictMode>
		<Socket />
		<RouterProvider router={router} />
	</React.StrictMode>
	// </>
)
