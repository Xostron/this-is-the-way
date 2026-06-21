const puppeteer = require("puppeteer");
const fs = require("fs");
const fsp = require("fs").promises;
const path = require("path");

async function fnImg(page, cfg) {
  const resources = await page.evaluate(() => {
    const r = [];
    // Собираем все изображения
    document.querySelectorAll("img[src]").forEach((img) => {
      r.push({
        url: new URL(img.src, window.location.href).href,
        type: "image",
        href: img.src,
      });
    });
    return r;
  });
  // Скачивание и сохранение всех ресурсов
  let count = 0;
  for (const resource of resources) {
    try {
      const response = await page.goto(resource.url, {
        waitUntil: "domcontentloaded",
      });
      if (response && response.ok()) {
        const buffer = await response.buffer();
        const fileName = `image${++count}.png`;

        const filePath = path.join(cfg.dirImg, fileName);
        await save(buffer, filePath);
        console.log(`✅Скачан: ${fileName}`);
      }
    } catch (error) {
      console.error(`❌Ошибка скачивания ${resource.url}:`, error.message);
    }
  }
}

// сохранение файла
async function save(data, filename) {
  await fsp.writeFile(filename, data);
}

module.exports = fnImg;
