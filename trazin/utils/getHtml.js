const fnConfig21 = require("../scrapper/config21");
const fnHtml = require("../scrapper/html");

// Ссылка
const data = [
	{
    url: "https://platform.21-school.ru/project/69540/task?studentId=423afb55-531e-4798-b247-b993e1d32303",
    name: "BSA0",
  },
  {
    url: "https://platform.21-school.ru/project/69541/task?studentId=423afb55-531e-4798-b247-b993e1d32303",
    name: "BSA1",
  },
  {
    url: "https://platform.21-school.ru/project/69542/task?studentId=423afb55-531e-4798-b247-b993e1d32303",
    name: "BSA2",
  },
  {
    url: "https://platform.21-school.ru/project/69543/task?studentId=423afb55-531e-4798-b247-b993e1d32303",
    name: "BSA3",
  },
  {
    url: "https://platform.21-school.ru/project/69544/task?studentId=423afb55-531e-4798-b247-b993e1d32303",
    name: "BSA4",
  },
  {
    url: "https://platform.21-school.ru/project/69545/task?studentId=423afb55-531e-4798-b247-b993e1d32303",
    name: "BSA5",
  },
  {
    url: "https://platform.21-school.ru/project/69546/task?studentId=423afb55-531e-4798-b247-b993e1d32303",
    name: "BSA6",
  },

  {
    url: "https://platform.21-school.ru/project/69547/task?studentId=423afb55-531e-4798-b247-b993e1d32303",
    name: "BSA7",
  },
  {
    url: "https://platform.21-school.ru/project/69548/task?studentId=423afb55-531e-4798-b247-b993e1d32303",
    name: "BSA8",
  },
  {
    url: "https://platform.21-school.ru/project/69549/task?studentId=423afb55-531e-4798-b247-b993e1d32303",
    name: "BSA9",
  },
  {
    url: "https://platform.21-school.ru/project/69550/task?studentId=423afb55-531e-4798-b247-b993e1d32303",
    name: "BSA10",
  },
  {
    url: "https://platform.21-school.ru/project/69551/task?studentId=423afb55-531e-4798-b247-b993e1d32303",
    name: "BSA11",
  },
  {
    url: "https://platform.21-school.ru/project/69552/task?studentId=423afb55-531e-4798-b247-b993e1d32303",
    name: "BSA12",
  },
  {
    url: "https://platform.21-school.ru/project/69553/task?studentId=423afb55-531e-4798-b247-b993e1d32303",
    name: "BSA13",
  },
  {
    url: "https://platform.21-school.ru/project/69554/task?studentId=423afb55-531e-4798-b247-b993e1d32303",
    name: "BSA14",
  },
  {
    url: "https://platform.21-school.ru/project/69555/task?studentId=423afb55-531e-4798-b247-b993e1d32303",
    name: "BSA15",
  },
  {
    url: "https://platform.21-school.ru/project/69556/task?studentId=423afb55-531e-4798-b247-b993e1d32303",
    name: "BSA16",
  },
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
