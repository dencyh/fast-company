export function formatCommentTime(time) {
  const ms = Number(time);

  const date = new Date(ms);

  const minutes = addZero(date.getMinutes());
  const hours = addZero(date.getHours());
  const day = addZero(date.getDate());
  const month = addZero(date.getMonth() + 1);
  const dateMonth = date.toLocaleString("ru", {
    month: "long",
    day: "numeric"
  });
  const year = date.getFullYear();

  const msInMinute = 1000 * 60;
  const msInDay = msInMinute * 60 * 24;

  const msFromNow = Date.now() - ms;

  if (msFromNow <= msInMinute) {
    return "1 минуту назад";
  }
  if (msFromNow <= msInMinute * 5) {
    return "5 минут назад";
  }
  if (msFromNow <= msInMinute * 10) {
    return "10 минут назад";
  }
  if (msFromNow <= msInMinute * 30) {
    return "30 минут назад";
  }
  if (msFromNow < msInDay) {
    return `${hours}:${minutes}`;
  }
  if (msFromNow <= msInDay * 365) {
    return `${dateMonth}`;
  } else {
    return `${day}.${month}.${year}`;
  }
}

function addZero(number) {
  return number < 10 ? "0" + number : number;
}
