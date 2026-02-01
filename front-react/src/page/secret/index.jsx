import Input from '@src/cmp/fields/input'
import Richtext from '@src/cmp/fields/richtext'
import Textarea from '@src/cmp/fields/textarea'

const Secret = () => {
	return (
		<main className='page'>
			Secret
			<section style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
				<Input cls='text' placeholder='Введите текст' title='Параметр' />
				<Textarea placeholder='Введите текст' title='Параметр' />
				<Richtext placeholder='Введите текст' title='@aat' />
			</section>
		</main>
	)
}

export default Secret
