export function phoneValidation(value: string | undefined) {
  if (value) {
    const phoneRegExp = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){11}(\s*)?$/
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
export function emptyValidation() {return true;}
export function numberValidation(value: string | undefined) {
  if (value) {
    const numberRegExp = /^[0-9]+$/;
    return numberRegExp.test(value);
  }
  return true;
}
export function TNCodeValidation(value: string | undefined) {
  if(value)
    return /^\d{10}$/.test(value);
  return true;
}
export function weightValidation(value: string | undefined) {
  if(value)
    if(Number(value) != 0)
      return /^\d+(\.\d{1,2})?$/.test(value);
    else
    return false;
  return true;
}
export function volumeValidation(value: string | undefined) {
  if(value)
    if(Number(value) != 0)
      return /^\d+(\.\d{1,3})?$/.test(value);
    else
      return false;
  return true;
}
export function placesValidation(value: string | undefined) {
  if(value)
    return /^\d{1,6}$/.test(value);
  return true;
}
export function cityValidation(value: string | undefined) {
  if(value)
    return /^[А-ЯЁа-яё\s-]+$/.test(value);
  return true;
}