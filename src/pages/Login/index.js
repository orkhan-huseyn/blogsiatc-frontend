import React, { Suspense } from 'react';

const LazyLoginPage = React.lazy(() => import('./Login'));

export default () => (
  <Suspense fallback={<h1>Loading component...</h1>}>
    <LazyLoginPage />
  </Suspense>
);
