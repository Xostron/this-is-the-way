import React, { JSX } from 'react'
import { Outlet } from 'react-router'
interface IProps {
	children?: string | JSX.Element | JSX.Element[] 
}
// function BaseLayout({ children }: IProps) {
// 	return <>{children}</>
// }
function BaseLayout() {
	return <><Outlet/></>
}
export default BaseLayout
