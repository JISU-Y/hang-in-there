'use client';

import styled from '@emotion/styled';

import Collections from './sections/Collections';
import OngoingEvents from './sections/OngoingEvents';
import UpcomingEvents from './sections/UpcomingEvents';

export default function HomePage() {
  return (
    <ContentWrapper>
      <Collections />
      <EventListWrapper>
        <OngoingEvents />
        <UpcomingEvents />
      </EventListWrapper>
    </ContentWrapper>
  );
}

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 64px;
`;

const EventListWrapper = styled.section`
  width: 100%;
  max-width: 1127px;
  margin: auto;
`;
