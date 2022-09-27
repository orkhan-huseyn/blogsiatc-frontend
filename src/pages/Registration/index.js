import React, { Suspense } from 'react';

const LazyRegistrationPage = React.lazy(() => import('./Registration'));

export default () => (
  <Suspense fallback={<h1>Loading component...</h1>}>
    <LazyRegistrationPage />
  </Suspense>
);
