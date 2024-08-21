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
import {
  categories,
  CategoryCodeType
} from '@domains/common/constants/categories';
import { useBooleanState } from '@toss/react';
import { useOutsideClick } from '@chakra-ui/react';
import {
  useFetchPopularEventListQuery,
  useFetchSearchEventResultQuery
} from '@domains/common/network/searchQueries';

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

  const [isOpenDropdown, openDropdown, closeDropdown] = useBooleanState();

  const { data: popularEventList } = useFetchPopularEventListQuery();
  const { data: searchResultList } = useFetchSearchEventResultQuery(keyword); // TODO: debounce 추가 필요

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
        <SearchIcon width="24px" height="24px" />
        <Input
          value={keyword}
          onChange={handleChangeKeyword}
          placeholder="원하시는 행사를 검색해보세요."
        />
      </InputForm>
      {isOpenDropdown && (
        <SearchDropdown ref={dropdownRef}>
          <ResultListWrapper>
            {keyword ? (
              <SearchResultContainer>
                {searchResultList &&
                  searchResultList.map(result => (
                    <SearchResultEvent key={result.event_id}>
                      {getHighlightedText(result.title, keyword, '#FF6917')}
                    </SearchResultEvent>
                  ))}
              </SearchResultContainer>
            ) : (
              <>
                <PopularTitle>인기행사</PopularTitle>
                {popularEventList &&
                  popularEventList.map(event => (
                    <PopularCard key={event.event_id}>
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
              </>
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
  }
`;

const Input = styled.input`
  width: 100%;
  font-size: 14px;
  line-height: 20px;
  padding: 6px 12px;

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
  max-height: 424px;
  padding: 24px 0;
  background-color: #ffffff;
  border-bottom-left-radius: 12px;
  border-bottom-right-radius: 12px;
  border: 1px solid #ededed;
  z-index: 10;
`;

const ResultListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
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
`;

const RankNumber = styled.span`
  font-size: 36px;
  font-weight: 700;
  line-height: 56px;
  color: #ff6917;
  width: 38px;
  text-align: center;
  vertical-align: middle;
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
`;

const EventAddress = styled.span`
  font-size: 16px;
  font-weight: 400;
  line-height: 24px;
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
