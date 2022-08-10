import { useState } from "react";

function useInput(validateValue) {
  const [enteredValue, setEnteredValue] = useState("");
  const [isTouched, setIsTouched] = useState(false);

  const enteredValueIsValid = validateValue(enteredValue);
  const hasError = !enteredValueIsValid && isTouched;

  const valueInputChangeHandler = (e) => {
    setEnteredValue(e.target.value);
  };

  const valueInputBlurHandler = (e) => {
    setIsTouched(true);
  };

  return {
    enteredValue,
    isValid: enteredValueIsValid,
    hasError,
    valueInputChangeHandler,
    valueInputBlurHandler,
  };
}

export default useInput;
