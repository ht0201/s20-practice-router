import React, { Fragment, useEffect } from 'react';
import { Link, Route, useParams, useRouteMatch } from 'react-router-dom';
import Comments from '../components/comments/Comments';
import HighlightedQuote from '../components/quotes/HighlightedQuote';
import { DUMMY_QUOTES } from '../constant/constant';
import useHttp from '../hooks/use-http';
import { getAllQuotes } from '../lib/api';

const QuoteDetails = () => {
  const { quoteId } = useParams();
  const match = useRouteMatch();

  const { sendRequest, data: quotes } = useHttp(getAllQuotes, true);
  console.log(quotes);

  useEffect(() => {
    sendRequest();
  }, [sendRequest]);

  // const quote = DUMMY_QUOTES.find((quote) => quote.id == quoteId);
  const quote = quotes.find((quote) => quote.id === quoteId);

  if (!quote) {
    return <p>No found quote !</p>;
  }
  return (
    <Fragment>
      <HighlightedQuote text={quote.text} author={quote.author} />
      <Route path={match.path} exact>
        <div className='centered'>
          <Link to={`${match.url}/comments`} className='btn--flat'>
            Load comments
          </Link>
        </div>
      </Route>
      <Route path={`${match.path}/comments`}>
        <Comments />
      </Route>
    </Fragment>
  );
};

export default QuoteDetails;
