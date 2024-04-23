import { useState } from 'react';

import { omit } from 'lodash';

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
  Divider,
  useDisclosure
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';

import useGeoLocationPoint from '@src/logics/hooks/useGeoLocation';

import { AREA_CODE } from '../../constants/categories';
import { AreaCodeType } from '../../types';
import NearEventListModal from '../../modal/NearEventListModal/NearEventListModal';
import LocationIcon from '@src/styles/icons/LocationIcon';
import { useLocation, useNavigate } from 'react-router-dom';
import queryString from 'query-string';

interface FilterProps {
  mapX: string;
  mapY: string;
  handleSetGeoLocation: (args: { mapX: string; mapY: string }) => void;
}

const Filter = ({ mapX, mapY, handleSetGeoLocation }: FilterProps) => {
  const location = useLocation();
  const navigate = useNavigate();

  const [selectedRegions, setSelectedRegions] = useState<AreaCodeType[]>([]);

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { loading: isGeoLocationLoading, loadGeoLocation } =
    useGeoLocationPoint();

  // const { data: areaCodeList, refetch: fetchAreaCodeList } =
  //   useFetchAreaCodeListQuery(String(currentRegionCode?.code), {
  //     enabled: !!currentRegionCode,
  //     refetchOnMount: false,
  //     refetchOnReconnect: false,
  //     refetchInterval: false
  //   });

  const handleRegionClick = (region: AreaCodeType) => {
    const regionCode = String(region.code);
    const queryParams = queryString.parse(location.search);

    let areaCodes: string[] = queryParams.areaCode
      ? (queryParams.areaCode as string).split(',')
      : [];

    if (areaCodes.includes(regionCode)) {
      // 이미 존재한다면 제거
      areaCodes = areaCodes.filter(code => code !== regionCode);
    } else {
      // 존재하지 않는다면 추가
      areaCodes.push(regionCode);
    }

    // 새로운 쿼리 파라미터 객체 생성
    const newQueryParams =
      areaCodes.length === 0
        ? omit(queryParams, 'areaCode')
        : {
            ...queryParams,
            areaCode: areaCodes.join(',')
          };

    // 새로운 쿼리 파라미터로 URL 업데이트
    navigate(`${location.pathname}?${queryString.stringify(newQueryParams)}`);
  };

  const handleRemoveTag = (region: AreaCodeType) => {
    setSelectedRegions(prev =>
      prev.filter(el => JSON.stringify(el) !== JSON.stringify(region))
    );
  };

  const handleClickFindNearEvent = async () => {
    onOpen();

    const geoLocationRes = await loadGeoLocation();

    if (geoLocationRes) {
      const { latitude, longitude } = geoLocationRes;

      handleSetGeoLocation({ mapX: String(longitude), mapY: String(latitude) });
    }
  };

  return (
    <FilterContainer>
      <NearEventButton type="button" onClick={handleClickFindNearEvent}>
        <span>내 주변 찾기</span>
        <LocationIcon color="#000000" />
      </NearEventButton>

      <NearEventListModal
        isLocationLoading={isGeoLocationLoading}
        mapX={mapX}
        mapY={mapY}
        isOpen={isOpen}
        onClose={onClose}
      />

      <Divider
        height="1px"
        color="#EDEDED"
        margin="24px 0"
        orientation="horizontal"
      />

      <Accordion
        allowMultiple
        css={css`
          width: 237px;
        `}
      >
        <AccordionItem>
          {({ isExpanded }) => (
            <>
              <Stack>
                <AccordionButton
                  as={FilterButtonContainer}
                  css={accordionButtonCSS}
                  padding={0}
                >
                  <FilterTitle>
                    <span>지역별 검색</span>
                    {isExpanded ? (
                      <ChevronUpIcon
                        w={6}
                        h={6}
                        strokeWidth={1}
                        color="#000000"
                      />
                    ) : (
                      <ChevronDownIcon
                        w={6}
                        h={6}
                        strokeWidth={1}
                        color="#000000"
                      />
                    )}
                  </FilterTitle>
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
                  {Object.values(AREA_CODE).map(({ code, name }) => (
                    <AreaListButton key={`${name}-${code}`} role="button">
                      <Checkbox
                        size="md"
                        colorScheme="blackAlpha"
                        borderColor="black"
                        onChange={e => {
                          e.preventDefault();
                          handleRegionClick({ code, name });
                        }}
                      >
                        {name}
                      </Checkbox>
                    </AreaListButton>
                  ))}
                </AreaListPanel>
              </AccordionPanel>
            </>
          )}
        </AccordionItem>

        <Divider
          height="1px"
          color="#EDEDED"
          margin="24px 0"
          orientation="horizontal"
        />

        <AccordionItem>
          {({ isExpanded }) => (
            <>
              <AccordionButton
                as={FilterButtonContainer}
                css={accordionButtonCSS}
                padding={0}
              >
                <FilterTitle>
                  <span>진행 상태</span>
                  {isExpanded ? (
                    <ChevronUpIcon
                      w={6}
                      h={6}
                      strokeWidth={1}
                      color="#000000"
                    />
                  ) : (
                    <ChevronDownIcon
                      w={6}
                      h={6}
                      strokeWidth={1}
                      color="#000000"
                    />
                  )}
                </FilterTitle>
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
            </>
          )}
        </AccordionItem>
      </Accordion>
    </FilterContainer>
  );
};

const accordionButtonCSS = css`
  width: 100%;
`;

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const FilterButtonContainer = styled.div`
  cursor: pointer;
`;

const FilterTitle = styled.h2`
  font-size: 18px;
  font-weight: 600;
  flex-shrink: 0;
  line-height: 36px;

  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
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

const NearEventButton = styled.button`
  font-size: 18px;
  font-weight: 600;
  flex-shrink: 0;
  line-height: 36px;
  text-align: left;
  width: 100%;

  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export default Filter;
