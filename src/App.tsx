'use client';

import {
  ActionFunction,
  LoaderFunction,
  RouterProvider,
  createBrowserRouter
} from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';

import { ChakraProvider } from '@chakra-ui/react';

import './App.css';

interface RouteCommon {
  loader?: LoaderFunction;
  action?: ActionFunction;
  ErrorBoundary?: React.ComponentType<any>;
}

interface IRoute extends RouteCommon {
  path: string;
  Element: React.ComponentType<any>;
}

interface Pages {
  [key: string]: {
    default: React.ComponentType<any>;
  } & RouteCommon;
}

// FIXME: eager option을 생략해야 code splitting이 된다고 하는 것 같은데 생략하면 오류.
const routeModules: Pages = import.meta.glob('./routes/**/*.tsx', {
  eager: true
});

const routes: IRoute[] = [];

for (const path of Object.keys(routeModules)) {
  const fileName = path.match(/\.\/routes\/(.*)\.tsx$/)?.[1];
  if (!fileName) {
    continue;
  }

  const normalizedPathName = fileName.includes('$')
    ? fileName.replace('$', ':')
    : fileName.replace(/\/index/, '');

  routes.push({
    path: fileName === 'index' ? '/' : `/${normalizedPathName.toLowerCase()}`, // 등록하려는 경로
    Element: routeModules[path].default, // 해당 경로에 나타낼 React 컴포넌트 (페이지)
    loader: routeModules[path]?.loader as LoaderFunction | undefined, // 데이터 가져오기 기능 (optional)
    action: routeModules[path]?.action as ActionFunction | undefined, // form data 제출 기능 (optional)
    ErrorBoundary: routeModules[path]?.ErrorBoundary // path 오류 났을 때 fallback (optional)
  });
}

// FIXME: 자동 import는 또 왜 안되는겨
const router = createBrowserRouter(
  routes.map(({ Element, ErrorBoundary, ...rest }) => ({
    ...rest,
    element: <Element />,
    ...(ErrorBoundary && { errorElement: <ErrorBoundary /> })
  }))
);

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <RouterProvider router={router} />
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
