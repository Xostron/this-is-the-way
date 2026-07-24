const fnConfig = require("../scrapper/config");
const { fnUrlCards } = require("../scrapper");

// Ссылка на каталог
const data = [
    "https://market.yandex.ru/search?text=%D0%BE%D1%87%D0%BA%D0%B8&hid=433018&hid=15625429&hid=90534&hid=10972670&hid=15720387&hid=6527202&rs=eJwzSqpi4fi1TeoFI-MnRnsOBoGFh1glGBSAIgpXb-5kV1h2mFXh3-25rAqH9-9nV3i0sY9ZAyincRAop_HyNKsGUF4DJK8BkvrLyAAEvUwgciqYXMEEVA0Awj8lWA%2C%2C&rt=9"
];

main();

async function main() {
    const arr = fnConfig(data, null, true);
    for (const el of arr) {
        await fnUrlCards(el, 4);
    }
}
