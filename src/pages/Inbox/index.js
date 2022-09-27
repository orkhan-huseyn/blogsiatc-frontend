import React, { Suspense } from 'react';

const LazyInboxPage = React.lazy(() => import('./Inbox'));

export default () => (
  <Suspense fallback={<h1>Loading component...</h1>}>
    <LazyInboxPage />
  </Suspense>
);
