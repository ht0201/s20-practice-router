import React, { Fragment } from 'react';
import { useHistory } from 'react-router-dom';
import QuoteForm from '../components/quotes/QuoteForm';
import { DUMMY_QUOTES } from '../constant/constant';

const NewQuote = () => {
  const history = useHistory();

  const addQuoteHandler = (quoteData) => {
    console.log(quoteData);
    DUMMY_QUOTES.push({
      id: Math.floor(Math.random() * 100),
      author: quoteData.author,
      text: quoteData.text,
    });

    history.push('/quotes');
  };
  return (
    <Fragment>
      <QuoteForm onAddQuote={addQuoteHandler} />
    </Fragment>
  );
};

export default NewQuote;
