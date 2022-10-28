export function validator(data, config) {
  const errors = {};
  function validate(method, data, config) {
    let statusValidate;
    switch (method) {
      case "isRequired": {
        if (typeof data === "boolean") statusValidate = !data;
        else statusValidate = data.trim() === "";
        break;
      }
      case "isEmail": {
        const emailRegEx = /^\S+@\S+\.\S+$/g;
        statusValidate = !emailRegEx.test(data);
        break;
      }
      case "isCapitalSymbol": {
        const capitalRegEx = /[A-Z]+/g;
        statusValidate = !capitalRegEx.test(data);
        break;
      }
      case "isDigitSymbol": {
        const digitRegEx = /\d+/g;
        statusValidate = !digitRegEx.test(data);
        break;
      }
      case "min": {
        statusValidate = data.length < config.value;
        break;
      }
      default:
        break;
    }

    if (statusValidate) return config.message;
  }
  for (const key in data) {
    for (const validateMethod in config[key]) {
      const error = validate(
        validateMethod,
        data[key],
        config[key][validateMethod]
      );
      if (error && !errors[key]) {
        errors[key] = error;
      }
    }
  }
  return errors;
}
