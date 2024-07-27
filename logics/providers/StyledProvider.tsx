'use client';

import type { PropsWithChildren } from 'react';

import { ChakraProvider } from '@chakra-ui/react';
import GlobalStyles from '@styles/GlobalStyles';

/* GlobalStyles를 입혀주기 위한 Provider: use client 필수
GlobalStyles를 직접 Root layout에 가져다 쓰면 에러 발생. */
const StyledProviders = ({ children }: PropsWithChildren) => {
  return (
    <ChakraProvider>
      <GlobalStyles />
      {children}
    </ChakraProvider>
  );
};

export default StyledProviders;
