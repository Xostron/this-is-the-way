import { Agent } from './Agent'
import { Predator } from './predator'

export class World {
	constructor(canvas) {
		this.canvas = canvas
		this.ctx = canvas.getContext('2d')
		this.width = canvas.width
		this.height = canvas.height

		// Настройки популяции
		this.totalAgents = 20
		this.totalPredator = 4
		this.totalFood = 40
		this.generation = 1

		// Списки объектов
		this.agents = []
		this.food = []
		this.predators = []

		this.init()
	}

	/**
	 * Первая инициализация мира
	 */
	init() {
		this.food = []
		this.agents = []
		this.predators = []
		// Создаем еду
		for (let i = 0; i < this.totalFood; i++) this.spawnFood()

		// Создаем агентов
		for (let i = 0; i < this.totalAgents; i++)
			this.agents.push(new Agent(Math.random() * this.width, Math.random() * this.height))

		// Создаем хищников
		for (let i = 0; i < this.totalPredator; i++)
			this.predators.push(
				new Predator(Math.random() * this.width, Math.random() * this.height),
			)
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
		const alivePredators = this.predators.filter((p) => !p.isDead)

		// Если все умерли — запускаем новое поколение
		if (aliveAgents.length === 0 && alivePredators.length === 0) {
			this.nextGeneration()
			return
		}

		// 2. Обновляем каждого агента
		for (const agent of aliveAgents) {
			// Координаты ближайшей травы
			const closestFood = this.getClosestFood(agent)
			// Передаем животному координаты травы
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

		// 2. Обновляем Хищников (они ищут живых жертв)
		for (const pred of alivePredators) {
			const closestPrey = this.getClosestPrey(pred, aliveAgents)
			pred.update(this.width, this.height, closestPrey)

			// Проверяем, поймал ли хищник жертву
			if (closestPrey) {
				const dist = Math.sqrt(
					(closestPrey.x - pred.x) ** 2 + (closestPrey.y - pred.y) ** 2,
				)
				if (dist < pred.radius + closestPrey.radius) {
					pred.eat() // Восстанавливает энергию хищнику
					closestPrey.die() // Жертва мгновенно умирает
				}
			}
		}
	}

	getClosestPrey(pred, aliveAgents) {
		if (this.agents.length === 0) return null
		// Находим ближайшую ЖИВУЮ жертву
		let closestPrey = null
		let minDist = Infinity
		for (const prey of aliveAgents) {
			const dist = Math.sqrt((prey.x - pred.x) ** 2 + (prey.y - pred.y) ** 2)
			if (dist < minDist) {
				minDist = dist
				closestPrey = prey
			}
		}
		return closestPrey
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
		console.log('--- СМЕНА ПОКОЛЕНИЙ ---')

		// --- ЭВОЛЮЦИЯ ЖЕРТВ ---
		this.agents.sort((a, b) => b.fitness - a.fitness)
		const survivors = this.agents.slice(0, 2)
		const newAgents = []
		survivors.forEach((s, i) =>
			newAgents.push(
				new Agent(
					Math.random() * this.width,
					Math.random() * this.height,
					s.brain.mutate(0, `elite_prey_${i}`),
					true,
					s.win,
				),
			),
		)
		let childIdx = 0
		while (newAgents.length < this.totalAgents) {
			const parent = survivors[Math.floor(Math.random() * survivors.length)]
			newAgents.push(
				new Agent(
					Math.random() * this.width,
					Math.random() * this.height,
					parent.brain.mutate(0.1, `child_prey_${childIdx++}`),
				),
			)
		}
		this.agents.forEach((a) => a.brain.dispose())
		this.agents = newAgents

		// --- ЭВОЛЮЦИЯ ХИЩНИКОВ ---
		this.predators.sort((a, b) => b.fitness - a.fitness)
		const predSurvivors = this.predators.slice(0, 1) // Оставляем 1 лучшего волка
		const newPredators = []
		predSurvivors.forEach((s, i) =>
			newPredators.push(
				new Predator(
					Math.random() * this.width,
					Math.random() * this.height,
					s.brain.mutate(0, `elite_pred_${i}`),
					true,
					s.win,
				),
			),
		)
		let predChildIdx = 0
		while (newPredators.length < this.totalPredator) {
			const parent = predSurvivors[0]
			newPredators.push(
				new Predator(
					Math.random() * this.width,
					Math.random() * this.height,
					parent.brain.mutate(0.1, `child_pred_${predChildIdx++}`),
				),
			)
		}
		this.predators.forEach((p) => p.brain.dispose())
		this.predators = newPredators

		// Сброс еды
		this.food = []
		for (let i = 0; i < this.totalFood; i++) this.spawnFood()
		this.generation++
	}

	/**
	 * Отрисовка всех объектов на холсте
	 */
	draw() {
		this.ctx.fillStyle = '#222'
		this.ctx.fillRect(0, 0, this.width, this.height)

		// Рисуем еду (трава)
		this.ctx.fillStyle = '#55ff55' // Сделаем траву зеленой!
		for (const f of this.food) {
			this.ctx.beginPath()
			this.ctx.arc(f.x, f.y, f.radius, 0, Math.PI * 2)
			this.ctx.fill()
		}

		// Маркируем лидеров среди жертв
		const aliveSorted = this.agents
			.filter((a) => !a.isDead)
			.sort((a, b) => b.fitness - a.fitness)
		this.agents.forEach((a) => (a.leaderRank = null))
		if (aliveSorted[0]) aliveSorted[0].leaderRank = 1
		if (aliveSorted[1]) aliveSorted[1].leaderRank = 2

		// Рисуем жертв
		for (const agent of this.agents) agent.draw(this.ctx)

		// Рисуем хищников
		for (const pred of this.predators) pred.draw(this.ctx)

		// Интерфейс
		this.ctx.fillStyle = '#fff'
		this.ctx.font = '16px sans-serif'
		this.ctx.fillText(`Поколение: ${this.generation}`, 20, 30)
		this.ctx.fillText(`Жертв: ${aliveSorted.length}`, 20, 55)
		this.ctx.fillText(`Хищников: ${this.predators.filter((p) => !p.isDead).length}`, 20, 80)
	}
}
