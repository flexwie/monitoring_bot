import React from 'react';
import { Link } from 'react-router-dom';

export const App = () => {
  return (
    <div>
      <h1 className="text-xl font-bold underline">Hello World</h1>
      <Link to="/cb">
        <button className="border-gray-400 border px-4 py-1">Cb</button>
      </Link>
    </div>
  );
};
