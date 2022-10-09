import React from 'react';
import { NextSeo } from 'next-seo';

const Meta = () => {
  return (
    <>
      <NextSeo
        title="Gaspack Frontend Boilerplate"
        description="Gaspack Frontend Boilerplate"
        openGraph={{
          images: [{ url: '/images/icons/gaspack-logo.svg' }],
        }}
      />
    </>
  );
};

export default Meta;
