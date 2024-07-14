import type { Metadata } from 'next';

import ReactQueryProviders from '../logics/providers/ReactQueryProvider';

export const metadata: Metadata = {
  title: 'Hang-in-there 🚶‍♂️',
  description: '행사를 즐기는 인싸들'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}): JSX.Element {
  return (
    <html lang="ko">
      <body>
        <ReactQueryProviders>
          <div id="root">{children}</div>
        </ReactQueryProviders>
      </body>
    </html>
  );
}
