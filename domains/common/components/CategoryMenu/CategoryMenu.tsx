import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import styled from '@emotion/styled';
import {
  CategoryCodeType,
  categories
} from '@domains/common/constants/categories';

const CategoryMenu = () => {
  const [, setMenuEl] = useState<HTMLDivElement | null>(null);

  const { push } = useRouter();
  const searchParams = useSearchParams();
  const categoryCode = searchParams.get('category') as CategoryCodeType;

  const buildSearchParams = () => {
    const params = new URLSearchParams();

    const searchKeyword = searchParams.get('search');
    const areaCode = searchParams.getAll('areaCode')?.[0];
    const status = searchParams.getAll('status')?.[0];

    if (searchKeyword) {
      params.append('searchKeyword', searchKeyword);
    }
    if (areaCode) {
      params.append('areaCode', areaCode);
    }
    if (status) {
      params.append('status', status);
    }

    return params.toString();
  };

  const handleCategoryClick = (categoryCode: string) => {
    push(`/category?category=${categoryCode}&${buildSearchParams()}`);
  };

  return (
    <MenuContainer>
      {categories.map(category => (
        <MenuItemWrapper key={category.name} ref={setMenuEl}>
          <MenuItem
            as="button"
            $isActive={categoryCode === category.code}
            onClick={() => handleCategoryClick(category.code)}
          >
            <MenuName $isActive={categoryCode === category.code}>
              {category.name}
            </MenuName>
          </MenuItem>
        </MenuItemWrapper>
      ))}
    </MenuContainer>
  );
};

const MenuContainer = styled.ul`
  display: flex;
  gap: 40px;
  overflow-x: auto;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
  -ms-overflow-style: none;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 768px) {
    gap: 24px;
  }
`;

const MenuItemWrapper = styled.div`
  position: relative;
  padding: 8px;
  white-space: nowrap;

  @media (max-width: 768px) {
    padding: 4px;
  }
`;

const MenuItem = styled.li<{ $isActive: boolean }>`
  border-bottom: 3px solid
    ${({ $isActive }) => ($isActive ? 'black' : 'transparent')};
  padding: 0 8px 16px;
  transition: border-bottom 0.3s ease-in-out;

  &:hover {
    border-bottom: 3px solid black;

    & span {
      font-weight: bold;
      color: #191919;
    }
  }

  @media (max-width: 768px) {
    padding: 0 4px 12px;
  }
`;

const MenuName = styled.span<{ $isActive: boolean }>`
  font-weight: ${({ $isActive }) => ($isActive ? 'bold' : 'normal')};
  color: ${({ $isActive }) => ($isActive ? '#191919' : '#767676')};
  font-size: 16px;
  transition: color 0.3s ease-in-out;

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

export default CategoryMenu;
