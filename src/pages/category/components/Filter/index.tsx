import { css } from '@emotion/react';
import styled from '@emotion/styled';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Stack,
  Tag,
  TagLabel,
  TagCloseButton,
  Checkbox,
  Button
} from '@chakra-ui/react';

const Filter = () => {
  return (
    <FilterContainer>
      <Accordion
        allowMultiple
        css={css`
          width: 100%;
        `}
      >
        <AccordionItem>
          <Stack>
            <AccordionButton
              as={FilterButtonContainer}
              css={css`
                display: flex;
                justify-content: space-between;
              `}
            >
              <FilterTitle>지역 검색</FilterTitle>
              <FilterTagWrapper>
                <span>최대 5개</span>
                <RegionTagsWrapper>
                  <Tag
                    size="sm"
                    borderRadius="full"
                    variant="solid"
                    colorScheme="green"
                  >
                    <TagLabel>서울시</TagLabel>
                    <TagCloseButton />
                  </Tag>
                  <Tag
                    size="sm"
                    borderRadius="full"
                    variant="solid"
                    colorScheme="blue"
                  >
                    <TagLabel>안산시</TagLabel>
                    <TagCloseButton />
                  </Tag>
                </RegionTagsWrapper>
              </FilterTagWrapper>
            </AccordionButton>
          </Stack>
          <AccordionPanel pb={4}>지역 목록</AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionButton as={FilterButtonContainer}>
            <FilterTitle>진행 상태</FilterTitle>
            <Stack spacing={5} direction="row">
              <Checkbox colorScheme="red" defaultChecked>
                진행 예정
              </Checkbox>
              <Checkbox colorScheme="green" defaultChecked>
                진행중
              </Checkbox>
            </Stack>
          </AccordionButton>
        </AccordionItem>
      </Accordion>

      <Button
        size="sm"
        css={css`
          width: fit-content;
        `}
      >
        선택 조건 검색
      </Button>
    </FilterContainer>
  );
};

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 8px;
`;

const FilterButtonContainer = styled.div`
  cursor: pointer;
`;

const FilterTitle = styled.h2`
  flex-shrink: 0;
  padding: 0 16px;
`;

const FilterTagWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
`;

const RegionTagsWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  margin-left: 8px;
`;

export default Filter;
