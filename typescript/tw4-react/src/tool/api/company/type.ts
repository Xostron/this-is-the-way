interface IBld {
	code:string
	on:boolean
	sectionCount:1
	_id:string
	type:string
}
interface IPc {
	addr: string
	ip: string
	state: string | null
	_id: string
}
// Pos терминал
interface IListPc {
	order: number
	data: IBld[]
	header: IPc
}
// Компания
interface ICmp {
	_id: string
	name: string
	code: string
	pc: IListPc[]
}
interface IFetchCmp {
	result:ICmp[]
}

export type { IFetchCmp, ICmp,IListPc,IPc,IBld }