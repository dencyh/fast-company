export function generateAuthError(message) {
  switch (message) {
    case "EMAIL_EXISTS":
      return "Пользователь с такой эл. почтой уже зарегистрирован";
    case "INVALID_PASSWORD":
      return "Пользователь с такими данными не найден";
    case "EMAIL_NOT_FOUND":
      return "Пользователь с такими данными не найден";
    default:
      return "Что-то пошло не так";
  }
}
