import { useEffect, useState } from 'react';

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
  Divider
} from '@chakra-ui/react';

import { REGION_CODE } from '../../constants/categories';
import { useFetchAreaCodeListQuery } from '../../network/eventListQueries';
import { AreaCodeType } from '../../types';

const Filter = () => {
  const [selectedRegions, setSelectedRegions] = useState<AreaCodeType[]>([]);
  const [currentRegionCode, setCurrentRegionCode] = useState<AreaCodeType>();

  const { data: areaCodeList, refetch: fetchAreaCodeList } =
    useFetchAreaCodeListQuery(currentRegionCode?.code || '', {
      enabled: !!currentRegionCode,
      refetchOnMount: false,
      refetchOnReconnect: false,
      refetchInterval: false
    });

  const handleRegionClick = (region: AreaCodeType) => {
    setCurrentRegionCode(region);
  };

  useEffect(() => {
    if (!areaCodeList) return;

    fetchAreaCodeList();
  }, [currentRegionCode, areaCodeList, fetchAreaCodeList]);

  const handleRemoveTag = (region: AreaCodeType) => {
    setSelectedRegions(prev =>
      prev.filter(el => JSON.stringify(el) !== JSON.stringify(region))
    );
  };

  return (
    <FilterContainer>
      <Accordion
        allowMultiple
        css={css`
          width: 237px;
        `}
      >
        <AccordionItem>
          <Stack>
            <AccordionButton
              as={FilterButtonContainer}
              css={accordionButtonCSS}
              padding={0}
            >
              <FilterTitle>지역별 검색</FilterTitle>
              <FilterTagWrapper>
                <RegionTagsWrapper>
                  {selectedRegions.map(({ code, name }) => (
                    <Tag
                      key={`${name}-${code}`}
                      size="sm"
                      borderRadius="full"
                      variant="solid"
                      colorScheme="orange"
                    >
                      <TagLabel>{name}</TagLabel>
                      <TagCloseButton
                        onClick={e => {
                          e.preventDefault();
                          handleRemoveTag({ code, name });
                        }}
                      />
                    </Tag>
                  ))}
                </RegionTagsWrapper>
              </FilterTagWrapper>
            </AccordionButton>
          </Stack>
          <AccordionPanel
            pb={4}
            css={css`
              border-top: none;
              padding: 0;
            `}
          >
            <AreaListPanel>
              {Object.values(REGION_CODE).map(({ code, name }) => (
                <AreaListButton
                  key={`${name}-${code}`}
                  role="button"
                  onClick={() => handleRegionClick({ code, name })}
                >
                  <Checkbox
                    size="md"
                    colorScheme="blackAlpha"
                    borderColor="black"
                  >
                    {name}
                  </Checkbox>
                </AreaListButton>
              ))}
            </AreaListPanel>
          </AccordionPanel>
        </AccordionItem>

        <Divider
          height="1px"
          color="#EDEDED"
          margin="24px 0"
          orientation="horizontal"
        />

        <AccordionItem>
          <AccordionButton
            as={FilterButtonContainer}
            css={accordionButtonCSS}
            padding={0}
          >
            <FilterTitle>진행 상태</FilterTitle>
          </AccordionButton>
          <AccordionPanel
            pb={4}
            css={css`
              border-top: none;
              padding: 0;
            `}
          >
            <AreaListPanel>
              <AreaListButton role="button">
                <Checkbox
                  size="md"
                  colorScheme="blackAlpha"
                  borderColor="black"
                >
                  진행 예정
                </Checkbox>
              </AreaListButton>
              <AreaListButton role="button">
                <Checkbox
                  size="md"
                  colorScheme="blackAlpha"
                  borderColor="black"
                >
                  진행 중
                </Checkbox>
              </AreaListButton>
            </AreaListPanel>
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </FilterContainer>
  );
};

const accordionButtonCSS = css`
  display: flex;
`;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`;

const FilterButtonContainer = styled.div`
  cursor: pointer;
`;

const FilterTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  flex-shrink: 0;
  line-height: 36px;
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

const AreaListPanel = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;

  flex-shrink: 0;
`;

const AreaListButton = styled.li`
  font-size: 16px;
  padding: 4px;
  display: inline-block;
  width: fit-content;
  background-color: transparent;
  transition: all 0.5 ease-in-out;
  flex-shrink: 0;
  border-radius: 4px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

export default Filter;
