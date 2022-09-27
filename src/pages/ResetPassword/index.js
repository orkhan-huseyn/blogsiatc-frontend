import React, { Suspense } from 'react';

const LazyResetPassword = React.lazy(() => import('./ResetPassword'));

// eslint-disable-next-line
export default () => (
  <Suspense fallback={<h1>Loading component...</h1>}>
    <LazyResetPassword />
  </Suspense>
);
