import PageLayout from '@src/common/layouts/PageLayout';
import HomePage from '@src/pages/home';

const Home = () => {
  return (
    <PageLayout withLineBanner>
      <HomePage />
    </PageLayout>
  );
};

export default Home;
