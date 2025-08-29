import useWarnStore from '@store/warn'
import Dialog from '@cmp/dialog'
import useDialog from '@cmp/dialog/hook'
import def from './def'

// Фабричный компонент модальных окон
export default function Warn({}) {
	const { refDialog, open, close } = useDialog()
	const { clear, data, show, entryCode } = useWarnStore(({ clear, data, show, entryCode }) => ({
		clear,
		data,
		show,
		entryCode,
	}))
	show ? open() : close()
	const Entry = def[entryCode] ?? def.notfound
	return (
		<Dialog href={refDialog} cls={data.cls ?? ''}>
			<Entry data={data} entryCode={entryCode} />
		</Dialog>
	)
}
