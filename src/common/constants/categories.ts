// 축제, 공연(연극, 뮤지컬, 노래/춤), 전시, 교육/체험, 청소년
// "code": "A02",
// "name": "인문(문화/예술/역사)",
// "rnum": 2,
// "subCategory":

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
    code: 'A0208',
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
