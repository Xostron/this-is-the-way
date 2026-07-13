const fnConfig = require("../scrapper/config");
const { fnUrlCards } = require("../scrapper");

// Ссылка на каталог
const data = [
    "https://market.yandex.ru/catalog--detskie-igrushki-i-igry-v-volzhskom/59692/list?hid=90783&rs=eJwzcvzEaMfBILDwEKsEg8L8o6waqxp7WDU-NgCJLVumsWrcbgOyruyawK7x8vNxNo0pnf9ZND6BlHzfMJFV4yZQFgBNOxso&crossborder=internal",
	"https://market.yandex.ru/catalog--robototekhnika-i-3d-konstruirovanie-v-volzhskom/27022210/list?rs=eJwBNQDK_zIz8gEwCAEQocIFGAAo8s62BCi0tJYFKJSJ_wQohJjEByi3wbMHKM71rwMo27ilByjKxp0PGWoWCA%2C%2C&crossborder=internal",
	"https://market.yandex.ru/catalog--avtomobilnaia-elektronika/27021650/list?rs=eJwzkvjEKMrBKLDwEKsEg8bJxzYaiw-xakx-1s4KAGZFCLs%2C&crossborder=internal"

];

main();

async function main() {
    const arr = fnConfig(data, null, true);
    for (const el of arr) {
        await fnUrlCards(el, 5);
    }
}
