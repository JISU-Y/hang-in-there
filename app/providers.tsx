'use client';

import ReactQueryProviders from '@logics/providers/ReactQueryProvider';
import StyledProviders from '@logics/providers/StyledProvider';
import KakaoScriptProvider from '@logics/providers/KakaoScriptProvider';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ReactQueryProviders>
      <StyledProviders>
        <KakaoScriptProvider>
          <div id="root">{children}</div>
        </KakaoScriptProvider>
      </StyledProviders>
    </ReactQueryProviders>
  );
}
