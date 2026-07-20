import { World } from './World'

// Ждем полной загрузки DOM страницы
window.addEventListener('DOMContentLoaded', () => {
	// Переменная скорости (по умолчанию х1)
	let simSpeed = 1
	const canvas = document.getElementById('simCanvas')
	if (!canvas) return console.error('Ошибка: Canvas элемент не найден в HTML!')

	// Слушаем нажатия клавиш для управления скоростью
	window.addEventListener('keydown', (e) => {
		if (e.key === '1') {
			simSpeed = 1
			console.log('Скорость: Обычная (1х)')
		}
		if (e.key === '2') {
			simSpeed = 5
			console.log('Скорость: Быстрая (5х)')
		}
		if (e.key === '3') {
			simSpeed = 20
			console.log('Скорость: Супер (20х)')
		}
		if (e.key === '4') {
			simSpeed = 100
			console.log('Скорость: Максимальная (100х)')
		}
		if (e.key === '5') {
			simSpeed = 0
			console.log('Пауза')
		}
	})

	try {
		const world = new World(canvas)

		function gameLoop() {
			// Скорость симуляции за 1 кадр отрисовки = simSpeed кол-во обновлений симуляции
			if (simSpeed) {
				for (let i = 0; i < simSpeed; i++) {
					world.update()
				}
			}
			world.draw()
			// Выводим текущую скорость на экран поверх остальных текстов
			const ctx = canvas.getContext('2d')
			ctx.fillStyle = '#ffcc00'
			ctx.font = '16px sans-serif'
			ctx.fillText(`Скорость расчетов: ${simSpeed}x (Кнопки 1-4)`, 20, 80)

			requestAnimationFrame(gameLoop)
		}

		gameLoop()
	} catch (error) {
		console.error('КРИТИЧЕСКАЯ ОШИБКА ПРИ СОЗДАНИИ МИРА:', error)
	}
})
