const fnConfig = require("../scrapper/config");
const { fnUrlCards } = require("../scrapper");

// Ссылка на каталог
const data = [
    "https://market.yandex.ru/search?generalContext=t%3DshopInShop%3Bi%3D1%3Bbi%3D850885%3B&text=%D0%9C%D1%8F%D1%81%D0%BE%D1%80%D1%83%D0%B1%D0%BA%D0%B8&rs=eJwzUvrEKM_BKLDwEKsEg8adw6waL4G4ofuMokbTk3OKGrfvn1YEANrdDhA%2C&businessId=850885&searchContext=sins_ctx&merchant-filter=850885"
];

main();

async function main() {
    const arr = fnConfig(data, null, true);
    for (const el of arr) {
        await fnUrlCards(el, 3);
    }
}
