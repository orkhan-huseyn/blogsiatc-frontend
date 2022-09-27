import React, { Suspense } from 'react';

const LazyBlogsPage = React.lazy(() => import('./Blogs'));

// eslint-disable-next-line
export default () => (
  <Suspense fallback={<h1>Loading component...</h1>}>
    <LazyBlogsPage />
  </Suspense>
);
