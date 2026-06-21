const path = require("path");

/**
 *
 * @param {string[]} data Массив ссылок
 * @returns {object[]} Массив рамы для обработки ссылок
 */
function fnConfig21(data = []) {
  if (!data?.length) return null;
  // Массив urls, индекс массива = название папки, куда будет сохранен результат скраппинга
  const r = data.map((el, i) => {
    // Создать папку с именем = i
    const dir = path.resolve(__dirname, "..", "temp_html");
    const dirImg = path.resolve(__dirname, "..", "temp_html", el.name);
    return {
      id: i,
      url: el.url,
      dir,
      dirImg,
      // В эту папку сохраняем html
      ph: (filename) => path.resolve(dir, el.name + ".html"),
      // userAgent для pupeeter
      userAgent:
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36",
    };
  });

  return r;
}
module.exports = fnConfig21;
