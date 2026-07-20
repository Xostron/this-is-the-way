import { Agent } from './Agent'

export class World {
	constructor(canvas) {
		this.canvas = canvas
		this.ctx = canvas.getContext('2d')
		this.width = canvas.width
		this.height = canvas.height

		// Настройки популяции
		this.totalAgents = 20
		this.totalFood = 40
		this.generation = 1

		// Списки объектов
		this.agents = []
		this.food = []

		// Лучшие мозги из предыдущего поколения для эволюции
		this.bestBrains = []

		this.init()
	}

	/**
	 * Первая инициализация мира
	 */
	init() {
		this.food = []
		this.agents = []

		// Создаем еду
		for (let i = 0; i < this.totalFood; i++) {
			this.spawnFood()
		}

		// Создаем агентов
		for (let i = 0; i < this.totalAgents; i++) {
			this.agents.push(new Agent(Math.random() * this.width, Math.random() * this.height))
		}
	}

	/**
	 * Добавляет случайную еду на поле
	 */
	spawnFood() {
		this.food.push({
			x: Math.random() * this.width,
			y: Math.random() * this.height,
			radius: 4,
		})
	}

	/**
	 * Главный цикл физики и логики
	 */
	update() {
		// 1. Фильтруем живых агентов
		const aliveAgents = this.agents.filter((a) => !a.isDead)

		// Если все умерли — запускаем новое поколение
		if (aliveAgents.length === 0) {
			this.nextGeneration()
			return
		}

		// 2. Обновляем каждого агента
		for (const agent of aliveAgents) {
			const closestFood = this.getClosestFood(agent)
			agent.update(this.width, this.height, closestFood)

			// Проверяем, съел ли агент эту еду
			if (closestFood) {
				const dx = closestFood.x - agent.x
				const dy = closestFood.y - agent.y
				const distance = Math.sqrt(dx * dx + dy * dy)

				// Расстояние коллизии (радиус агента + радиус еды)
				if (distance < agent.radius + closestFood.radius) {
					agent.eat()
					// Удаляем съеденную еду и создаем новую в другом месте
					this.food = this.food.filter((f) => f !== closestFood)
					this.spawnFood()
				}
			}
		}
	}

	/**
	 * Находит ближайшую еду для конкретного агента
	 */
	getClosestFood(agent) {
		if (this.food.length === 0) return null

		let closest = null
		let minDist = Infinity

		for (const f of this.food) {
			const dx = f.x - agent.x
			const dy = f.y - agent.y
			const dist = Math.sqrt(dx * dx + dy * dy)

			if (dist < minDist) {
				minDist = dist
				closest = f
			}
		}
		return closest
	}

	/**
	 * Генетический алгоритм: создание следующего поколения
	 */
	nextGeneration() {
		// 1. Сортируем ВСЕХ агентов по их fitness (кто больше съел)
		this.agents.sort((a, b) => b.fitness - a.fitness)

		// 2. Выбираем топ-10 выживших лидеров (их мозги гарантированно целы)
		const survivors = this.agents.slice(0, 2)
		const newAgents = []

		// 3. Создаем элиту (точные копии)
		survivors.forEach((survivor, i) => {
			survivor.win++
			newAgents.push(
				new Agent(
					Math.random() * this.width,
					Math.random() * this.height,
					survivor.brain.mutate(0, `elite_${i}`),
					true,
					survivor.win,
				),
			)
		})

		// 4. Создаем мутантов-потомков
		let childIndex = 0
		// Рассчитываем динамическую мутацию: стартуем с 0.2, но не опускаемся ниже 0.02
		const currentMutationRate = Math.max(0.02, 0.2 / Math.sqrt(this.generation))

		console.log(`Текущая сила мутации: ${currentMutationRate.toFixed(3)}`)
		while (newAgents.length < this.totalAgents) {
			const parent = survivors[Math.floor(Math.random() * survivors.length)]
			const childBrain = parent.brain.mutate(currentMutationRate, `child_${childIndex++}`)

			newAgents.push(
				new Agent(
					Math.random() * this.width,
					Math.random() * this.height,
					childBrain,
					null,
					0,
				),
			)
		}

		// 5. ТОТАЛЬНАЯ ОЧИСТКА СТАРЫХ ТЕНЗОРОВ
		// Теперь это безопасно делать для ВСЕХ старых агентов без исключения
		this.agents.forEach((a) => a.brain.dispose())

		// 6. Перезапускаем списки мира
		this.agents = newAgents
		this.food = []
		for (let i = 0; i < this.totalFood; i++) {
			this.spawnFood()
		}

		this.generation++
		console.log(`--- Поколение ${this.generation} запущено успешно! ---`)
	}

	/**
	 * Отрисовка всех объектов на холсте
	 */
	draw() {
		// Очищаем Canvas
		this.ctx.fillStyle = '#222' // Темный фон
		this.ctx.fillRect(0, 0, this.width, this.height)

		// Рисуем еду (красные кружочки)
		this.ctx.fillStyle = '#ff5555'
		for (const f of this.food) {
			this.ctx.beginPath()
			this.ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2)
			this.ctx.fill()
		}

		// Рисуем живых агентов
		for (const agent of this.agents) {
			agent.draw(this.ctx)
		}

		// Выводим текст с номером поколения
		this.ctx.fillStyle = '#fff'
		this.ctx.font = '16px sans-serif'
		this.ctx.fillText(`Поколение: ${this.generation}`, 20, 30)
		this.ctx.fillText(`Живых агентов: ${this.agents.filter((a) => !a.isDead).length}`, 20, 55)
	}
}
