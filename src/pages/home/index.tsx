import styled from '@emotion/styled';

import Collections from './sections/Collections';
// import Categories from './sections/Categories';
import RecentEvents from './sections/RecentEvents';

const HomePage = () => {
  return (
    <ContentWrapper>
      <Collections />
      {/* <Categories /> */}
      <RecentEvents />
    </ContentWrapper>
  );
};

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 64px;
`;

export default HomePage;
