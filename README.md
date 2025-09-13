# 행인들(Hang-in-there)

> 국내 공공기관에서 주최하는 행사/축제 정보를 쉽고 빠르게 탐색할 수 있는 웹 서비스

링크: [행인들](hang-in-there-sigma.vercel.app)

\*현재는 비용 상 api 서버를 가동하고 있지 않아 사이트 방문이 어렵습니다.

## 👥 팀 구성

- PM 1, Designer 1, FE 1(본인), BE 1
  - 프론트엔드(React/Next.js) 전담으로 설계/구현을 담당

## 🎯 제작 목적

- 팀 프로젝트로 진행된 서비스
  - User's Pain point: 공공기관 주최 행사/축제는 무료인 경우가 많은데, 이를 몰라서 혜택을 놓치는 국민이 많음. 또한, 젊은 층의 참여도도 낮음
- 프론트엔드 개인 기술 실험/학습
  > Next.js App Router(14+)와 React 18을 기반으로, React Query 5로 데이터 페칭을 표준화하고, Parallel Routes를 활용한 모달 UI, Suspense 기반의 선언적 Fallback 등을 적용했습니다.

## 🛠️ 기술 스택

- 프레임워크/런타임: `Next.js v14(App Router)`, `React v18`, `TypeScript`
- 상태/데이터: `@tanstack/react-query v5`
- UI: `Chakra UI`, `Emotion(styled)`, `Framer Motion`
- 네트워킹: `Axios`, `Interceptors(토큰 재발급 처리)`
- 인증/쿠키: `cookies-next`, `Kakao JS SDK`
- 유틸: `date-fns`, `lodash`, `query-string`, `crypto-js` 등
- 도구: `ESLint`, `Prettier`
- 배포: `Vercel`
- 주요 버전은 `package.json` 참조

## 📁 폴더 구조

```
├─ app/
│  ├─ (community)/
│  ├─ @auth/
│  ├─ api/
│  ├─ layout.tsx
│  ├─ providers.tsx
│  └─ page.tsx
├─ domains/
│  ├─ category/
│  ├─ common/
│  ├─ community/
│  ├─ eventDetail/
│  ├─ home/
│  └─ near-events/
├─ logics/
│  ├─ api/
│  ├─ providers/
│  └─ utils/
├─ styles/
└─ public/
```

## ⚡ 구현 기능

### 인증/로그인

- 카카오 로그인: `app/@auth/login/page.tsx` 모달에서 Kakao.Auth.authorize 호출 → 백엔드 콜백 후 `app/api/auth/route.ts`에서 토큰 디코딩·쿠키 저장 → 리다이렉트(원래 경로 복귀)
  - 리다이렉트 경로 쿠키 관리: `domains/auth/utils/authTokenHandler.ts` (`COOKIE_KEY.REDIRECT_PATH`)
  - 접근 가드 훅: `domains/auth/hooks/useAuthSession.ts` (토큰 존재 여부로 가드/로그아웃)
- API Route: `app/api/auth/route.ts`에서 `t` 파라미터 복호화 후 `@auth/*` 쿠키 저장

### 메인 화면(Home)

- 서버에서 React Query prefetch/dehydrate 후 `Hydrate`로 클라이언트 전달: `domains/home/index.tsx` + `logics/utils/reactQuery.ts`
- 진행 중/다가오는 행사 목록 섹션 구성

### 검색 화면(제목 자동완성, 인기 행사)

- `domains/common/network/searchQueries.ts`에서 인기 행사/자동완성 API 제공

### 카테고리/목록 화면

- `domains/category/network/eventListQueries.ts`: 무한 스크롤 쿼리, 근처 행사 쿼리 제공

### 상세 페이지(행사 상세)

- `domains/eventDetail/network/eventDetailFetchHandlers.ts`/`eventDetailQueries.ts`로 상세/연관 행사 조회
- 공유/전화/위치 정보, 주최/주관, 기간/시간 등 표기: `domains/eventDetail/index.tsx`

### 내 주변 행사

- 지도+리스트를 `Suspense`로 각각 감싼 병렬 UI: `app/near-events/page.tsx`
- 현재 좌표 기반 주변 행사 쿼리: `useFetchNearEventListQuery`

### 커뮤니티 게시판(개발 중)

- 목록/태그/무한 스크롤/상세 모달: `domains/community/network/communityQueries.ts` + `app/(community)/posts/@detailModal/(.)detail/[postId]/page.tsx`

## 📚 도입 기술 스터디

> Next.js App Router v14+, React v18

### 라우팅/모달 구조(Parallel & Intercepting Routes)

- 커뮤니티 상세는 목록과 별도의 병렬 슬롯(`@detailModal`)로 인터셉트되어 모달로 노출

  - 레이아웃: `app/(community)/posts/layout.tsx` (children + detailModal 동시 렌더)
  - 인터셉팅 라우트: `app/(community)/posts/@detailModal/(.)detail/[postId]/page.tsx`
  - 기본 슬롯 비움: `app/(community)/posts/@detailModal/default.tsx`

- 테크 블로그 작성  
  [Parallel/Intercepting Routes로 모달 UX](https://jisu-yoo.notion.site/Next-js-Parallel-Routes-Intercepting-Routes-20243e5500ca80df9c1ae6ab1f68727d)

### 데이터 페칭/상태

- 공통 API 래퍼: `logics/api/baseApi.ts` (+ `interceptors.ts` 재발급 큐/재시도)
- React Query v5 사용

  - 서버 프리패치/탈수: `logics/utils/reactQuery.ts` → `domains/home/index.tsx`에서 사용
  - 클라이언트 쿼리 훅: 각 도메인의 `network/*Queries.ts`

- 테크 블로그 작성  
  [서버 사이드에서 react-query 사용](https://jisu-yoo.notion.site/react-query-data-fetching-from-server-side-11c43e5500ca8079a9a8ce11082efa0b)  
   [RSC 스터디 정리](https://jisu-yoo.notion.site/React-Server-Component-19843e5500ca80869da2ea6da50b08aa)

### Suspense/Fallback

- 페이지별 Suspense 적용 예시

  - 홈/카테고리: `app/page.tsx`, `app/category/page.tsx`에서 섹션을 `Suspense`로 감싸 Fallback 처리
  - 내 주변 행사: 지도/리스트 각각 Suspense + 스피너 Fallback `app/near-events/page.tsx`

- 테크 블로그 작성  
  [Suspense로 선언적 Fallback](https://jisu-yoo.notion.site/Fallback-Suspense-ErrorBoundary-1a643e5500ca8038a137f2330ed1e31f)
