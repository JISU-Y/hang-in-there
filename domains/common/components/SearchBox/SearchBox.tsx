import { ChangeEventHandler, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

import styled from '@emotion/styled';
import { SearchIcon } from '@chakra-ui/icons';

const SearchBox = () => {
  const [keyword, setKeyword] = useState('');

  const handleChangeKeyword: ChangeEventHandler<HTMLInputElement> = e => {
    console.log(e.target.value);
    setKeyword(e.target.value);
  };

  return (
    <Container>
      <InputWrapper>
        <SearchIcon />
        <Input
          value={keyword}
          onChange={handleChangeKeyword}
          placeholder="원하시는 행사를 검색해보세요."
        />
      </InputWrapper>
    </Container>
  );
};

const Container = styled.div`
  position: relative;
`;

const InputWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 212px;
  height: 36px;
  border-bottom: 1px solid #999999;

  svg {
    flex-shrink: 0;
  }
`;

const Input = styled.input`
  width: 100%;
  max-width: 196px;
  font-size: 14px;
  line-height: 20px;
  padding: 6px 12px;

  &::placeholder {
    color: #adadad;
  }
`;

export default SearchBox;
