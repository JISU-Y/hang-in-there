import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import styled from '@emotion/styled';
import { categories } from '@src/common/constants/categories';

const CategoryMenu = () => {
  const [, setMenuEl] = useState<HTMLDivElement | null>(null);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  // TODO: 추후 hover시 dropdown으로 처리
  // const [dropdownEl, setDropdownEl] = useState<HTMLUListElement | null>(null);

  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const handleMouseEnterMenu = (menuName: string) => {
    setActiveMenu(menuName === activeMenu ? null : menuName);
  };

  const handleMouseLeaveMenu = (menuName: string) => {
    setActiveMenu(menuName === activeMenu ? null : menuName);
  };

  const handleCategoryClick = (category: string) => {
    navigate(`/category?category=${category}`);
  };

  // useOutsideClickEffect([menuEl, dropdownEl], () => {
  //   if (!dropdownEl || !menuEl) return;

  //   setActiveMenu(null);
  // });

  return (
    <MenuContainer>
      {categories.map(category => (
        <MenuItemWrapper key={category.name} ref={setMenuEl}>
          <MenuItem
            as="button"
            $isActive={
              activeMenu === category.name ||
              searchParams.get('category') === category.name
            }
            onMouseEnter={() => handleMouseEnterMenu(category.name)}
            onMouseLeave={() => handleMouseLeaveMenu(category.name)}
            onClick={() => handleCategoryClick(category.name)}
          >
            <MenuName
              $isActive={
                activeMenu === category.name ||
                searchParams.get('category') === category.name
              }
            >
              {category.name}
            </MenuName>
          </MenuItem>
          {/* {activeMenu === category.name &&
            category.subCategoryList &&
            category.subCategoryList.length > 0 && (
              <MenuDropdown ref={setDropdownEl}>
                {category.subCategoryList.map(subCategory => (
                  <DropdownItem key={`${subCategory.code}-${subCategory.name}`}>
                    {subCategory.name}
                  </DropdownItem>
                ))}
              </MenuDropdown>
            )} */}
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
`;

const MenuName = styled.span<{ $isActive: boolean }>`
  font-weight: ${({ $isActive }) => ($isActive ? 'bold' : 'normal')};
  color: ${({ $isActive }) => ($isActive ? '#191919' : '#767676')};

  transition: all 0.3s ease-in-out;
`;

// const MenuDropdown = styled.ul`
//   position: absolute;
//   top: 68px;
//   left: 50%;
//   background-color: #191919;
//   width: 208px;
//   color: #ffffff;
//   padding: 8px 0;
//   display: flex;
//   flex-direction: column;
//   z-index: 1;
//   transform: translateX(-50%);
//   border-bottom-left-radius: 8px;
//   border-bottom-right-radius: 8px;
// `;

// const DropdownItem = styled.li`
//   width: 100%;
//   font-weight: 600;
//   cursor: pointer;
//   text-align: center;
//   padding: 12px 0;
// `;

export default CategoryMenu;
