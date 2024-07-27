// 축제, 공연(연극, 뮤지컬, 노래/춤), 전시, 교육/체험, 청소년
// "code": "A02",
// "name": "인문(문화/예술/역사)",
// "rnum": 2,
// "subCategory":

export type CategoryCodeType = keyof typeof CATEGORY_CODE;

// Parent Category Code => A02 (264)
export const CATEGORY_CODE = {
  A0207: {
    name: '축제',
    code: 278,
    subCategoryList: [361, 362]
  },
  A0208: {
    name: '공연',
    code: 279,
    subCategoryList: [363, 364, 365, 366, 369, 370, 371, 372]
  },
  A0209: {
    name: '전시',
    code: 279,
    subCategoryList: [367, 368, 373, 374]
  }
} as const;

export const STATUS_CODE = {
  A0207: {
    name: '축제',
    code: 278,
    subCategoryList: [361, 362]
  },
  A0208: {
    name: '공연',
    code: 279,
    subCategoryList: [363, 364, 365, 366, 369, 370, 371, 372]
  },
  A0209: {
    name: '전시',
    code: 279,
    subCategoryList: [367, 368, 373, 374]
  }
} as const;

// 363	A02080100	전통공연
// 364	A02080200	연극
// 365	A02080300	뮤지컬
// 366	A02080400	오페라
// 367	A02080500	전시회
// 368	A02080600	박람회
// 369	A02080800	무용
// 370	A02080900	클래식음악회
// 371	A02081000	대중콘서트
// 372	A02081100	영화
// 373	A02081200	스포츠경기
// 374	A02081300	기타행사

export const categories = [
  {
    code: 'A0207',
    name: '축제',
    rnum: 7,
    subCategoryList: []
  },
  {
    code: 'A0208',
    name: '공연',
    rnum: 8,
    subCategoryList: [
      {
        code: 'A0208',
        name: '콘서트',
        rnum: 8,
        codeList: [
          {
            code: 'A02081000',
            name: '대중콘서트',
            rnum: 9
          }
        ]
      },
      {
        code: 'A0208',
        name: '연극',
        rnum: 8,
        codeList: [
          {
            code: 'A02080100',
            name: '전통공연',
            rnum: 1
          },
          {
            code: 'A02080200',
            name: '연극',
            rnum: 2
          }
        ]
      },
      {
        code: 'A0208',
        name: '뮤지컬/오페라',
        rnum: 8,
        codeList: [
          {
            code: 'A02080300',
            name: '뮤지컬',
            rnum: 3
          },
          {
            code: 'A02080400',
            name: '오페라',
            rnum: 4
          }
        ]
      },
      {
        code: 'A0208',
        name: '노래/춤',
        rnum: 8,
        codeList: [
          {
            code: 'A02080800',
            name: '무용',
            rnum: 7
          },
          {
            code: 'A02080900',
            name: '클래식음악회',
            rnum: 8
          }
        ]
      },
      {
        code: 'A0208',
        name: '기타',
        rnum: 8,
        codeList: [
          {
            code: 'A02081100',
            name: '영화',
            rnum: 10
          }
        ]
      }
    ]
  },
  {
    code: 'A0209',
    name: '전시',
    rnum: 8,
    subCategoryList: [
      {
        code: 'A02080500',
        name: '전시회',
        rnum: 5
      },
      {
        code: 'A02080600',
        name: '박람회',
        rnum: 6
      }
    ]
  }
];
