export function getNextFirstDayOfWeek(date = new Date()) {
  return date.setDate(date.getDate() + ((1 + 7 - date.getDay()) % 7 || 7));
}

export function formatDate(date: Date | number) {
  return new Date(date).toISOString().split('T')[0].split('-').join('');
}

export function getFormatedNextWeek() {
  return formatDate(getNextFirstDayOfWeek());
}

export function calendarInitialDate(date: Date) {
  const day = date.getDay();
  const diff = date.getDate() - day + (day == 0 ? +1 : 1);
  return new Date(date.setDate(diff));
}

export function groupBy(
  list: [],
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

export function getWeekDays(date: Date) {
  const d = new Date(date);

  const sevenDays = [...Array(7).keys()];

  return sevenDays.reduce((a, c, i) => {
    const day = new Date(d.setDate(d.getDate() - d.getDay() + i));
    return [...a, day];
  }, []);
}

export function groupByDate(list: [], key: string) {
  return groupBy(list, (element) => {
    return new Date(element[key]).getDay();
  });
}

export function getDaysBetween(start, end) {

};
