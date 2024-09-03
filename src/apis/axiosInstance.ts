import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import {
  getAccessToken,
  removeAccessToken,
  setAccessToken,
} from './authService';

// Axios 인스턴스 생성
const axiosInstance: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  timeout: 10000, // 요청 타임아웃 (10초)
  headers: {
    'Content-Type': 'application/json',

    // 필요 시 헤더 추가
  },
});

// 요청 인터셉터 - Access Token 자동 추가
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // JWT 토큰을 localStorage에서 가져옴
    const token = getAccessToken(); // 쿠키로 변경 가능

    // 토큰이 필요하지 않은 엔드포인트
    const publicEndpoints = [
      '/login',
      'https://accounts.google.com/o/oauth2/v2/auth?client_id=570209002929-esgj2qidamovae074v43ivravvd4b3up.apps.googleusercontent.com&redirect_uri=http://localhost:8080/login/oauth&response_type=code&scope=email',
      '/user/signup',
      '/user/signup/email-send',
      '/user/signup/email-verify',
      '/user/signup/nickname-verify',
      '/oauth2/authorization/google',
      '/region',
      '/crew/regular',
      '/token/refresh',
    ];

    // GET 메서드만 토큰이 필요 없는 엔드포인트
    const publicGetEndpoints = [
      '/crew',
      '/crew/{crew_id}/regular',
      '/crew/{crew_id}/regular/{regular_id}',
      '/crew/{crew_id}',
    ];

    // 토큰이 필요 없는 엔드포인트인지 확인
    const isPublicEndpoint = publicEndpoints.some((endpoint) =>
      config.url?.startsWith(endpoint),
    );

    // GET 메서드로 토큰이 필요 없는 엔드포인트인지 확인
    const isPublicGetEndpoint =
      config.method === 'get' &&
      publicGetEndpoints.some((endpoint) => config.url?.startsWith(endpoint));

    // 토큰이 필요한 엔드포인트에만 토큰을 헤더에 추가
    if (token && !isPublicEndpoint && !isPublicGetEndpoint) {
      if (config.headers) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error); // 요청 에러 시 에러 처리
  },
);

// 응답 인터셉터 - 401 에러 처리, 토큰 갱신
// 401 에러(Unauthorized)가 발생할 경우, 토큰을 갱신하고 원래 요청을 다시 시도합니다.
axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => response, // 응답이 정상일 경우 그대로 반환
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // 401 에러가 발생하고, 이 요청이 처음 시도된 경우
    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true; // 이 요청이 재시도 중임을 표시

      try {
        // 토큰 갱신 요청
        const { data: newAccessToken } = await axiosInstance.post(
          '/token/refresh',
          null,
          {
            withCredentials: true,
          },
        );

        // 새로 발급된 토큰은 localStorage에 저장하고, 헤더 업데이트
        setAccessToken(newAccessToken);
        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        // 원래 요청을 다시 시도
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // 토큰 갱신실패 시, 토큰을 삭제하고 로그인 페이지로 리다이렉트
        removeAccessToken();
        alert('세션이 만료되었습니다. 다시 로그인해 주세요.');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
