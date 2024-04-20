import { Link, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import queryString from 'query-string';
import { ChevronRightIcon } from '@chakra-ui/icons';

const Breadcrumbs = () => {
  const location = useLocation();
  const queryParams = queryString.parse(location.search);
  const category = queryParams.category as string;

  // TODO: 이벤트 디테일에서 카테고리 빼와서 추가해주기
  const breadcrumbItems = [
    <BreadcrumbLink key="home" to="/">
      홈
    </BreadcrumbLink>
  ];

  if (category) {
    breadcrumbItems.push(
      <Separator key="separator">
        <ChevronRightIcon w={6} h={6} strokeWidth={1} color="#8B8B8B" />
      </Separator>,
      <BreadcrumbLink key="category" to={`/category?category=${category}`}>
        {category}
      </BreadcrumbLink>
    );
  }

  return <BreadcrumbsContainer>{breadcrumbItems}</BreadcrumbsContainer>;
};

export default Breadcrumbs;

const BreadcrumbsContainer = styled.div`
  display: flex;
  align-items: center;
  width: fit-content;

  padding: 10px;
`;

const BreadcrumbLink = styled(Link)`
  text-decoration: none;
  color: #007bff;

  &:hover {
    text-decoration: underline;
  }
`;

const Separator = styled.span`
  margin: 0;
`;
