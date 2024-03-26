import styled from '@emotion/styled';

import Collections from './sections/Collections';
// import Categories from './sections/Categories';
import UpcomingEvents from './sections/UpcomingEvents';

const HomePage = () => {
  return (
    <ContentWrapper>
      <Collections />
      {/* <Categories /> */}
      <UpcomingEvents />
    </ContentWrapper>
  );
};

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 64px;
`;

export default HomePage;
