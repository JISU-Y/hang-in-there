import {
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState
} from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import styled from '@emotion/styled';
import { SearchIcon } from '@chakra-ui/icons';
import { CategoryCodeType } from '@domains/common/constants/categories';

const SearchBox = () => {
  const { push } = useRouter();
  const searchParams = useSearchParams();
  const categoryCode = searchParams.get('category') as CategoryCodeType;
  const searchKeyword = searchParams.get('search');

  const [keyword, setKeyword] = useState('');

  const handleChangeKeyword: ChangeEventHandler<HTMLInputElement> = e => {
    setKeyword(e.target.value);
  };

  const handleSubmitSearch: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();

    if (!keyword) {
      push(`/category?category=${categoryCode || 'A0207'}`);

      return;
    }

    push(`/category?search=${keyword}`);
  };

  useEffect(() => {
    if (!searchKeyword) return;

    setKeyword(searchKeyword);
  }, [searchKeyword]);

  return (
    <Container>
      <InputForm onSubmit={handleSubmitSearch}>
        <SearchIcon width="24px" height="24px" />
        <Input
          value={keyword}
          onChange={handleChangeKeyword}
          placeholder="원하시는 행사를 검색해보세요."
        />
      </InputForm>
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

export default SearchBox;
