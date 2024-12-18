import Main from "@page/main"
import Achieve from "@page/achieve"
import Secret from "@page/secret"
import Boost from "@page/boost"
import NotFound from "@page/not_found"

import { createBrowserRouter } from "react-router-dom"

const router = createBrowserRouter([
	{
		path: "/",
		element: <Main />,
	},
	{
		path: "achv",
		element: <Achieve />,
	},
	{
		path: "secret",
		element: <Secret />,
	},
	{
		path: "boost",
		element: <Boost />,
	},
	{
		path: "*",
		element: <NotFound />,
	},
])

export default router
