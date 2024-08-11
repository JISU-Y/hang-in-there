import { ChangeEventHandler, FormEventHandler, useState } from 'react';
import { useRouter } from 'next/navigation';

import styled from '@emotion/styled';
import { SearchIcon } from '@chakra-ui/icons';

const SearchBox = () => {
  const { push } = useRouter();

  const [keyword, setKeyword] = useState('');

  const handleChangeKeyword: ChangeEventHandler<HTMLInputElement> = e => {
    setKeyword(e.target.value);
  };

  const handleSubmitSearch: FormEventHandler<HTMLFormElement> = e => {
    e.preventDefault();

    if (!keyword) return;

    push(`/category?search=${keyword}`);
  };

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
