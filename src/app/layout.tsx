// 공통 레이아웃

'use client';

import '../styles/globals.css';
import 'normalize.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import Layout from '@/components/layout/Layout';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      gcTime: 10 * 60 * 1000,
    },
  },
});

function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>{/* 메타 태그나 기타 head 요소들 */}</head>
      <body>
        <QueryClientProvider client={queryClient}>
          <RecoilRoot>
            <Layout>{children}</Layout>
          </RecoilRoot>
        </QueryClientProvider>
      </body>
    </html>
  );
}

export default RootLayout;
