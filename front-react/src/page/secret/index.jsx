import Input from '@src/cmp/fields/input'

const Secret = () => {
	return (
		<main className='page'>
			Secret
			<Input cls='text' placeholder='Введите текст' title='Параметр' disabled={true}/>
		</main>
	)
}

export default Secret
