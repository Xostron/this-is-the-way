const fnConfig = require("../scrapper/config");
const { fnUrlCards } = require("../scrapper");

// Ссылка на каталог
const data = [
    "https://market.yandex.ru/search?text=%D0%B3%D1%83%D0%B1%D0%BA%D0%B8%20%D0%B4%D0%BB%D1%8F%20%D0%BC%D1%8B%D1%82%D1%8C%D1%8F%20%D0%BF%D0%BE%D1%81%D1%83%D0%B4%D1%8B&hid=12943705&rs=eJwz8qhi5bjZNI3tE6MaB4PAwkOsEgwKIL7GwXffZTWmrv8hq_H6PZB41QckDp7_IfuXkQEIeplA5FQwuYIJpAEAGeoaiw%2C%2C&rt=9"
];

main();

async function main() {
    const arr = fnConfig(data, null, true);
    for (const el of arr) {
        await fnUrlCards(el, 3);
    }
}
