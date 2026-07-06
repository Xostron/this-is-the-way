const fnConfig = require("../scrapper/config");
const { fnUrlCards } = require("../scrapper");

// Ссылка на каталог
const data = [
    "https://market.yandex.ru/search?text=warhammer%2040000&hid=10682647&hid=10683227&hid=278335&hid=10683226&hid=10470548&hid=278342&hid=14960839&hid=18540110&hid=12494574&hid=53546007&rs=eJwzqqhi5Zje1MP6iTGMg0Fg4SFWCQYFEF_hdhuQ2P9PQOEWiDGl8z-LwjEg7_jEiewK58685lB4d_YXq8L0GUckNS5OjteYf5RV49YRVo0_QHwEiEFKNNa3H5H8y8gABL1MIHIqmFzBBLIAAHecLd8%2C&rt=9",
];

main();

async function main() {
    const arr = fnConfig(data, null, true);
    for (const el of arr) {
        await fnUrlCards(el, 3);
    }
}
