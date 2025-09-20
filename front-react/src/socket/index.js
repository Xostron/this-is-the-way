import { io } from 'socket.io-client'

// "undefined" means the URL will be computed from the `window.location` object
const URL = process.env.NODE_ENV === 'production' ? process.env.PUBLIC_APP_URI : process.env.PUBLIC_APP_URI
// const URL = process.env.NODE_ENV === 'production' ? window.location.host : process.env.PUBLIC_APP_URI
console.log(555, URL)
const config = {
	// extraHeaders - дополнительные заголовки, сохраняются на протяжении сессии (не могут быть изменены):
	// extraHeaders: {
	// "custom-header": "chat-app"
	//   }
	// })
	// extraHeaders: {
	// 	authorization: `bearer `,
	// 	// authorization: `bearer ${access}`,
	// },
	reconnectionDelayMax: 10000,
	// auth: {
	// 	token: '123',
	// },
	autoConnect: true,
	// дополнительные параметры строки запроса, сохраняются на протяжении сессии (не могут быть изменены):
	// query: {
	// 	'my-key': 'my-value',
	// },
}

export const socket = io(URL, config)
