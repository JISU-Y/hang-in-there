import styled from '@emotion/styled';
import { Menu, MenuButton, MenuList, MenuItem, Button } from '@chakra-ui/react';

// 축제 공연 전시 교육/체험 아동/청소년
const categoryList = {
  축제: null,
  공연: ['연극', '뮤지컬', '노래/춤'],
  전시: null,
  '교육/체험': null,
  '아동/청소년': ['청소년 축제', '청소년 공연', '청소년 교육/체험']
};

const Categories = () => {
  return (
    <Container>
      <CategoryWrapper>
        {Object.entries(categoryList).map(([key, value]) => (
          <Menu key={key}>
            <MenuButton as={Button}>{key}</MenuButton>
            {value && (
              <MenuList>
                {value.map(subMenu => (
                  <MenuItem>{subMenu}</MenuItem>
                ))}
              </MenuList>
            )}
          </Menu>
        ))}
      </CategoryWrapper>
    </Container>
  );
};

const Container = styled.section`
  display: flex;
  justify-content: center;
  width: 100%;
  height: 180px;
  background-color: blueviolet;
`;

const CategoryWrapper = styled.div`
  display: flex;
  gap: 24px;
`;

export default Categories;
