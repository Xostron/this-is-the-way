import Input from '@src/cmp/fields/input'
import Textarea from '@src/cmp/fields/textarea'

const Secret = () => {
	return (
		<main className='page'>
			Secret
			<section>
				<Input cls='text' placeholder='Введите текст' title='Параметр' />
				<Textarea placeholder='Введите текст' title='Параметр' />
			</section>
		</main>
	)
}

export default Secret
