import React, { Suspense } from 'react';

const LazyBlogsPage = React.lazy(() => import('./Blogs'));

export default () => (
  <Suspense fallback={<h1>Loading component...</h1>}>
    <LazyBlogsPage />
  </Suspense>
);
