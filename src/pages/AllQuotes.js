import React from 'react';
import QuoteList from '../components/quotes/QuoteList';

const DUMMY_QUOTES = [
  { id: 1, author: 'Alex', text: 'Learn' },
  { id: 2, author: 'Javan', text: 'Play' },
];

const AllQuotes = () => {
  return (
    <div>
      <h2>AllQuotes</h2>
      <QuoteList quotes={DUMMY_QUOTES} />
    </div>
  );
};

export default AllQuotes;
