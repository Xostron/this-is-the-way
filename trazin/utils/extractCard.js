const fnConfig = require("../scrapper/config");
const { fnUrlCards } = require("../scrapper");

// Ссылка на каталог
const data = [
    "https://market.yandex.ru/search?text=%D0%BF%D0%B0%D0%BA%D0%B5%D1%82%D1%8B&hid=5013720&hid=12501724&hid=6943877&hid=12807791&how=rating&rs=eJwzCqpi5bjRuInpE6MBB4PAwkOsEgwKIL7CndbfrAqtL5czK7y_08umAeJqgCQ0QGIaILG_jAxA0MsEIqeCyRVMIBUANO4dlw%2C%2C&rt=9"
];

main();

async function main() {
    const arr = fnConfig(data, null, true);
    for (const el of arr) {
        await fnUrlCards(el, 5);
    }
}
