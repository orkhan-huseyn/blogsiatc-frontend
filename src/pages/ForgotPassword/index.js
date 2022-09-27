import React, { Suspense } from 'react';

const LazyForgotPassword = React.lazy(() => import('./ForgotPassword'));

// eslint-disable-next-line
export default () => (
  <Suspense fallback={<h1>Loading component...</h1>}>
    <LazyForgotPassword />
  </Suspense>
);
