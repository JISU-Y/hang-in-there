import { PropsWithChildren } from 'react';
import styled from '@emotion/styled';
import { Link } from 'react-router-dom';
import CategoryMenu from '../components/CategoryMenu/CategoryMenu';

// TODO: Footer 임시 제거 (변경 예정)
// const footerData: { listTitle: string; label: string }[] = [
//   {
//     listTitle: '사이드 프로젝트 소개',
//     label: `행사를 즐기는 인싸들 여기서 만나자!\n힘든 일상을 버티게 해줄 행사 플랫폼, HANG IN THERE!`
//   },
//   {
//     listTitle: '기획자/PM',
//     label: '유지아 | dbwldk7675@gmail.com'
//   },
//   {
//     listTitle: '디자이너',
//     label: '김은별 | xxx@gmail.com'
//   },
//   {
//     listTitle: '개발자',
//     label: '유지수 | jisu129@gmail.com'
//   }
// ];

interface PageLayoutProps {
  withNavbar?: boolean;
  withFooter?: boolean;
}

const PageLayout = ({
  withNavbar = true,
  // withFooter = true,
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
      {/* {withFooter && (
        <Footer>
          {footerData.map(({ listTitle, label }) => (
            <div>
              <span>{listTitle}</span>
              <span>{label}</span>
            </div>
          ))}
        </Footer>
      )} */}
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
