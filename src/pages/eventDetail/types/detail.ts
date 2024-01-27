import { MobileOSType, StringBoolean } from '@src/common/types';
import { ApiDataResponseType } from '@src/common/types/utilType';

export type ContentTypeUnionType = 12 | 14 | 15 | 25 | 28 | 32 | 38 | 39;

export interface EventCommonDetailRequestDto {
  MobileOS: MobileOSType;
  MobileApp: string;
  _type: string;
  contentId: string;
  contentTypeId: ContentTypeUnionType;
  defaultYN: StringBoolean;
  firstImageYN: StringBoolean;
  areacodeYN: StringBoolean;
  catcodeYN: StringBoolean;
  addrinfoYN: StringBoolean;
  mapinfoYN: StringBoolean;
  overviewYN: StringBoolean;
  numOfRows: number;
  pageNo: number;
  serviceKey: string;
}

export type EventCommonDetailResponseDto = ApiDataResponseType<
  EventCommonDetailDataType[]
>;

export interface EventCommonDetailDataType {
  contentid: string;
  contenttypeid: string;
  title: string;
  createdtime: string;
  modifiedtime: string;
  tel: string;
  telname: string;
  homepage: string;
  booktour: string;
  firstimage: string;
  firstimage2: string;
  cpyrhtDivCd: string;
  areacode: string;
  sigungucode: string;
  cat1: string;
  cat2: string;
  cat3: string;
  addr1: string;
  addr2: string;
  zipcode: string;
  mapx: string;
  mapy: string;
  mlevel: string;
  overview: string;
}

export interface EventDetailIntroRequestDto {
  MobileOS: MobileOSType;
  MobileApp: string;
  _type: string;
  contentId: string;
  contentTypeId: ContentTypeUnionType;
  numOfRows: number;
  pageNo: number;
  serviceKey: string;
}

export type EventDetailIntroResponseDto = ApiDataResponseType<
  EventDetailIntroDataType[]
>;

export interface EventDetailIntroDataType {
  chkcreditcardculture: string;
  scaleleports: string;
  usefeeleports: string;
  discountinfofestival: string;
  chkcreditcardfood: string;
  eventenddate: string;
  playtime: string;
  chkbabycarriageculture: string;
  roomcount: string;
  reservationlodging: string;
  reservationurl: string;
  roomtype: string;
  scalelodging: string;
  subfacility: string;
  barbecue: string;
  beauty: string;
  beverage: string;
  bicycle: string;
  campfire: string;
  fitness: string;
  placeinfo: string;
  parkinglodging: string;
  pickup: string;
  publicbath: string;
  opendate: string;
  parking: string;
  restdate: string;
  usetimeleports: string;
  foodplace: string;
  goodstay: string;
  hanok: string;
  infocenterlodging: string;
  eventhomepage: string;
  eventplace: string;
  parkingleports: string;
  reservation: string;
  restdateleports: string;
  eventstartdate: string;
  festivalgrade: string;
  karaoke: string;
  discountinfofood: string;
  firstmenu: string;
  infocenterfood: string;
  kidsfacility: string;
  opendatefood: string;
  opentimefood: string;
  packing: string;
  parkingfood: string;
  reservationfood: string;
  restdatefood: string;
  scalefood: string;
  seat: string;
  smoking: string;
  treatmenu: string;
  lcnsno: string;
  contentid: string;
  contenttypeid: string;
  accomcount: string;
  chkbabycarriage: string;
  chkcreditcard: string;
  chkpet: string;
  expagerange: string;
  expguide: string;
  heritage1: string;
  heritage2: string;
  heritage3: string;
  infocenter: string;
  taketime: string;
  theme: string;
  accomcountleports: string;
  chkbabycarriageleports: string;
  chkcreditcardleports: string;
  chkpetleports: string;
  expagerangeleports: string;
  infocenterleports: string;
  openperiod: string;
  parkingfeeleports: string;
  program: string;
  spendtimefestival: string;
  sponsor1: string;
  sponsor1tel: string;
  chkpetculture: string;
  discountinfo: string;
  infocenterculture: string;
  parkingculture: string;
  parkingfee: string;
  restdateculture: string;
  usefee: string;
  usetimeculture: string;
  scale: string;
  spendtime: string;
  agelimit: string;
  bookingplace: string;
  useseason: string;
  usetime: string;
  accomcountculture: string;
  sponsor2: string;
  sponsor2tel: string;
  subevent: string;
  usetimefestival: string;
  distance: string;
  infocentertourcourse: string;
  schedule: string;
  publicpc: string;
  sauna: string;
  seminar: string;
  sports: string;
  refundregulation: string;
  chkbabycarriageshopping: string;
  chkcreditcardshopping: string;
  chkpetshopping: string;
  culturecenter: string;
  fairday: string;
  infocentershopping: string;
  opendateshopping: string;
  opentime: string;
  parkingshopping: string;
  restdateshopping: string;
  restroom: string;
  saleitem: string;
  saleitemcost: string;
  scaleshopping: string;
  shopguide: string;
  checkintime: string;
  checkouttime: string;
  chkcooking: string;
  accomcountlodging: string;
  benikia: string;
}

export interface EventDetailImageRequestDto {
  MobileOS: MobileOSType;
  MobileApp: string;
  _type: string;
  contentId: string;
  imageYN: StringBoolean;
  subImageYN: StringBoolean;
  numOfRows: number;
  pageNo: number;
  serviceKey: string;
}

export type EventDetailImageResponseDto = ApiDataResponseType<
  EventDetailImageDataType[]
>;

export interface EventDetailImageDataType {
  contentid: string;
  imgname: string;
  originimgurl: string;
  serialnum: string;
  smallimageurl: string;
  cpyrhtDivCd: string;
}

export interface DetailInfoType {
  period: string;
  place: string;
  time: string;
  hostName: string;
  hostPhone: string;
  homePageLink: string;
  description: string;
}

export type DetailInfoUnionType = keyof DetailInfoType;
