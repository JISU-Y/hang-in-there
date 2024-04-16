import { PropsWithChildren } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import CategoryMenu from '../components/CategoryMenu/CategoryMenu';

const EXTERNAL_DOCUMENT_LINKS = {
  SERVICE: { NAME: '이용약관', LINK: '' },
  PRIVACY: { NAME: '개인정보처리방침', LINK: '' },
  INTRO: { NAME: '서비스소개', LINK: '' },
  ADVERTISEMENT: { NAME: '광고상품 소개', LINK: '' }
};

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
      {withNavbar && (
        <Navbar>
          <Link to="/">
            <Image src="/logo/hanginthere-logo.png" alt="logo" />
          </Link>
          <CategoryMenu />
        </Navbar>
      )}
      <Content>{children}</Content>
      {withFooter && (
        <Footer>
          <CopyRightWrapper>
            <FooterLogoImage
              src="/logo/hanginthere-logo-light.png"
              alt="hanginthere-footer-logo"
            />
            <div>
              <p>
                <span>Contact</span>teamhangindle@gmail.com
              </p>
              <p>Copyright hangindle. All rights reserved</p>
            </div>
          </CopyRightWrapper>
          <ExternalLinksWrapper>
            {Object.values(EXTERNAL_DOCUMENT_LINKS).map(({ NAME, LINK }) => (
              <a key={NAME} href={LINK} target="_blank">
                {NAME}
              </a>
            ))}
          </ExternalLinksWrapper>
        </Footer>
      )}
    </PageContainer>
  );
};

const PageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 100vh;
`;

const Navbar = styled.nav`
  display: flex;
  align-items: center;
  width: 100%;
  padding: 70px 112px 0;
  background-color: #ffffff;

  & > a {
    margin-bottom: 36px;
  }
`;

const Image = styled.img`
  width: auto;
  height: 32px;
  cursor: pointer;
`;

const Content = styled.section`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
  margin: 0 auto;
`;

const Footer = styled.footer`
  display: flex;
  gap: 16px;
  justify-content: space-between;
  padding: 56px 42px;
  background-color: #ededed;
`;

const CopyRightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;

  & p {
    font-size: 14px;
    line-height: 21px;
    font-weight: 400;

    &:first-of-type {
      margin-bottom: 8px;
    }

    & span {
      color: #8b8b8b;
      margin-right: 8px;
    }
  }
`;

const ExternalLinksWrapper = styled.div`
  margin-top: auto;

  display: flex;
  gap: 32px;

  & > a {
    font-size: 16px;
    line-height: 24px;
    font-weight: 600;
    color: #000000;
  }
`;

const FooterLogoImage = styled.img`
  width: 98px;
  height: 32px;
`;

export default PageLayout;
