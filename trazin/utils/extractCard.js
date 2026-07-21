const fnConfig = require("../scrapper/config");
const { fnUrlCards } = require("../scrapper");

// Ссылка на каталог
const data = [
    "https://market.yandex.ru/search?promo-type-name=favourite_categories&utm_medium=sharing&generalContext=t%3Dpromo%3Bi%3D1%3Bspi%3Dlinear_by_price_shown_diy%3B&rs=eJwzEv7EKMDBKLDwEKsEg8bZ06waq46wAgA8fwZC&shopPromoId=linear_by_price_shown_diy"
];

main();

async function main() {
    const arr = fnConfig(data, null, true);
    for (const el of arr) {
        await fnUrlCards(el, 5);
    }
}
