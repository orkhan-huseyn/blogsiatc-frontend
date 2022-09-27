import React, { Suspense } from 'react';

const LazyDashboardPage = React.lazy(() => import('./Dashboard'));

// eslint-disable-next-line
export default () => (
  <Suspense fallback={<h1>Loading component...</h1>}>
    <LazyDashboardPage />
  </Suspense>
);
