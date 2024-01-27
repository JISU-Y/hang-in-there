import PageLayout from '@src/common/layouts/PageLayout';
import {
  useFetchEventDetailImageQuery,
  useFetchEventDetailIntroQuery,
  useFetchEventDetailQuery
} from '@src/pages/eventDetail/network/eventDetailQueries';
import { useNavigation, useParams } from 'react-router-dom';

const Detail = () => {
  const navigation = useNavigation();
  const { contentid } = useParams<{ contentid: string }>();

  const { data: eventDetail } = useFetchEventDetailQuery(contentid || '');
  const { data: eventDetailIntro } = useFetchEventDetailIntroQuery(
    contentid || ''
  );
  const { data: eventDetailImage } = useFetchEventDetailImageQuery(
    contentid || ''
  );

  console.log('🚀 ~ Detail ~ eventDetail:', eventDetail);
  console.log('🚀 ~ Detail ~ eventDetailIntro:', eventDetailIntro);
  console.log('🚀 ~ Detail ~ eventDetailImage:', eventDetailImage);

  return (
    <PageLayout>
      {eventDetail && (
        <div>
          <img src={eventDetail.firstimage} alt="event_detail" />
          <span>{eventDetail.title}</span>
          <span>{eventDetail.overview}</span>
        </div>
      )}
    </PageLayout>
  );
};

export default Detail;
