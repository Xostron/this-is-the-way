const fnConfig = require("../scrapper/config");
const { fnUrlCards } = require("../scrapper");

// Ссылка на каталог
const data = [
    "https://market.yandex.ru/catalog--bytovaia-khimiia-v-volzhskom/21448850/list?hid=90685&how=rating&rs=eJwz0v7EqMHBILDwEKsEg8LeI6waB4G4--gZdo2zS8-za_x7uZZN4xBQaMertWwAa8ISFg%2C%2C"
];

main();

async function main() {
    const arr = fnConfig(data, null, true);
    for (const el of arr) {
        await fnUrlCards(el, 5);
    }
}
