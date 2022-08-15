const FIREBASE_DOMAIN = 'https://react-http-8333c-default-rtdb.firebaseio.com';

export const getAllQuotes = async () => {
  const res = await fetch(`${FIREBASE_DOMAIN}/quotes.json`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Could not fetch quotes !');
  }

  const transformQuotes = [];
  for (const key in data) {
    transformQuotes.push({
      id: key,
      ...data[key],
    });
  }

  return transformQuotes;
};

export const addQuote = async (quoteData) => {
  const res = await fetch(`${FIREBASE_DOMAIN}/quotes.json`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(quoteData),
  });

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Add quote failed');
  }

  return null;
};

export const getSingleQuote = async (quoteId) => {
  const res = await fetch(`${FIREBASE_DOMAIN}/quotes/${quoteId}.json`);
  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Add quote failed');
  }

  const loadedQuote = {
    id: quoteId,
    ...data,
  };

  return loadedQuote;
};

export const addComment = async (requestData) => {
  const res = await fetch(
    `${FIREBASE_DOMAIN}/comments/${requestData.quoteId}.json`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData.commentData),
    }
  );

  const data = await res.json();
  if (!res.ok) {
    throw new Error(data.message || 'Could not sent comment !');
  }

  return null;
};

export async function getAllComments(quoteId) {
  const response = await fetch(`${FIREBASE_DOMAIN}/comments/${quoteId}.json`);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || 'Could not get comments.');
  }

  const transformedComments = [];

  for (const key in data) {
    const commentObj = {
      id: key,
      ...data[key],
    };

    transformedComments.push(commentObj);
  }

  return transformedComments;
}
