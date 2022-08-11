import React from 'react';
import QuoteList from '../components/quotes/QuoteList';
import { DUMMY_QUOTES } from '../constant/constant';

const AllQuotes = () => {
  return (
    <div>
      <QuoteList quotes={DUMMY_QUOTES} />
    </div>
  );
};

export default AllQuotes;
