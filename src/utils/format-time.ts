import dayjs from 'dayjs';

type InputValue = Date | string | number | null | undefined;

function isValidDate(obj: Date) {
  return obj instanceof Date && !isNaN(obj.getTime());
}

export function fDate(date: InputValue, newFormat?: string) {
  const fm = newFormat || 'DD MMM YYYY';
  return date && isValidDate(new Date(date)) ? dayjs(new Date(date)).format(fm) : '';
}

export function fDateTime(date: InputValue, newFormat?: string) {
  const fm = newFormat || 'dd MMM yyyy p';
  return date ? dayjs(new Date(date)).format(fm) : '';
}
