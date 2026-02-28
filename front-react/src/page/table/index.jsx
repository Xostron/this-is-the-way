import TableBootstrap from '@src/cmp/table_bootstrap'
import React, { useState } from 'react'
const data = {}

function PTable() {
	return (
		<main className='pageTable '>
			<section className='header'>Таблица</section>
			<section className='content p-3 pt-0'>
				Table
				<TableBootstrap data={data} />
			</section>
			{/* <section className='asidel'>3</section> */}
			{/* <section className='asider'>4</section> */}
			{/* <section className='footer'>5</section> */}
		</main>
	)
}

export default PTable
