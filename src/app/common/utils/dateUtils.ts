export function getNextFirstDayOfWeek(date = new Date()) {
  return date.setDate(date.getDate() + ((1 + 7 - date.getDay()) % 7 || 7));
}

export function formatDate(date: Date | number) {
  return new Date(date).toISOString().split('T')[0].split('-').join('');
}

export function getFormatedNextWeek() {
  return formatDate(getNextFirstDayOfWeek());
}

export function getWeekMondayByDate(date: Date): Date {
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(date.setDate(diff));
}

export function calendarInitialDate(date: Date) {
  const day = date.getDay();
  const diff = date.getDate() - day + (day === 0 ? -6 : 1);
  return new Date(date.setDate(diff));
}

export function groupBy(
  list: any[],
  keyGetter: (item: any) => any
): Map<any, any> {
  const map = new Map();
  list.forEach((item) => {
    const key = keyGetter(item);
    const collection = map.get(key);
    if (!collection) {
      map.set(key, [item]);
    } else {
      collection.push(item);
    }
  });
  return map;
}

export function getWeekDays(start: Date): Date[] {
  const sevenDays = [...Array(7).keys()];

  return sevenDays.reduce((a, c) => {
    const date = new Date(start)
    const day = new Date(date.setDate(date.getDate() + c));
    return [...a, day];
  }, []);
}

export function groupByDate(list: any[], key: string) {
  return groupBy(list, (element) => {
    return new Date(element[key]).getDay();
  });
}

export function convertToMap(list: any[], key: string) {
  return groupBy(list, (element) => {
    return new Date(element[key]).getDay();
  });
}

export function getDaysBetween(list: any[], start: Date, end: Date): any[] {
  return list.filter((f) => {
    const curr = new Date(f.start).getTime();
    const s = start.getTime();
    const e = end.getTime();

    return curr >= s && curr <= e;
  });
}

export function isSameDate(d1: Date, d2: Date): boolean {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
}

export function isBeforeToday(date: Date): boolean {
  return (
    calendarInitialDate(new Date(date.toDateString())) <=
    calendarInitialDate(new Date(new Date().toDateString()))
  );
}
