// 공통 레이아웃
import '../styles/globals.css';
import 'normalize.css';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import Layout from '@/components/layout';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 3000, // 3초 @서율님 제가 임의로 3초 처리 해놨습니다. 다른 의견 있으시면 수정해주세요!
    },
  },
});

function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <Layout commonTitle={pageProps.commonTitle}>
          <Component {...pageProps} />
        </Layout>
      </RecoilRoot>
    </QueryClientProvider>
  );
}

export default App;
