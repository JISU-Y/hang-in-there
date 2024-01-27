import { PropsWithChildren } from 'react';
import styled from '@emotion/styled';

const footerData: { listTitle: string; label: string }[] = [
  {
    listTitle: '사이드 프로젝트 소개',
    label: `행사를 즐기는 인싸들 여기서 만나자!\n힘든 일상을 버티게 해줄 행사 플랫폼, HANG IN THERE!`
  },
  {
    listTitle: '기획자/PM',
    label: '유지아 | dbwldk7675@gmail.com'
  },
  {
    listTitle: '개발자',
    label: '유지수 | jisu129@gmail.com'
  }
];

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
          {/* TODO: link -> home 추가 */}
          <Image src="/logo/logo.png" alt="logo" />
        </Navbar>
      )}
      <Content>{children}</Content>
      {withFooter && (
        <Footer>
          {footerData.map(({ listTitle, label }) => (
            <div>
              <span>{listTitle}</span>
              <span>{label}</span>
            </div>
          ))}
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
  background-color: #dddddd;
`;

const Navbar = styled.nav`
  display: flex;
  align-items: center;
  width: 100%;
  height: 48px;
  padding: 0 12px;
  background-color: #ff701b;
`;

const Image = styled.img`
  height: 40px;
  cursor: pointer;
`;

const Content = styled.section`
  width: 100%;
  height: 100%;
  background-color: #ffffff;
`;

const Footer = styled.footer`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 36px 42px;
  background-color: #dddddd;

  & > div {
    display: flex;
    justify-content: space-between;

    & > span:first-child {
      font-weight: 600;
    }

    & > span:last-child {
      text-align: right;
      white-space: pre-line;
    }
  }
`;

export default PageLayout;
