class Emperor {
	constructor(eternal: boolean) {}
}
class Primarch {
	constructor(public order: number, public name:string) {}
}
class Spacemarine {
	constructor(primarchId: string) {}
}
class Mechanicum {
	constructor(side: string) {}
}

export { Emperor, Primarch, Spacemarine, Mechanicum }
