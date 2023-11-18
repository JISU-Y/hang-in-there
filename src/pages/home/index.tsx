import styled from '@emotion/styled';
import PageLayout from '@src/common/layouts/PageLayout';
import Test from '@src/common/components/Test';
import Collections from './sections/Collections';
import Categories from './sections/Categories';
import RecentEvents from './sections/RecentEvents';

const HomePage = () => {
  return (
    <PageLayout>
      <ContentWrapper>
        <Collections />
        <Categories />
        <RecentEvents />
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
      </ContentWrapper>
    </PageLayout>
  );
};

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 64px;
  padding: 64px 48px;
`;

export default HomePage;
