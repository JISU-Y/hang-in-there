import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useRef,
  useState
} from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import styled from '@emotion/styled';
import { SearchIcon } from '@chakra-ui/icons';
import { useBooleanState } from '@toss/react';
import { useOutsideClick } from '@chakra-ui/react';
import {
  categories,
  CategoryCodeType
} from '@domains/common/constants/categories';
import {
  useFetchPopularEventListQuery,
  useFetchSearchEventResultQuery
} from '@domains/common/network/searchQueries';
import useDebounceValue from '@logics/hooks/useDebounceValue';

const getHighlightedText = (
  text: string,
  highlight: string,
  highlightColor?: string
) => {
  const parts = text.split(new RegExp(`(${highlight})`, 'gi'));
  return (
    <span>
      {parts.map((part, i) => (
        <span
          key={i}
          style={
            part.toLowerCase() === highlight.toLowerCase()
              ? { color: highlightColor || 'red' }
              : {}
          }
        >
          {part}
        </span>
      ))}
    </span>
  );
};

const SearchBox = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const { push } = useRouter();
  const searchParams = useSearchParams();
  const categoryCode = searchParams.get('category') as CategoryCodeType;
  const searchKeyword = searchParams.get('search');

  const [keyword, setKeyword] = useState('');
  const debouncedKeyword = useDebounceValue(keyword, 500);

  const [isOpenDropdown, openDropdown, closeDropdown] = useBooleanState();

  const { data: popularEventList } = useFetchPopularEventListQuery(5, {
    enabled: isOpenDropdown
  });
  const { data: searchResultList } = useFetchSearchEventResultQuery(
    debouncedKeyword,
    {
      enabled: !!debouncedKeyword
    }
  );

  const handleChangeKeyword: ChangeEventHandler<HTMLInputElement> = e => {
    setKeyword(e.target.value);
  };

  const handleSubmitSearch: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();

    if (!keyword) {
      push(`/category?category=${categoryCode || categories[0].code}`); // NOTE: default category -> 축제 (A0207)

      return;
    }

    push(`/category?search=${keyword}`);
  };

  const goToEventDetail = (eventId: number) => {
    push(`/eventDetail/${eventId}`);

    setKeyword('');
  };

  useEffect(() => {
    setKeyword(searchKeyword || '');
  }, [searchKeyword, categoryCode]);

  useOutsideClick({
    ref: containerRef,
    handler: closeDropdown
  });

  return (
    <Container ref={containerRef} onFocus={openDropdown}>
      <InputForm onSubmit={handleSubmitSearch}>
        <SearchIcon
          width="24px"
          height="24px"
          onClick={openDropdown}
          style={{ cursor: 'pointer' }}
        />
        <Input
          value={keyword}
          onChange={handleChangeKeyword}
          placeholder="원하시는 행사를 검색해보세요."
        />
      </InputForm>
      {isOpenDropdown && (
        <SearchDropdown ref={dropdownRef}>
          <MobileInputForm onSubmit={handleSubmitSearch}>
            <Input
              value={keyword}
              onChange={handleChangeKeyword}
              placeholder="원하시는 행사를 검색해보세요."
            />
          </MobileInputForm>
          <ResultListWrapper>
            {keyword ? (
              <SearchResultContainer>
                {searchResultList &&
                  searchResultList.map(result => (
                    <SearchResultEvent
                      key={result.event_id}
                      onClick={() => goToEventDetail(result.event_id)}
                    >
                      {getHighlightedText(result.title, keyword, '#FF6917')}
                    </SearchResultEvent>
                  ))}
              </SearchResultContainer>
            ) : (
              <PopularContainer>
                <PopularTitle>인기행사</PopularTitle>
                {popularEventList &&
                  popularEventList.map(event => (
                    <PopularCard
                      key={event.event_id}
                      onClick={() => goToEventDetail(event.event_id)}
                    >
                      <RankNumber>{event.rank}</RankNumber>
                      <EventInfo>
                        <EventTitle>{event.title}</EventTitle>
                        <EventAddress>
                          {event.address
                            ? event.address.split(' ').slice(0, 2).join(' ')
                            : '미정'}
                        </EventAddress>
                      </EventInfo>
                    </PopularCard>
                  ))}
              </PopularContainer>
            )}
          </ResultListWrapper>
        </SearchDropdown>
      )}
    </Container>
  );
};

const Container = styled.div`
  position: relative;
  width: 100%;

  @media (max-width: 768px) {
    position: unset;
  }
`;

const InputForm = styled.form`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 36px;
  border-bottom: 1px solid #999999;

  svg {
    flex-shrink: 0;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    justify-content: flex-end;
    border-bottom: none;

    input {
      display: none;
    }
  }
`;

const MobileInputForm = styled.form`
  display: none;

  @media (max-width: 768px) {
    position: sticky;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    border-bottom: 1px solid #999999;
    padding: 8px 16px;
    background-color: #ffffff;
  }
`;

const Input = styled.input`
  width: 100%;
  font-size: 14px;
  line-height: 20px;
  padding: 6px 12px;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #adadad;
  }
`;

const SearchDropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
  max-height: 436px;
  padding: 0;
  background-color: #ffffff;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  border: 1px solid #ededed;
  z-index: 10;

  @media (max-width: 768px) {
    top: calc(100% - 2px);
    left: 0;
    width: 100vw;
    max-height: 60vh;

    overflow-y: auto;
    border: none;
  }
`;

const ResultListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const PopularContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 16px 0;
`;

const PopularTitle = styled.h4`
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  padding: 0 32px;
`;

const PopularCard = styled.div`
  display: flex;
  gap: 8px;
  width: 100%;
  height: 56px;
  cursor: pointer;
  padding: 0 32px;

  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #ededed;
  }

  @media (max-width: 768px) {
    height: 48px;
    padding: 0 16px;
  }
`;

const RankNumber = styled.span`
  font-size: 36px;
  font-weight: 700;
  line-height: 56px;
  color: #ff6917;
  width: 38px;
  text-align: center;
  vertical-align: middle;

  @media (max-width: 768px) {
    font-size: 24px;
    line-height: 48px;
  }
`;

const EventInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

const EventTitle = styled.span`
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;

  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 21px;
  }
`;

const EventAddress = styled.span`
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;

  @media (max-width: 768px) {
    font-size: 14px;
    line-height: 21px;
  }
`;

const SearchResultContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const SearchResultEvent = styled.p`
  font-size: 16px;
  font-weight: 700;
  line-height: 24px;
  cursor: pointer;
  padding: 0 32px;

  transition: all 0.3s ease-in-out;

  &:hover {
    background-color: #ededed;
  }
`;

export default SearchBox;
