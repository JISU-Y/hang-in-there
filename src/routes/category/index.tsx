import CategoryPage from '@src/pages/category';
import { useFetchEventListQuery } from '@src/pages/category/network/eventListQueries';

const Category = () => {
  const { data } = useFetchEventListQuery({
    numOfRows: 10,
    eventStartDate: '20240101',
    pageNo: 1
  });

  console.log('data', data);
  return (
    <div>
      <CategoryPage />
    </div>
  );
};

export default Category;
