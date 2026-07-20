import { Brain } from './Brain'

export class Agent {
	constructor(x, y, elite, brain = null) {
		this.x = x
		this.y = y
		this.elite = elite
		this.radius = 8
		this.angle = Math.random() * Math.PI * 2 // Направление взгляда в радианах
		this.speed = 0
		this.maxSpeed = 3

		// Жизненные показатели
		this.energy = 1.0 // Стартовая энергия (от 0 до 1)
		this.fitness = 0 // Очки приспособленности (сколько съел)
		this.isDead = false

		// Инициализация мозга: 2 входа (дистанция и угол до еды), 2 выхода (скорость и поворот)
		this.inputSize = 2
		this.outputSize = 2
		this.brain = brain || new Brain(this.inputSize, 4, this.outputSize)
	}

	/**
	 * Главный метод обновления состояния агента за один такт (кадр)
	 */
	update(worldWidth, worldHeight, closestFood) {
		if (this.isDead) return

		const inputs = this.getInputs(closestFood)
		const outputs = this.brain.predict(inputs)

		const steerAction = outputs[0] // От -1 (влево) до 1 (вправо)
		const speedAction = outputs[1] // От -1 (назад) до 1 (вперед)

		// 1. Снижаем угловую скорость (было 0.1, ставим 0.05).
		// Руль станет плавным, агент перестанет хаотично кружиться.
		this.angle += steerAction * 0.05

		// 2. Ограничиваем скорость движения
		this.speed = ((speedAction + 1) / 2) * this.maxSpeed

		// Перемещение
		this.x += Math.cos(this.angle) * this.speed
		this.y += Math.sin(this.angle) * this.speed

		// Расход энергии (метаболизм)
		this.energy -= 0.001 + (this.speed / this.maxSpeed) * 0.002

		// Начисление фитнеса (поощряем за близость к еде)
		if (closestFood) {
			const dx = closestFood.x - this.x
			const dy = closestFood.y - this.y
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
	 * Формирует массив датчиков для передачи в Brain
	 */
	getInputs(closestFood) {
		if (!closestFood) {
			return [-1, 0] // Если еды вообще нет: дистанция "супер-далеко" (-1), угол прямо (0)
		}

		const dx = closestFood.x - this.x
		const dy = closestFood.y - this.y
		const distance = Math.sqrt(dx * dx + dy * dy)

		// 1. Нормализация дистанции от -1 (далеко) до 1 (в упор)
		// Сначала переводим в диапазон, где 0 - близко, 1 - далеко (до 600px)
		let normDist = Math.min(1, distance / 600)
		// А теперь инвертируем и масштабируем в диапазон [-1, 1]
		// В упор (dist=0) -> 1.0. На расстоянии 600px и дальше -> -1.0
		const finalDistanceSignal = 1 - normDist * 2

		// 2. Расчет угла
		const angleToFood = Math.atan2(dy, dx)
		let relativeAngle = angleToFood - this.angle

		while (relativeAngle < -Math.PI) relativeAngle += Math.PI * 2
		while (relativeAngle > Math.PI) relativeAngle -= Math.PI * 2

		// Угол уже в диапазоне [-PI, PI], делим на PI и получаем идеальные [-1, 1]
		const finalAngleSignal = relativeAngle / Math.PI

		return [finalDistanceSignal, finalAngleSignal]
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
			ctx.fillStyle = '#ffcc00' // Золотой для 1, бирюзовый для 2
			ctx.font = 'bold 14px sans-serif'
			ctx.textAlign = 'center'
			// Выводим цифру чуть выше агента (на 15 пикселей вверх)
			ctx.fillText(this.elite, 0, -this.radius - 5)
		}
		
		ctx.rotate(this.angle)

		// Рисуем тело (цвет зависит от энергии: зеленый — сытый, красный — голодный)
		ctx.beginPath()
		ctx.arc(0, 0, this.radius, 0, Math.PI * 2)
		ctx.fillStyle = `rgb(${255 * (1 - this.energy)}, ${255 * this.energy}, 0)`
		ctx.fill()
		ctx.lineWidth = 2
		ctx.strokeStyle = '#fff'
		ctx.stroke()

		// Рисуем «глаз» или указатель направления, чтобы видеть куда он смотрит
		ctx.beginPath()
		ctx.moveTo(0, 0)
		ctx.lineTo(this.radius + 4, 0)
		ctx.strokeStyle = '#000'
		ctx.stroke()

		ctx.restore()
	}

	/**
	 * Вызывается, когда агент натыкается на еду
	 */
	eat() {
		this.energy = Math.min(1.0, this.energy + 0.3) // Восстанавливаем энергию
		this.fitness += 1 // Увеличиваем показатель успешности для эволюции
	}

	die() {
		this.isDead = true
		// this.brain.dispose(); // Важно! Очищаем тензоры этого агента
	}
}
