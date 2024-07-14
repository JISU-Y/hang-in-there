import PageLayout from '@domains/common/layouts/PageLayout';
import HomePage from '../domains/home';

export function generateStaticParams() {
  return [{ slug: [''] }];
}

export default function Page() {
  return (
    <PageLayout>
      <HomePage />
    </PageLayout>
  );
}
