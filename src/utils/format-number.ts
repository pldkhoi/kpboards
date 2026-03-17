export function fCurrency(number: string | number) {
  const val = typeof number === 'string' ? parseFloat(number) : number;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: Number.isInteger(val) ? 0 : 2,
    maximumFractionDigits: 2,
  }).format(val);
}

export function fPercent(number: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'percent',
    minimumFractionDigits: 1,
    maximumFractionDigits: 1,
  }).format(number / 100);
}

export function fNumber(number: string | number) {
  const val = typeof number === 'string' ? parseFloat(number) : number;
  return new Intl.NumberFormat('en-US').format(val);
}

export function fShortenNumber(number: string | number) {
  const val = typeof number === 'string' ? parseFloat(number) : number;
  return new Intl.NumberFormat('en-US', {
    notation: 'compact',
    maximumFractionDigits: 2,
  }).format(val);
}

export function fData(number: string | number) {
  const val = typeof number === 'string' ? parseFloat(number) : number;
  const units = ['B', 'KB', 'MB', 'GB', 'TB'];
  let unitIndex = 0;
  let size = val;
  while (size >= 1024 && unitIndex < units.length - 1) {
    size /= 1024;
    unitIndex++;
  }
  return `${size.toFixed(1)} ${units[unitIndex]}`;
}
