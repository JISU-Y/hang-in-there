import styled from '@emotion/styled';

import Collections from './sections/Collections';
import OngoingEvents from './sections/OngoingEvents';
import UpcomingEvents from './sections/UpcomingEvents';

const HomePage = () => {
  return (
    <ContentWrapper>
      <Collections />
      <OngoingEvents />
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
