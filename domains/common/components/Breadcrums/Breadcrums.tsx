import Link from 'next/link';
import { useParams, useSearchParams } from 'next/navigation';

import styled from '@emotion/styled';
import { ChevronRightIcon } from '@chakra-ui/icons';
import {
  CATEGORY_CODE,
  CategoryCodeType
} from '@domains/common/constants/categories';

const Breadcrumbs = () => {
  const searchParams = useSearchParams();
  const categoryCode = searchParams.get('category') as CategoryCodeType;

  const params = useParams<{ category: string }>();
  const category = params?.category as string;

  // TODO: 이벤트 디테일에서 카테고리 빼와서 추가해주기
  const breadcrumbItems = [
    <BreadcrumbLink key="home" href="/">
      홈
    </BreadcrumbLink>
  ];

  if (category) {
    breadcrumbItems.push(
      <Separator key="separator">
        <ChevronRightIcon w={6} h={6} strokeWidth={1} color="#8B8B8B" />
      </Separator>,
      <BreadcrumbLink key="category" href={`/category?category=${category}`}>
        {CATEGORY_CODE[categoryCode].name}
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
