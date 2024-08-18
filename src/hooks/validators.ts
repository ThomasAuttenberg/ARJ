export function phoneValidation(value: string | undefined) {
  if (value) {
    const phoneRegExp = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/
    return phoneRegExp.test(value)
  }
  return true
}

export function mailValidation(value: string | undefined) {
  if (value) {
    const mailRegExp = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    return mailRegExp.test(value)
  }
  return true
}
export function floatValidation(value: string | undefined) {
  if (value) {
    const floatRegExp = /^\d+(\.\d+)?$/;
    return floatRegExp.test(value);
  }
  return true;
}
export function emptyValidation(value: string | undefined) {return true;}
export function numberValidation(value: string | undefined) {
  if (value) {
    const numberRegExp = /^[0-9]+$/
    return numberRegExp.test(value)
  }
  return true
}