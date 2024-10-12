import { getDehydratedQueries, Hydrate } from '@logics/utils/reactQuery';
import Collections from './sections/Collections';
import OngoingEvents from './sections/OngoingEvents';
import UpcomingEvents from './sections/UpcomingEvents';
import { homeQueryKeys } from './constants/queryKeys';
import { getEventList } from './network/eventListFetchHandlers';

export default async function HomePage() {
  const homeQueries = await getDehydratedQueries([
    {
      queryKey: homeQueryKeys.getOngoingEventList(),
      queryFn: async () => await getEventList('on_going')
    },
    {
      queryKey: homeQueryKeys.getUpcomingEventList({
        page: 1,
        size: 28
      }),
      queryFn: async () =>
        await getEventList('up_comming', {
          page: 1,
          size: 28
        })
    }
  ]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '64px'
      }}
    >
      <Collections />
      <section
        style={{
          width: '100%',
          maxWidth: '1127px',
          margin: 'auto'
        }}
      >
        <Hydrate state={{ queries: homeQueries }}>
          <OngoingEvents />
          <UpcomingEvents />
        </Hydrate>
      </section>
    </div>
  );
}
