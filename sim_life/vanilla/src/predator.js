import { Brain } from './brain'
import { Agent } from './agent'
// Хищник
export class Predator extends Agent {
	constructor(x, y, brain = null, elite, win) {
		super(x, y, brain, elite, win)

		this.radius = 12
		this.maxSpeed = 4

		this.brain = brain || new Brain(this.inputSize, 6, this.outputSize)
	}

	/**
	 * Главный метод обновления состояния агента за один такт (кадр)
	 */
	update(worldWidth, worldHeight, closestPrey) {
		if (this.isDead) return

		// Метод getInputs теперь возвращает массив из 3 элементов
		const inputs = this.getInputs(closestPrey)
		const outputs = this.brain.predict(inputs)

		const steerAction = outputs[0] // От -1 (влево) до 1 (вправо)
		const speedAction = outputs[1] // От -1 (назад) до 1 (вперед)

		// 1. Снижаем угловую скорость (было 0.1, ставим 0.05).
		this.angle += steerAction * 0.05

		// 2. Ограничиваем скорость движения
		this.speed = ((speedAction + 1) / 2) * this.maxSpeed

		// Перемещение
		this.x += Math.cos(this.angle) * this.speed
		this.y += Math.sin(this.angle) * this.speed

		// Расход энергии (метаболизм)
		this.energy -= 0.001 + (this.speed / this.maxSpeed) * 0.002
		// this.energy = 1
		// Начисление фитнеса (поощряем за близость к еде)
		if (closestPrey) {
			const dx = closestPrey.x - this.x
			const dy = closestPrey.y - this.y
			const dist = Math.sqrt(dx * dx + dy * dy)
			this.fitness += Math.max(0, 1 - dist / 800) * 0.01
		}

		// Границы экрана
		this.x = Math.max(0, Math.min(this.x, worldWidth))
		this.y = Math.max(0, Math.min(this.y, worldHeight))

		if (this.energy <= 0) {
			this.die()
		}
	}

	/**
	 * Отрисовка агента на Canvas
	 */
	draw(ctx) {
		if (this.isDead) return

		ctx.save()
		ctx.translate(this.x, this.y)

		// --- ОТРИСОВКА ЦИФРЫ ЛИДЕРА ---
		// Рисуем текст БЕЗ поворота (rotate), чтобы цифры не крутились вместе с агентом
		if (this.elite != null && this.elite != undefined) {
			ctx.fillStyle = '#ff6600' // Золотой для 1, бирюзовый для 2
			ctx.font = 'bold 14px sans-serif'
			ctx.textAlign = 'center'
			// Выводим цифру чуть выше агента (на 15 пикселей вверх)
			ctx.fillText(`Wolf${this.win}`, 0, -this.radius - 5)
		}

		ctx.rotate(this.angle)
		// Тело хищника
		ctx.beginPath()
		ctx.arc(0, 0, this.radius, 0, Math.PI * 2)
		ctx.fillStyle = `rgb(${255 * this.energy}, 0, ${255 * (1 - this.energy)})`
		ctx.fill()
		ctx.lineWidth = 2
		ctx.strokeStyle = '#ff00ff'
		ctx.stroke()

		// Глаз
		ctx.beginPath()
		ctx.moveTo(0, 0)
		ctx.lineTo(this.radius + 4, 0)
		ctx.strokeStyle = '#fff'
		ctx.stroke()

		ctx.restore()
	}
}
