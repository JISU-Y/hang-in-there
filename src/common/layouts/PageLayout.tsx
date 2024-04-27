import { useEffect, PropsWithChildren } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import CategoryMenu from '../components/CategoryMenu/CategoryMenu';
import { Collapse, Slide, useDisclosure } from '@chakra-ui/react';

const EXTERNAL_DOCUMENT_LINKS = {
  SERVICE: { NAME: '이용약관', LINK: '' },
  PRIVACY: { NAME: '개인정보처리방침', LINK: '' },
  INTRO: { NAME: '서비스소개', LINK: '' },
  ADVERTISEMENT: { NAME: '광고상품 소개', LINK: '' }
};

interface PageLayoutProps {
  withLineBanner?: boolean;
  withNavbar?: boolean;
  withFooter?: boolean;
}

const PageLayout = ({
  withLineBanner,
  withNavbar = true,
  withFooter = true,
  children
}: PropsWithChildren<PageLayoutProps>) => {
  const { isOpen, onOpen } = useDisclosure();

  useEffect(() => {
    onOpen();
  }, []);

  return (
    <>
      {withLineBanner && (
        <LineBannerWrapper>
          <Collapse in={isOpen}>
            <BannerLink
              to="/" // TODO: 소개 노션 링크 추가
              target="_blank"
            >
              <span>
                <strong>무료함</strong>은 행인들에서 <strong>무료</strong>{' '}
                문화로 해결
              </span>
              <Image src="/logo/hanginthere-logo-white.png" alt="logo-white" />
            </BannerLink>
          </Collapse>
        </LineBannerWrapper>
      )}
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
                <p>Copyright 2024. 행인들 All rights reserved.</p>
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
    </>
  );
};

const LineBannerWrapper = styled.div`
  width: 100%;
  height: 44px;
`;

const BannerLink = styled(Link)`
  display: flex;
  gap: 16px;
  justify-content: center;
  align-items: center;
  background-color: #ff6917;
  padding: 4px 0;

  span {
    font-size: 20px;
    font-weight: 400;
    line-height: 36px;
    color: #ffffff;
  }

  strong {
    font-weight: 600;
    color: #ffffff;
  }

  img {
    width: auto;
    height: 22px;
  }
`;

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
  padding: 45px 112px 0;
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
