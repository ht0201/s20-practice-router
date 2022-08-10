import { Fragment, useRef, useState } from "react";
import { Prompt } from "react-router-dom";
import useInput from "../../hooks/useInput";

import Card from "../UI/Card";
import LoadingSpinner from "../UI/LoadingSpinner";
import classes from "./QuoteForm.module.css";

const isNotEmpty = (value) => value.trim().length !== 0;

const QuoteForm = (props) => {
  const authorInputRef = useRef();
  const textInputRef = useRef();

  const [isEntering, setisEntering] = useState(false);
  const {
    enteredValue: enteredAuthor,
    isValid: enteredAuthorIsValid,
    hasError: authorInputIsInvalid,
    valueInputChangeHandler: authorInputChangeHandler,
    valueInputBlurHandler: authorInputBlurHandler,
  } = useInput(isNotEmpty);

  const {
    enteredValue: enteredText,
    isValid: enteredTextIsValid,
    hasError: textInputIsInvalid,
    valueInputChangeHandler: textInputChangeHandler,
    valueInputBlurHandler: textInputBlurHandler,
  } = useInput(isNotEmpty);

  const formIsValid = enteredTextIsValid && enteredAuthorIsValid;

  function submitFormHandler(event) {
    event.preventDefault();

    const enteredAuthor = authorInputRef.current.value;
    const enteredText = textInputRef.current.value;

    // optional: Could validate here

    if (!formIsValid) {
      return;
    }

    props.onAddQuote({ author: enteredAuthor, text: enteredText });
  }

  const focusFormHandler = () => {
    setisEntering(true);
  };

  const addFinishHandler = () => {
    setisEntering(false);
  };

  const authorClasses = authorInputIsInvalid
    ? `${classes.control}`
    : `${classes.control} invalid`;

  const textClasses = textInputIsInvalid
    ? `${classes.control}`
    : `${classes.control} invalid`;

  return (
    <Fragment>
      <Prompt
        when={isEntering}
        message="Are you want to leave site ? All you entered will be lost ?"
      />
      <Card>
        <form
          onFocus={focusFormHandler}
          className={classes.form}
          onSubmit={submitFormHandler}
        >
          {props.isLoading && (
            <div className={classes.loading}>
              <LoadingSpinner />
            </div>
          )}

          <div className={authorClasses}>
            <label htmlFor="author">Author</label>
            <input
              type="text"
              id="author"
              ref={authorInputRef}
              value={enteredAuthor}
              onChange={authorInputChangeHandler}
              onBlur={authorInputBlurHandler}
            />
            {authorInputIsInvalid && (
              <p className={classes["error-text"]}>Enter author is valid !</p>
            )}
          </div>
          <div className={textClasses}>
            <label htmlFor="text">Text</label>
            <textarea
              id="text"
              rows="5"
              ref={textInputRef}
              value={enteredText}
              onChange={textInputChangeHandler}
              onBlur={textInputBlurHandler}
            ></textarea>
            {textInputIsInvalid && (
              <p className={classes["error-text"]}>Enter text is valid !</p>
            )}
          </div>
          <div className={classes.actions}>
            <button
              disabled={!formIsValid}
              onClick={addFinishHandler}
              className="btn"
            >
              Add Quote
            </button>
          </div>
        </form>
      </Card>
    </Fragment>
  );
};

export default QuoteForm;
