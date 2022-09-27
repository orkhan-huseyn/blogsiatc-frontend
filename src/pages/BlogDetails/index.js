import React, { Suspense } from 'react';

const LazyBlogDetailsPage = React.lazy(() => import('./BlogDetails'));

// eslint-disable-next-line
export default () => (
  <Suspense fallback={<h1>Loading component...</h1>}>
    <LazyBlogDetailsPage />
  </Suspense>
);
