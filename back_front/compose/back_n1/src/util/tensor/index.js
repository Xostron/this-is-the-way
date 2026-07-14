import * as tf from '@tensorflow/tfjs';

// Создаем модель
const model = tf.sequential();

// Входной слой: принимает 5 чисел (Т_ул, Вл_ул, Т_уставки, Вл_уставки, Т_прод, Т_точки_росы)
model.add(tf.layers.dense({ inputShape: , units: 16, activation: 'relu' }));

// Скрытый слой для поиска сложных зависимостей
model.add(tf.layers.dense({ units: 8, activation: 'relu' }));

// Выходной слой: 4 нейрона (0 - Все ок, 1 - Т не подходит, 2 - Вл не подходит, 3 - Роса опасна)
model.add(tf.layers.dense({ units: 4, activation: 'softmax' })); 

// Компиляция с оптимизатором
model.compile({
    optimizer: tf.train.adam(0.01),
    loss: 'categoricalCrossentropy', // Стандарт для классификации
    metrics: ['accuracy']
});
