/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}', // 저희 폴더 구조에 맞게 수정하였습니다! 확인 부탁드립니다! @서율님
    './public/**/*.html',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#BEE5FA',
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#BEE5FA', // 와다닥 메인 컬러
          secondary: '#aac7e7', // 보조 컬러
          accent: '#9fa8d0', // 강조 색상
          neutral: '#2a2e37', // 중립 색상
          'base-100': '#FFFFFF', // 기본 배경 색상
          'base-200': '#F8F8F8', //회색 배경 색상

          info: '#3abff8', // 정보 색상
          success: '#36d399', // 성공 색상
          warning: '#fbbd23', // 경고 색상
          error: '#f87272', // 오류 색상
        },
      },
    ],
  },
};
