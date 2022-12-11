import React from 'react';
import { useRouteError } from 'react-router-dom';

export const ErrorPage = () => {
  const error: any = useRouteError();

  return (
    <div>
      <h1>Oops!</h1>
      <p>
        <i>{error.statusText || error.message}</i>
      </p>
    </div>
  );
};
