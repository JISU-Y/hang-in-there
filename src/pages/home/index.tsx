import PageLayout from '@src/common/layouts/PageLayout';
import Test from '@src/common/components/Test';

const HomePage = () => {
  return (
    <PageLayout>
      <h1
        style={{
          fontSize: '48px',
          fontWeight: 'bold',
          color: 'orange'
        }}
      >
        행인들 (H.I.T)
      </h1>
      <Test />
    </PageLayout>
  );
};

export default HomePage;
