import React from 'react';

function ReaderLoader() {
  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col gap-8">
      <div className="loader"/>
      <h1 className="scroll-m-20 text-4xl font-semibold tracking-tight lg:text-5xl">
        Loading Novel...
      </h1>
    </div>
  );
}

export default ReaderLoader;
