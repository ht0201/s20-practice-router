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
