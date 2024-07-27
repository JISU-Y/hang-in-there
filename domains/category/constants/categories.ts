export const AREA_CODE = {
  1: {
    code: 2,
    name: '서울'
  },
  2: {
    code: 3,
    name: '인천'
  },
  3: {
    code: 4,
    name: '대전'
  },
  4: {
    code: 5,
    name: '대구'
  },
  5: {
    code: 6,
    name: '광주'
  },
  6: {
    code: 7,
    name: '부산'
  },
  7: {
    code: 8,
    name: '울산'
  },
  8: {
    code: 9,
    name: '세종',
    fullname: '세종특별자치시'
  },
  31: {
    code: 10,
    name: '경기',
    fullname: '경기도'
  },
  32: {
    code: 11,
    name: '강원',
    fullname: '강원특별자치도'
  },
  33: {
    code: 12,
    name: '충북',
    fullname: '충청북도'
  },
  34: {
    code: 13,
    name: '충남',
    fullname: '충청남도'
  },
  35: {
    code: 14,
    name: '경북',
    fullname: '경상북도'
  },
  36: {
    code: 15,
    name: '경남',
    fullname: '경상남도'
  },
  37: {
    code: 16,
    name: '전북',
    fullname: '전북특별자치도'
  },
  38: {
    code: 17,
    name: '전남',
    fullname: '전라남도'
  },
  39: {
    code: 18,
    name: '제주',
    fullname: '제주도'
  }
} as const;

export const REGION_CODE = {
  seoul: {
    code: '1',
    name: '서울'
  },
  incheon: {
    code: '2',
    name: '인천'
  },
  daejeon: {
    code: '3',
    name: '대전'
  },
  daegu: {
    code: '4',
    name: '대구'
  },
  gwangju: {
    code: '5',
    name: '광주'
  },
  busan: {
    code: '6',
    name: '부산'
  },
  ulsan: {
    code: '7',
    name: '울산'
  },
  sejong: {
    code: '8',
    name: '세종',
    fullname: '세종특별자치시'
  },
  gyeongki: {
    code: '31',
    name: '경기',
    fullname: '경기도'
  },
  gangwon: {
    code: '32',
    name: '강원',
    fullname: '강원특별자치도'
  },
  chungbuk: {
    code: '33',
    name: '충북',
    fullname: '충청북도'
  },
  chungnam: {
    code: '34',
    name: '충남',
    fullname: '충청남도'
  },
  gyeongbuk: {
    code: '35',
    name: '경북',
    fullname: '경상북도'
  },
  gyeongnam: {
    code: '36',
    name: '경남',
    fullname: '경상남도'
  },
  jeonbuk: {
    code: '37',
    name: '전북',
    fullname: '전북특별자치도'
  },
  jeonla: {
    code: '38',
    name: '전남',
    fullname: '전라남도'
  },
  jeju: {
    code: '39',
    name: '제주',
    fullname: '제주도'
  }
} as const;

export const CATEGORY_CODE = {
  nature: {
    code: 'A01',
    name: '자연'
  },
  culture: {
    code: 'A02',
    name: '인문(문화/예술/역사)'
  },
  lesuire: {
    code: 'A03',
    name: '레포츠'
  },
  shopping: {
    code: 'A04',
    name: '쇼핑'
  },
  food: {
    code: 'A05',
    name: '음식'
  },
  stay: {
    code: 'B02',
    name: '숙박'
  },
  recommendedCourse: {
    code: 'C01',
    name: '추천코스'
  }
} as const;
