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
