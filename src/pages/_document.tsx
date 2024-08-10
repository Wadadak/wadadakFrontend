import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="ko">
      <Head>{/* 메타 태그나 외부 스타일시트 링크 (예: 구글 폰트) */}</Head>
      <body className="body">
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
