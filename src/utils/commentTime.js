export function formatCommentTime(time) {
  const ms = Number(time);

  const date = new Date(Number(ms));

  const msInMinute = 1000 * 60;
  const msInDay = msInMinute * 60 * 24;

  const minutes = date.getMinutes();
  const hours = date.getHours();
  const day = addZero(date.getDate());
  const month = addZero(date.getMonth() + 1);
  const year = date.getFullYear();

  console.log(ms);
  console.log(msInMinute);
  console.log(msInDay);

  if (ms < msInMinute) {
    return "1 минуту назад";
  }
  if (ms <= msInMinute * 5) {
    return "5 минут назад";
  }
  if (ms <= msInMinute * 10) {
    return "10 минут назад";
  }
  if (ms <= msInMinute * 30) {
    return "30 минут назад";
  }
  if (ms < msInDay) {
    return `${hours}:${minutes}`;
  }
  if (ms <= msInDay * 365) {
    return `${day}-${month}`;
  } else {
    return `${day}-${month}-${year}`;
  }
}

function addZero(number) {
  return number < 10 ? "0" + number : number;
}
