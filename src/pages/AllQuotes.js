import React from 'react';
import QuoteList from '../components/quotes/QuoteList';
import { DUMMY_QUOTES } from '../constant/constant';

const AllQuotes = () => {
  return (
    <div>
      <h2>AllQuotes</h2>
      <QuoteList quotes={DUMMY_QUOTES} />
    </div>
  );
};

export default AllQuotes;
