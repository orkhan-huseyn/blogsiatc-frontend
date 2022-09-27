import React, { Suspense } from 'react';

const LazyChatPage = React.lazy(() => import('./Chat'));

// eslint-disable-next-line
export default () => (
  <Suspense fallback={<h1>Loading component...</h1>}>
    <LazyChatPage />
  </Suspense>
);
