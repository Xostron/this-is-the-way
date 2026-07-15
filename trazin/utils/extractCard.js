const fnConfig = require("../scrapper/config");
const { fnUrlCards } = require("../scrapper");

// Ссылка на каталог
const data = [
    "https://market.yandex.ru/catalog--posuda-i-kukhonnye-prinadlezhnosti-v-volzhskom/54498/list?hid=90692&how=rating&rs=eJwzMvjEqMvBILDwEKsEg8KRI6wa-1p_s2o82xevsfJeM5vGgi37mTUWgoizQLklQAYA0ZkUEw%2C%2C"
];

main();

async function main() {
    const arr = fnConfig(data, null, true);
    for (const el of arr) {
        await fnUrlCards(el, 5);
    }
}
