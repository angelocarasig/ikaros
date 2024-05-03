'use client'

import React from 'react';

import { redirect } from 'next/navigation';

function Reader() {
  redirect('/login');

  return (
    <div>
    </div>
  );
}

export default Reader;
