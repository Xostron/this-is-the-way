// Посчитать 'штука', 'штуки', 'штук'
export default function count(arr, v) {
  if (v > 10 && v < 20) return arr[2];
  const d = v % 10;
  if (d === 1) return arr[0];
  if (d >= 2 && d <= 4) return arr[1];
  return arr[2];
};

[1,2,5,10,19,20,21,22,25,102].forEach(n => {
   const s = count(['штука', 'штуки', 'штук'], n);
   console.log(n, s);
})