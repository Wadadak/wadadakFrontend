export const appendFormData = (
  formData: FormData,
  key: string,
  value: string | Blob | number | boolean | undefined,
) => {
  if (value !== undefined && value !== null) {
    if (typeof value === 'boolean') {
      formData.append(key, value ? 'true' : 'false'); // 불리언 값을 문자열로 변환
    } else if (typeof value === 'object' && value instanceof Blob) {
      // 파일(Blob이나 File 객체)은 그대로 추가
      formData.append(key, value);
    } else {
      formData.append(key, value.toString());
    }
  }
};

export const genderList = [
  {
    id: 'MALE',
    name: '남자',
  },
  {
    id: 'FEMALE',
    name: '여자',
  },
];

export const validateEmail = (email?: string): boolean => {
  //기획: email 형식(xxx@xxx.xxx), 50자 이내
  if (!email) return false;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password?: string): boolean => {
  //기획: 숫자, 대소문자, 특수문자 1개 이상, 8자~50자
  if (!password) return false;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_\-+=<>?{}[\]~])[A-Za-z\d!@#$%^&*()_\-+=<>?{}[\]~]{8,50}$/;
  return passwordRegex.test(password);
};