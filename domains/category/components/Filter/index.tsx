import { useRouter } from 'next/navigation';

import { omit } from 'lodash';
import queryString from 'query-string';

import { css } from '@emotion/react';
import styled from '@emotion/styled';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  Stack,
  Checkbox,
  Divider,
  useDisclosure
} from '@chakra-ui/react';
import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import useGeoLocationPoint from '@logics/hooks/useGeoLocation';
import LocationIcon from '@styles/icons/LocationIcon';

import { AREA_CODE } from '../../constants/categories';
import { AreaCodeType, EventStatusEnumType } from '../../types';
import NearEventListModal from '../../modal/NearEventListModal/NearEventListModal';

const EVENT_STATUS = {
  on_going: '진행 중',
  up_comming: '진행 예정',
  closed: '진행 마감'
} as const;

interface FilterProps {
  mapX: string;
  mapY: string;
  handleSetGeoLocation: (args: { mapX: string; mapY: string }) => void;
}

const Filter = ({ mapX, mapY, handleSetGeoLocation }: FilterProps) => {
  const { push } = useRouter();

  const { isOpen, onOpen, onClose } = useDisclosure();

  const { loading: isGeoLocationLoading, loadGeoLocation } =
    useGeoLocationPoint();

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
    push(`${location.pathname}?${queryString.stringify(newQueryParams)}`, {});
  };

  const handleStatusClick = (status: EventStatusEnumType) => {
    const queryParams = queryString.parse(location.search);

    let selectedStatus: string[] = queryParams.status
      ? (queryParams.status as string).split(',')
      : [];

    if (selectedStatus.includes(status)) {
      // 이미 존재한다면 제거
      selectedStatus = selectedStatus.filter(st => st !== status);
    } else {
      // 존재하지 않는다면 추가
      selectedStatus.push(status);
    }

    // 새로운 쿼리 파라미터 객체 생성
    const newQueryParams =
      selectedStatus.length === 0
        ? omit(queryParams, 'status')
        : {
            ...queryParams,
            status: selectedStatus.join(',')
          };

    // 새로운 쿼리 파라미터로 URL 업데이트
    push(`${location.pathname}?${queryString.stringify(newQueryParams)}`);
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
        defaultIndex={[0, 1]}
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
                  {Object.values(AREA_CODE).map(({ code, name }) => {
                    const queryParams = queryString.parse(location.search);
                    const areaCodes: string[] = queryParams.areaCode
                      ? (queryParams.areaCode as string).split(',')
                      : [];

                    return (
                      <AreaListButton key={`${name}-${code}`} role="button">
                        <Checkbox
                          size="md"
                          colorScheme="blackAlpha"
                          borderColor="black"
                          defaultChecked={areaCodes.includes(String(code))}
                          onChange={e => {
                            e.preventDefault();
                            handleRegionClick({ code, name });
                          }}
                        >
                          {name}
                        </Checkbox>
                      </AreaListButton>
                    );
                  })}
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
                  {Object.entries(EVENT_STATUS).map(([key, value]) => {
                    const queryParams = queryString.parse(location.search);
                    const selectedStatus: string[] = queryParams.status
                      ? (queryParams.status as string).split(',')
                      : [];

                    return (
                      <AreaListButton key={key} role="button">
                        <Checkbox
                          size="md"
                          colorScheme="blackAlpha"
                          borderColor="black"
                          defaultChecked={selectedStatus?.includes(key)}
                          onChange={e => {
                            e.preventDefault();
                            handleStatusClick(key as EventStatusEnumType);
                          }}
                        >
                          {value}
                        </Checkbox>
                      </AreaListButton>
                    );
                  })}
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

const AreaListPanel = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: column;

  flex-shrink: 0;
`;

const AreaListButton = styled.li`
  font-size: 16px;
  padding: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;
  height: 32px;
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
