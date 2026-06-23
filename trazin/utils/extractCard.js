const fnConfig = require("../scrapper/config");
const { fnUrlCards } = require("../scrapper");

// Ссылка на каталог
const data = [
  "https://market.yandex.ru/business--rival/890754?generalContext=t%3DshopInShop%3Bi%3D1%3Bbi%3D890754%3B&rs=eJwzEv7EKMDBKLDwEKsEg8aiQ6wa94-wAgA7uwZD&searchContext=sins_ctx",
];

main();

async function main() {
  const arr = fnConfig(data, null, true);
  for (const el of arr) {
    await fnUrlCards(el, 2);
  }
}
