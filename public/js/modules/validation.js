export let errorsArr = [];

export function clearErrorsArr() {
  errorsArr = [];
}

function addError(message, field) {
  errorsArr.push({
    message,
    field,
  });
}

// rules ['required', 'minLength-4']
export function checkInput(valueToCheck, field, rulesArr) {
  // eslint-disable-next-line no-restricted-syntax
  for (const rule of rulesArr) {
    // rule === required
    if (rule === 'required') {
      if (valueToCheck === '') {
        // pranesti apie klaida
        addError('this field is required', field);
        return;
      }
    }
    // rule === minLength-X
    if (rule.split('-')[0] === 'minLength') {
      const min = rule.split('-')[1];
      if (valueToCheck.length <= min) {
        addError(`length must be greater than ${min}`, field);
      }
    }
    // rule === maxLength-X
    if (rule.split('-')[0] === 'maxLength') {
      const max = rule.split('-')[1];
      if (valueToCheck.length >= max) {
        addError(`Too long. Length must be less than ${max}`, field);
      }
    }

    // rule ===  email tikrinam ar yra @ raide
    // extra ar yra '.' po @ raide
  }
}
