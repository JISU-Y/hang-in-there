import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { CategoryCodeType, categories } from '@src/common/constants/categories';

const CategoryMenu = () => {
  const [, setMenuEl] = useState<HTMLDivElement | null>(null);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const categoryCode = searchParams.get('category') as CategoryCodeType;

  const handleCategoryClick = (categoryCode: string) => {
    navigate(`/category?category=${categoryCode}`);
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
  margin: -10px 32px 0;
  gap: 40px;
`;

const MenuItemWrapper = styled.div`
  position: relative;
  padding: 8px;
`;

const MenuItem = styled.li<{ $isActive: boolean }>`
  border-bottom: 3px solid
    ${({ $isActive }) => ($isActive ? 'black' : 'transparent')};
  padding: 0 8px 16px;

  transition: all 0.3s ease-in-out;

  &:hover {
    border-bottom: 3px solid black;

    & span {
      font-weight: bold;
      color: #191919;
    }
  }
`;

const MenuName = styled.span<{ $isActive: boolean }>`
  font-weight: ${({ $isActive }) => ($isActive ? 'bold' : 'normal')};
  color: ${({ $isActive }) => ($isActive ? '#191919' : '#767676')};

  transition: all 0.3s ease-in-out;
`;

export default CategoryMenu;
