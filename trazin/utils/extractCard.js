const fnConfig = require("../scrapper/config");
const { fnUrlCards } = require("../scrapper");

// Ссылка на каталог
const data = [
  "https://market.yandex.ru/search?generalContext=t%3DcprPage%3Bfltr%3D1%3Bcpk%3Dweekly%3B&page-key=weekly&text=%D0%B4%D0%B5%D1%82%D1%81%D0%BA%D0%B8%D0%B9%20%D0%BC%D0%B8%D1%80&hid=90783&hid=15797254&hid=7692671&hid=90795&hid=989939&hid=90787&hid=13488366&hid=52710834&hid=90707&hid=91307&rs=eJwzUq1i5ZjX2MP6iZGFg0GC4S8jAxD0MoHIqWByBdP8o6wApgcH3Q%2C%2C&rt=9&general-context-filter=1",
];

main();

async function main() {
  const arr = fnConfig(data, null, true);
  for (const el of arr) {
    await fnUrlCards(el, 3);
  }
}
