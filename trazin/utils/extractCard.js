const fnConfig = require("../scrapper/config");
const { fnUrlCards } = require("../scrapper");

// Ссылка на каталог
const data = [
    "https://market.yandex.ru/search?text=%D0%BA%D0%B0%D0%BC%D0%B5%D1%80%D0%B0%20%D0%B2%D0%B8%D0%B4%D0%B5%D0%BE%D0%BD%D0%B0%D0%B1%D0%BB%D1%8E%D0%B4%D0%B5%D0%BD%D0%B8%D1%8F&hid=6202209&hid=15450276&hid=6206018&how=rating&rs=eJwzcqpi5Xh47BfTJ0YFDgaBhYdYJRgUQHyFJY3r2RUOPfnFpDHnLKsGiPeXkQEIeplA5FQwuYIJpBQASOAW1A%2C%2C&rt=9"
];

main();

async function main() {
    const arr = fnConfig(data, null, true);
    for (const el of arr) {
        await fnUrlCards(el, 4);
    }
}
