// 공통 레이아웃
import '../styles/globals.css';
import 'normalize.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import Layout from '../components/Layout';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 3000, // 3초 @서율님 제가 임의로 3초 처리 해놨습니다. 다른 의견 있으시면 수정해주세요!
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
