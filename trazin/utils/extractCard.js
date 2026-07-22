const fnConfig = require("../scrapper/config");
const { fnUrlCards } = require("../scrapper");

// Ссылка на каталог
const data = [
    "https://business.market.yandex.ru/catalog--tovary-dlia-doma/54422/list?generalContext=&hid=90667&rs=eJwzsv_EaMPBILD6CKsEk8KqI6wac1ZNYdXo2PuVSeNlw3VWjQP_J7Fp3NsD5O4HsdYCVRz8B2SsAzLeARUAAEGPG5Y%2C"
];

main();

async function main() {
    const arr = fnConfig(data, null, true);
    for (const el of arr) {
        await fnUrlCards(el, 4);
    }
}
