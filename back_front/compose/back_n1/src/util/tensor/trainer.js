const tf = require('@tensorflow/tfjs-node');
const fs = require('fs');

// 1. ОПРЕДЕЛЯЕМ АРХИТЕКТУРУ ИИ (Конструктор)
function createModel() {
    const model = tf.sequential();
    
    // Входной слой: принимает 7 чисел
    model.add(tf.layers.dense({ inputShape:, units: 32, activation: 'sigmoid' }));
    // Скрытый слой: ищет сложные взаимосвязи параметров
    model.add(tf.layers.dense({ units: 16, activation: 'sigmoid' }));
    // Выходной слой: выдает 2 числа (Прогноз Т и Вл в ангаре)
    model.add(tf.layers.dense({ units: 2 })); 

    model.compile({
        optimizer: tf.train.adam(0.01),
        loss: 'meanSquaredError' // Идеально для прогноза точных цифр
    });
    
    return model;
}

// Конвертер погоды в число (как мы обсуждали)
function getWeatherWeight(status) {
    switch (status?.toLowerCase()) {
        case 'солнечно': return 1.0;
        case 'облачно':  return 0.6;
        case 'туман':    return 0.3;
        case 'дождь':    return 0.0;
        default:         return 0.5;
    }
}

// 2. ГЛАВНАЯ ФУНКЦИЯ ОБУЧЕНИЯ (Точка входа)
async function startTraining() {
    console.log("=== Старт подготовки ИИ ===");
    
    // ИИ не понимает текст и градусы. Ей нужны матрицы чисел (Тензоры).
    // Все числа делим на 100, чтобы они были в диапазоне от 0 до 1 (Нормализация).
    
    // Входные маркеры (X): [Т_вн, Вл_вн, Т_ул, Вл_ул, Прогноз_Т_ул, Прогноз_Вл_ул, Погода_Число]
    const rawInputs = [
        [18/100, 60/100, 15/100, 70/100, 22/100, 50/100, getWeatherWeight('солнечно')],
        [19/100, 55/100, 20/100, 55/100, 12/100, 85/100, getWeatherWeight('дождь')],
        // Сюда в будущем загрузим тысячи строк из ваших реальных логов ПЛК
    ];

    // Что РЕАЛЬНО стало в ангаре через 3 часа (Y): [Т_внутри, Вл_внутри]
    const rawOutputs = [
        [20/100, 58/100], 
        [16/100, 65/100]
    ];

    // Переводим обычные массивы JS в Тензоры TensorFlow
    const xs = tf.tensor2d(rawInputs);
    const ys = tf.tensor2d(rawOutputs);

    const model = createModel();

    console.log("Обучение ИИ началось. Пожалуйста, подождите...");
    
    // fit() — это процесс обучения. ИИ сделает 500 проходов (эпох) по вашим логам
    await model.fit(xs, ys, {
        epochs: 500,
        shuffle: true,
        callbacks: {
            // Выводим прогресс каждые 50 шагов
            onEpochEnd: (epoch, logs) => {
                if (epoch % 50 === 0) console.log(`Эпоха ${epoch}: Ошибка модели = ${logs.loss.toFixed(5)}`);
            }
        }
    });

    console.log("Обучение успешно завершено!");

    // 3. СОХРАНЯЕМ ИИ НА ДИСК
    // Создаст папку 'my-climate-model' с весами ИИ, чтобы запускать её без обучения
    await model.save('file://./my-climate-model');
    console.log("Модель сохранена в папку './my-climate-model'");
    
    // Чистим память за TensorFlow
    xs.dispose();
    ys.dispose();
}

// Запуск скрипта
startTraining().catch(err => console.error("Ошибка:", err));
