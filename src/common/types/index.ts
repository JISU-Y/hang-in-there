export type StringBoolean = 'Y' | 'N';
export type MobileOSType = 'IOS' | 'AND' | 'WIN' | 'ETC';

export interface ApiDataResponseType<T> {
  response: {
    body: {
      items: { item: T };
      numOfRows: number;
      pageNo: number;
      totalCount: number;
    };
    header: {
      resultCode: string;
      resultMsg: string;
    };
  };
}
