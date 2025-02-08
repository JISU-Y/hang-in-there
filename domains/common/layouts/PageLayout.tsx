'use client';

import { useEffect, PropsWithChildren } from 'react';
import Link from 'next/link';
import Image from 'next/image';

import styled from '@emotion/styled';
import { Collapse, useDisclosure } from '@chakra-ui/react';
import AuthMenu from '@domains/auth/components/AuthMenu/AuthMenu';

import CategoryMenu from '../components/CategoryMenu/CategoryMenu';
import SearchBox from '../components/SearchBox/SearchBox';

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

export default function PageLayout({
  withLineBanner,
  withNavbar = true,
  withFooter = true,
  children
}: PropsWithChildren<PageLayoutProps>) {
  const { isOpen, onOpen } = useDisclosure();

  useEffect(() => {
    onOpen();
  }, [onOpen]);

  return (
    <>
      {withLineBanner && (
        <LineBannerWrapper>
          <Collapse in={isOpen}>
            <BannerLink
              href="https://twisty-foxtrot-858.notion.site/07448186998848468ded361d3935d220"
              target="_blank"
            >
              <span>
                <strong>무료함</strong>은 행인들에서 <strong>무료</strong>{' '}
                문화로 해결
              </span>
              <ImageWrapper
                width={35}
                height={35}
                src="/logo/hanginthere-text-logo-white.png"
                alt="logo-white"
              />
            </BannerLink>
          </Collapse>
        </LineBannerWrapper>
      )}

      <PageContainer>
        {withNavbar && (
          <NavbarContainer>
            <Navbar>
              <Link href="/">
                <ImageWrapper
                  width={100}
                  height={35}
                  src="/logo/hanginthere-full-logo.svg"
                  alt="logo"
                />
              </Link>
              <MenuContainer>
                <SearchBox />
                <AuthMenu />
              </MenuContainer>
            </Navbar>
            <CategoryMenuWrapper>
              <CategoryMenu />
            </CategoryMenuWrapper>
          </NavbarContainer>
        )}
        <Content>{children}</Content>
        {withFooter && (
          <Footer>
            <CopyRightWrapper>
              <FooterLogoImage
                width={98}
                height={32}
                src="/logo/hanginthere-text-logo-light.png"
                alt="hanginthere-footer-logo"
                style={{
                  width: '98px',
                  height: '32px'
                }}
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
}

const LineBannerWrapper = styled.div`
  width: 100%;
  height: 44px;

  @media (max-width: 768px) {
    height: 32px;
  }
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

    @media (max-width: 768px) {
      font-size: 16px;
      line-height: 28px;
    }
  }

  strong {
    font-weight: 600;
    color: #ffffff;
  }

  img {
    width: auto;
    height: 22px;

    @media (max-width: 768px) {
      height: 18px;
    }
  }
`;

const PageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
  max-width: 1120px;
  min-height: 100vh;
  margin: auto;
`;

const NavbarContainer = styled.header`
  display: flex;
  flex-direction: column;
  gap: 24px;
  width: 100%;
  padding: 38px 32px 0;

  @media (max-width: 768px) {
    position: relative;
    padding: 13px 20px;
    gap: 16px;
  }
`;

const Navbar = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 24px;
  width: 100%;
  background-color: #ffffff;

  & > a {
    flex-shrink: 0;
  }

  @media (max-width: 768px) {
    flex-direction: row;
    gap: 8px;
  }
`;

const MenuContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  max-width: 616px;

  @media (max-width: 768px) {
    gap: 8px;
  }
`;

const CategoryMenuWrapper = styled.div``;

const ImageWrapper = styled(Image)`
  width: auto;
  height: 32px;
  cursor: pointer;

  @media (max-width: 768px) {
    height: 24px;
  }
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

  @media (max-width: 768px) {
    flex-direction: column;
    padding: 32px 16px;
    gap: 24px;
  }
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

  @media (max-width: 768px) {
    gap: 16px;

    & p {
      font-size: 12px;
      line-height: 18px;
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

  @media (max-width: 768px) {
    gap: 16px;

    & > a {
      font-size: 14px;
      line-height: 21px;
    }
  }
`;

const FooterLogoImage = styled(Image)`
  width: 98px;
  height: 32px;

  @media (max-width: 768px) {
    width: 80px;
    height: 26px;
  }
`;
