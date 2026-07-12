const fnConfig = require("../scrapper/config");
const { fnUrlCards } = require("../scrapper");

// Ссылка на каталог
const data = [
    "https://market.yandex.ru/catalog--avtomobilnaia-elektronika-v-volzhskom/58922/list?hid=10613523&rs=eJwBRwC4_zJF8gFCCAAQocIFGAAgk-aHBSiKvq4CKLCX8wcou9P-Aii8orAGKLzDjAMo5cIFKN7CBSjRtfYDKP3cswYot9CACCifwYcC9koeZQ%2C%2C",
];

main();

async function main() {
    const arr = fnConfig(data, null, true);
    for (const el of arr) {
        await fnUrlCards(el, 5);
    }
}
