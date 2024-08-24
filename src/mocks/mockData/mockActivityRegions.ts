export interface ActivityRegion {
  id: string;
  name: string;
}

export const mockActivityRegions: ActivityRegion[] = [
  { id: 'all', name: '전국' },
  { id: 'seoul', name: '서울특별시' },
  { id: 'busan', name: '부산광역시' },
  { id: 'daegu', name: '대구광역시' },
  { id: 'incheon', name: '인천광역시' },
  { id: 'gwangju', name: '광주광역시' },
  { id: 'daejeon', name: '대전광역시' },
  { id: 'ulsan', name: '울산광역시' },
  { id: 'sejong', name: '세종특별자치시' },
  { id: 'gyeonggi', name: '경기도' },
  { id: 'gangwon', name: '강원도' },
  { id: 'chungbuk', name: '충청북도' },
  { id: 'chungnam', name: '충청남도' },
  { id: 'jeonbuk', name: '전라북도' },
  { id: 'jeonnam', name: '전라남도' },
  { id: 'gyeongbuk', name: '경상북도' },
  { id: 'gyeongnam', name: '경상남도' },
  { id: 'jeju', name: '제주특별자치도' },
];
