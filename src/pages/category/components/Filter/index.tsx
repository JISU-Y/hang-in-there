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
  TagCloseButton
} from '@chakra-ui/react';

const Filter = () => {
  return (
    <Accordion allowMultiple>
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
        <AccordionPanel pb={4}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat.
        </AccordionPanel>
      </AccordionItem>

      <AccordionItem>
        <FilterTitle>
          <AccordionButton>진행 상태</AccordionButton>
        </FilterTitle>
      </AccordionItem>
    </Accordion>
  );
};

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
