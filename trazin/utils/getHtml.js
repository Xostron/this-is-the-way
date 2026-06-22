const fnConfig21 = require("../scrapper/config21");
const fnHtml = require("../scrapper/html");

// Ссылка
const data = [
	{
    url: "https://platform.21-school.ru/project/73297/task?studentId=423afb55-531e-4798-b247-b993e1d32303",
    name: "UIX_1",
  },
  {
    url: "https://platform.21-school.ru/project/73243/task?studentId=423afb55-531e-4798-b247-b993e1d32303",
    name: "UIX2",
  },
  {
    url: "https://platform.21-school.ru/project/73244/task?studentId=423afb55-531e-4798-b247-b993e1d32303",
    name: "UIX3",
  },
  {
    url: "https://platform.21-school.ru/project/73245/task?studentId=423afb55-531e-4798-b247-b993e1d32303",
    name: "UIX4",
  },
  {
    url: "https://platform.21-school.ru/project/73246/task?studentId=423afb55-531e-4798-b247-b993e1d32303",
    name: "UIX5",
  },
  {
    url: "https://platform.21-school.ru/project/73247/task?studentId=423afb55-531e-4798-b247-b993e1d32303",
    name: "UIX6",
  },

  {
    url: "https://platform.21-school.ru/project/73366/task?studentId=423afb55-531e-4798-b247-b993e1d32303",
    name: "UIX7",
  },
  {
    url: "https://platform.21-school.ru/project/73367/task?studentId=423afb55-531e-4798-b247-b993e1d32303",
    name: "UIX8",
  },
  {
    url: "https://platform.21-school.ru/project/73368/task?studentId=423afb55-531e-4798-b247-b993e1d32303",
    name: "UIX9",
  },

//   {
//     url: "https://platform.21-school.ru/project/69550/task?studentId=423afb55-531e-4798-b247-b993e1d32303",
//     name: "BSA10",
//   },
//   {
//     url: "https://platform.21-school.ru/project/69551/task?studentId=423afb55-531e-4798-b247-b993e1d32303",
//     name: "BSA11",
//   },
//   {
//     url: "https://platform.21-school.ru/project/69552/task?studentId=423afb55-531e-4798-b247-b993e1d32303",
//     name: "BSA12",
//   },
//   {
//     url: "https://platform.21-school.ru/project/69553/task?studentId=423afb55-531e-4798-b247-b993e1d32303",
//     name: "BSA13",
//   },
//   {
//     url: "https://platform.21-school.ru/project/69554/task?studentId=423afb55-531e-4798-b247-b993e1d32303",
//     name: "BSA14",
//   },
//   {
//     url: "https://platform.21-school.ru/project/69555/task?studentId=423afb55-531e-4798-b247-b993e1d32303",
//     name: "BSA15",
//   },
//   {
//     url: "https://platform.21-school.ru/project/69556/task?studentId=423afb55-531e-4798-b247-b993e1d32303",
//     name: "BSA16",
//   },
  //    {
  //     url: "https://platform.21-school.ru/project/71044/task?studentId=423afb55-531e-4798-b247-b993e1d32303",
  //     name: "BSA17",
  //   },
  //    {
  //     url: "https://platform.21-school.ru/project/71045/task?studentId=423afb55-531e-4798-b247-b993e1d32303",
  //     name: "BSA18",
  //   },
];

main();

async function main() {
  const arr = fnConfig21(data);
  let idx = 0;
  for (const el of arr) {
    await fnHtml("school21", el, idx++);
  }
}
