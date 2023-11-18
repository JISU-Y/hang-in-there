import { PropsWithChildren } from 'react';
import styled from '@emotion/styled';

interface PageLayoutProps {
  withNavbar?: boolean;
  withFooter?: boolean;
}

const PageLayout = ({
  withNavbar = true,
  withFooter = true,
  children
}: PropsWithChildren<PageLayoutProps>) => {
  return (
    <PageContainer>
      {withNavbar && <Navbar>행인들 Navbar</Navbar>}
      {children}
      {withFooter && <footer>행인들 footer</footer>}
    </PageContainer>
  );
};

const PageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Navbar = styled.nav`
  width: 100%;
  height: 48px;
  background-color: red;
`;

export default PageLayout;
