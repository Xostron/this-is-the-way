import Input from '@src/cmp/fields/input'
import Richtext from '@src/cmp/fields/richtext'
import Textarea from '@src/cmp/fields/textarea'

const List = () => {
	return (
		<main className='page'>
			LIST
			<section style={{ display: 'flex', flexDirection: 'column', gap: '16px', backgroundColor:'silver', height:"100%" }}>
				{/* <Input cls='text' placeholder='Введите текст' title='Параметр' />
				<Textarea placeholder='Введите текст' title='Параметр' />
				<Richtext placeholder='Введите текст' title='@aat' /> */}
				
			</section>
		</main>
	)
}

export default List
