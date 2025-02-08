import { Suspense } from 'react';

import PageLayout from '@domains/common/layouts/PageLayout';
import CategoryPage from '@domains/category';

const Category = () => {
  return (
    <PageLayout hasMaxWidth>
      <Suspense fallback={<div>fallback</div>}>
        <CategoryPage />
      </Suspense>
    </PageLayout>
  );
};

export default Category;
