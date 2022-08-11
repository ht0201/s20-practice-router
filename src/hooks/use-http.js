import { useCallback, useReducer } from 'react';

const httpReducer = (state, action) => {
  switch (action.type) {
    case 'SEND':
      return {
        data: null,
        error: null,
        status: 'pending',
      };

    case 'SUCCESS':
      return {
        data: action.responseData,
        error: null,
        status: 'completed',
      };

    case 'ERROR':
      return {
        data: null,
        error: action.errorMessage,
        status: 'completed',
      };
    default:
      return state;
  }
};

const useHttp = (requestFunction, startWithPending = false) => {
  // setState by useReducer
  // const [state, dispatch] = useReducer(reducer, initialArg, init);

  const [httpState, dispatch] = useReducer(httpReducer, {
    data: null,
    error: null,
    status: startWithPending,
  });

  // build Func call api
  const sendRequest = useCallback(
    async (requestData) => {
      // loading...
      dispatch({ type: 'SEND' });

      try {
        // goi Func call API va returned result
        const responseData = await requestFunction(requestData);

        // Notification and assgin data
        dispatch({ type: 'SUCCESS', responseData });
      } catch (error) {
        dispatch({
          type: 'ERROR',
          errorMessage: 'Fetch data failed or something went wrong!',
        });
      }
    },
    [requestFunction]
  );

  return {
    sendRequest,
    ...httpState,
  };
};

export default useHttp;
