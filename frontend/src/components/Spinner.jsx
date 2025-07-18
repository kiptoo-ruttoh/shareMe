import React from 'react';
import { ClipLoader } from 'react-spinners';

function Spinner({ message }) {
  return (
    <div className="flex flex-col justify-center items-center w-full h-full">
      <ClipLoader
        color="#00BFFF"
        loading={true}
        size={50}
        className="m-5"
      />
      <p className="text-lg text-center px-2">{message}</p>
    </div>
  );
}

export default Spinner;
