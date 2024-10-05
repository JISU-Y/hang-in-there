export type StringBoolean = 'Y' | 'N';
export type MobileOSType = 'IOS' | 'AND' | 'WIN' | 'ETC';

export interface PageParamProps<TParam> {
  params: { slug?: string } & TParam;
  searchParams: { [key: string]: string | string[] | undefined };
}
