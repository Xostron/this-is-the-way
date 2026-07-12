const fnConfig = require("../scrapper/config");
const { fnUrlCards } = require("../scrapper");

// Ссылка на каталог
const data = [
    "https://market.yandex.ru/search?text=%D0%BC%D0%B5%D0%B4%D0%B8%D1%86%D0%B8%D0%BD%D1%81%D0%BA%D0%B8%D0%B5%20%D0%BF%D1%80%D0%B8%D0%B1%D0%BE%D1%80%D1%8B&hid=90537&hid=38844470&hid=1001393&rs=eJwzcg1grGLleNx_n_sToxIHg8DCQ6wSDAorD7MqbPtwSEhhY7-tBpCjsXO5hcaaj-2sfxkZgKCXCUROBZMrmIDyAFPvFgo%2C&rt=9&crossborder=internal"
];

main();

async function main() {
    const arr = fnConfig(data, null, true);
    for (const el of arr) {
        await fnUrlCards(el, 5);
    }
}
