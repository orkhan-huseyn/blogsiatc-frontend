import React, { Suspense } from 'react';

const LazyBlogCreatePage = React.lazy(() => import('./BlogCreate'));

export default () => (
  <Suspense fallback={<h1>Loading component...</h1>}>
    <LazyBlogCreatePage />
  </Suspense>
);
