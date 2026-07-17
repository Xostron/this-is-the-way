const fnConfig = require("../scrapper/config");
const { fnUrlCards } = require("../scrapper");

// Ссылка на каталог
const data = [
    "https://market.yandex.ru/catalog--elektronika/54440/list?generalContext=&hid=198119&rs=eJwBSwC0_zJJ8gFGCAAQocIFGAAg54sMKO_DBSjFygUo7M85KMnjPCjRk18o4N6vAijB-4YFKKLCBSiqxAUojMUFKLHFBSiBxwUozcsFKOaLDGhQHs8%2C"
];

main();

async function main() {
    const arr = fnConfig(data, null, true);
    for (const el of arr) {
        await fnUrlCards(el, 5);
    }
}
