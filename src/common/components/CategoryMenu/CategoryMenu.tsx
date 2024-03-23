import styled from '@emotion/styled';
import { categories } from '@src/common/constants/categories';
import { useState } from 'react';

const CategoryMenu = () => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const handleMenuClick = (menuName: string) => {
    setActiveMenu(menuName === activeMenu ? null : menuName);
  };

  return (
    <MenuContainer>
      {categories.map(category => (
        <MenuItemWrapper key={category.name}>
          <MenuItem
            as="button"
            $isActive={activeMenu === category.name}
            onClick={() => handleMenuClick(category.name)}
          >
            <MenuName $isActive={activeMenu === category.name}>
              {category.name}
            </MenuName>
          </MenuItem>
          {activeMenu === category.name &&
            category.subCategoryList &&
            category.subCategoryList.length > 0 && (
              <MenuDropdown>
                {category.subCategoryList.map(subCategory => (
                  <DropdownItem key={`${subCategory.code}-${subCategory.name}`}>
                    {subCategory.name}
                  </DropdownItem>
                ))}
              </MenuDropdown>
            )}
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
`;

const MenuName = styled.span<{ $isActive: boolean }>`
  font-weight: ${({ $isActive }) => ($isActive ? 'bold' : 'normal')};
  color: ${({ $isActive }) => ($isActive ? '#191919' : '#767676')};
`;

const MenuDropdown = styled.ul`
  position: absolute;
  top: 68px;
  left: 50%;
  background-color: #191919;
  width: 208px;
  color: #ffffff;
  padding: 8px 0;
  display: flex;
  flex-direction: column;
  z-index: 1;
  transform: translateX(-50%);
  border-bottom-left-radius: 8px;
  border-bottom-right-radius: 8px;
`;

const DropdownItem = styled.li`
  width: 100%;
  font-weight: 600;
  cursor: pointer;
  text-align: center;
  padding: 12px 0;
`;

export default CategoryMenu;
