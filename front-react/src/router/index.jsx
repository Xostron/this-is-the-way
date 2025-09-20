import Main from "@page/main"
import Achieve from "@page/achieve"
import Secret from "@page/secret"
import Boost from "@page/boost"
import NotFound from "@page/not_found"
import Login from "@page/login"
import { createBrowserRouter } from "react-router-dom"

const router = createBrowserRouter([
	{
		path: "/",
		element: <Main />,
	},
	{
		path: "a",
		element: <Achieve />,
	},
	{
		path: "b",
		element: <Secret />,
	},
	{
		path: "c",
		element: <Boost />,
	},
    {
		path: "d",
		element: <Login />,
	},
	{
		path: "*",
		element: <NotFound />,
	},
])

export default router
