import { useEffect, useMemo, useState } from 'react';

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

import { REGION_CODE } from '../../constants/categories';
import { useFetchAreaCodeListQuery } from '../../network/eventListQueries';
import { AreaCodeType } from '../../types';
import { useSearchParams } from 'react-router-dom';

const MAX_REGION = 5;

const Filter = () => {
  const [selectedRegions, setSelectedRegions] = useState<AreaCodeType[]>([]);
  const [currentRegionCode, setCurrentRegionCode] = useState<AreaCodeType>();

  const [, setSearchParams] = useSearchParams();

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

  const handleRegionSelect = (region: AreaCodeType) => {
    if (
      selectedRegions.length >= MAX_REGION ||
      selectedRegions.find(el => el.name === region.name)
    )
      return;

    setSelectedRegions(prev => [...prev, region]);
  };

  useEffect(() => {
    if (!areaCodeList) return;

    fetchAreaCodeList();
  }, [currentRegionCode, areaCodeList, fetchAreaCodeList]);

  const selectableAreaList = useMemo(() => {
    if (!areaCodeList || !currentRegionCode) return [];

    return [currentRegionCode, ...areaCodeList];
  }, [areaCodeList, currentRegionCode]);

  const handleRemoveTag = (region: AreaCodeType) => {
    setSelectedRegions(prev =>
      prev.filter(el => JSON.stringify(el) !== JSON.stringify(region))
    );
  };

  const handleSearchClick = () => {
    const regionCodes = selectedRegions.map(({ code }) => code);

    setSearchParams(
      regionCodes.length !== 0 ? { region: regionCodes.join(',') } : undefined
    );
  };

  // useEffect(() => {
  //   const regions = searchParams.get('region')?.split(',');

  //   setSelectedRegions(regions)
  // }, [searchParams, setSelectedRegions])

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
              css={accordionButtonCSS}
            >
              <FilterTitle>지역 검색</FilterTitle>
              <FilterTagWrapper>
                <span>최대 5개</span>
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
              border: 1px dashed rgba(0, 0, 0, 0.2);
              border-top: none;
              display: flex;
            `}
          >
            <AreaListPanel>
              {Object.values(REGION_CODE).map(({ code, name }) => (
                <AreaListButton
                  key={`${name}-${code}`}
                  role="button"
                  onClick={() => handleRegionClick({ code, name })}
                >
                  {`${name} ▷`}
                </AreaListButton>
              ))}
            </AreaListPanel>
            <AreaList>
              {selectableAreaList?.map(({ code, name }) => (
                <AreaListButton
                  key={`${name}-${code}`}
                  role="button"
                  onClick={() => handleRegionSelect({ code, name })}
                >
                  {name}
                </AreaListButton>
              ))}
            </AreaList>
          </AccordionPanel>
        </AccordionItem>

        <AccordionItem>
          <AccordionButton as={FilterButtonContainer} css={accordionButtonCSS}>
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
        onClick={handleSearchClick}
      >
        선택 조건 검색
      </Button>
    </FilterContainer>
  );
};

const accordionButtonCSS = css`
  display: flex;
  border: 1px solid rgba(0, 0, 0, 0.2);
`;

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
  font-size: 18px;
  font-weight: 600;
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

const AreaListPanel = styled.ul`
  width: 200px;
  border-right: 1px solid rgba(0, 0, 0, 0.2);
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
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

const AreaList = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  align-content: flex-start;
  padding: 0 16px;
`;

export default Filter;
