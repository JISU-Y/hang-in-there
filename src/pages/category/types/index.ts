import { MobileOSType, StringBoolean } from '@src/common/types';
import { ApiDataResponseType } from '@src/common/types/utilType';

export interface EventListRequestDto {
  MobileOS: MobileOSType;
  MobileApp: string;
  _type: string;
  listYN: StringBoolean;
  arrange: 'A' | 'C' | 'D' | 'O' | 'Q' | 'R';
  eventStartDate: string;
  eventEndDate: string;
  areaCode: string;
  sigunguCode: string;
  modifiedtime: string;
  numOfRows: number;
  pageNo: number;
  serviceKey: string;
}

export type EventListResponseDto = ApiDataResponseType<EventDataType[]>;

export interface EventDataType {
  addr1: string;
  addr2: string;
  areacode: string;
  booktour: string;
  cat1: string;
  cat2: string;
  cat3: string;
  contentid: string;
  contenttypeid: string;
  cpyrhtDivCd: string;
  createdtime: string;
  eventenddate: string;
  eventstartdate: string;
  firstimage: string;
  firstimage2: string;
  mapx: string;
  mapy: string;
  mlevel: string;
  modifiedtime: string;
  sigungucode: string;
  tel: string;
  title: string;
}

export interface AreaCodeRequestDto {
  MobileOS: MobileOSType;
  MobileApp: string;
  _type: string;
  areaCode: string;
  contentId: string;
  numOfRows: number;
  pageNo: number;
  serviceKey: string;
}

export type AreaCodeResponseDto = ApiDataResponseType<AreaCodeDataType[]>;

export interface AreaCodeDataType {
  code: string;
  name: string;
  rnum: string;
}

export type AreaCodeType = Omit<AreaCodeDataType, 'rnum'>; // (typeof REGION_CODE)[keyof typeof REGION_CODE];
