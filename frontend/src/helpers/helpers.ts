export const getTimeText = (_time: number): string => {
  const time = _time * 1000 //convert to MS
  const dateDay = new Date(time).setHours(0, 0, 0, 0);
  const today = new Date().setHours(0, 0, 0, 0);

  const isToday = today === dateDay;
  const isYesterday = (today - 86400000) < time

  const date = new Date(time);
  if (isToday || isYesterday) {
    const foreText = isToday ? 'Today at' : 'Yesterday at'
    const options: Intl.DateTimeFormatOptions = { hour: 'numeric', minute: 'numeric' };
    return `${foreText} ${date.toLocaleDateString('en-US', options).split(',')[1]}`
  } else {
    const options: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
    return date.toLocaleDateString('en-US', options);
  }
};
