export function randomNumber(n) {
  if (n <= 0) return;

  const random = Math.random() * n;

  return Math.round(random);
}

export function getImage() {
  return `https://picsum.photos/id/${randomNumber(1000)}/1368/400`;
}

export function formatNumber(num) {
  return (Math.round(num * 100) / 100).toFixed(2);
}
