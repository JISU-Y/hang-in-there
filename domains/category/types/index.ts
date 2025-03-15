import { MobileOSType, StringBoolean } from '@domains/common/types';
import {
  ApiDataResponseType,
  ApiDataResponseTypeNew,
  ApiPaginationDataResponseType
} from '@domains/common/types/utilType';

export type EventStatusEnumType = 'on_going' | 'up_comming' | 'closed';

export interface EventListRequestDtoNew {
  area_cd: string;
  sigungu_cd?: string;
  category?: string;
  sub_category?: string;
  detail_sub_category?: string;
  size: number;
  page: number;
}

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
  contentTypeId: number;
}

export interface NearEventListRequestDto {
  currentLng: string;
  currentLat: string;
  distance: number;
}

export type EventListResponseDto = ApiDataResponseTypeNew<EventDataTypeNew[]>;
export type EventListResponseDtoNew = ApiPaginationDataResponseType<
  EventDataTypeNew[]
>;

export interface EventDataTypeNew {
  event_id: number;
  image: string;
  title: string;
  event_st: string;
  event_ed: string;
  content_type: number;
  area_cd: number;
  sigungu_cd: number;
  category: number;
  sub_category: number;
  detail_sub_category: number;
  reg_dt: string;
  addr: string;
  addr_detail: string;
  map_x: string;
  map_y: string;
}

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
  code: number;
  name: string;
  rnum: string;
}

export type AreaCodeType = Omit<AreaCodeDataType, 'rnum'>; // (typeof AREA_CODE)[keyof typeof AREA_CODE];
export type AreaCodeParamType = AreaCodeType['code'];
