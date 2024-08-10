// 공통 레이아웃
import '../styles/globals.css';
import 'normalize.css';
import type { AppProps } from 'next/app';
import Header from '../components/Header';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  );
}

export default App;
