const fnConfig = require("../scrapper/config");
const { fnUrlCards } = require("../scrapper");

// Ссылка на каталог
const data = [
    "https://market.yandex.ru/catalog--muzhskie-rubashki/54404711/list?hid=65993786&rs=eJwz4n_ByPiJkZODQYJBYdeP3fIAJrgE9A%2C%2C&crossborder=internal"
];

main();

async function main() {
    const arr = fnConfig(data, null, true);
    for (const el of arr) {
        await fnUrlCards(el, 4);
    }
}
