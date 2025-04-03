import { format, isValid, parse } from 'date-fns';
import { FormatOptions } from 'date-fns/format';
import { ko } from 'date-fns/locale/ko';

// -------------------------------------------------------------------------------

const DATE_FORMAT_TYPE = {
  ISO_DATE: 'yyyy-MM-dd',
  ISO_DATE_WITH_DAY: 'yyyy-MM-dd (EEE)',

  SHORT_MONTH_DAY: 'MM-dd',
  SHORT_MONTH_DAY_WITH_DAY: 'MM-dd (EEE)',
  SHORT_MONTH_PERIOD_DAY: 'MM.dd',
  SHORT_MONTH_PERIOD_DAY_WITH_DAY: 'MM.dd (EEE)',

  SHORT_MONTH_DAY_YEAR: 'PP', // "MM dd, yyyy"
  SHORT_MONTH_DAY_YEAR_TIME: 'PP, hh:mm', // "MM dd, yyyy, hh:mm"
  ENG_MONTH_DAY_YEAR: 'MMM d, yyyy',
  ENG_MONTH_YEAR: 'MMM yyyy',

  TIME_WITH_DAY: 'ccc h:mm aaa'
} as const;

type DateFormatType = keyof typeof DATE_FORMAT_TYPE;

interface FormatDateType {
  date: string;
  type?: DateFormatType;
  customType?: string;
  options?: FormatOptions;
}

/**
 *
 * @param date - format 할 date string
 * @param type - DateFormatType
 * - ISO_DATE: "yyyy-MM-dd",
 * - ISO_DATE_WITH_DAY: "yyyy-MM-dd (EEE)",

 * - SHORT_MONTH_DAY: "MM-dd",
 * - SHORT_MONTH_DAY_WITH_DAY: "MM-dd (EEE)",
 * - SHORT_MONTH_PERIOD_DAY: "MM.dd",
 * - SHORT_MONTH_PERIOD_DAY_WITH_DAY: "MM.dd (EEE)",

 * - SHORT_MONTH_DAY_YEAR: "PP" -\> "MM dd, yyyy"
 * - SHORT_MONTH_DAY_YEAR_TIME :"PP, hh:mm" -\> "MM dd, yyyy, hh.mm"
 * - ENG_MONTH_DAY_YEAR: "MMM d, yyyy"
 * - ENG_MONTH_YEAR: "MMM yyyy"
 * 
 * - TIME_WITH_DAY: "ccc h:mm aaa"
 * @param customType - type 유니온에 없는 date format을 원할 경우 사용하는 param
 * @param options - date-fns format options (FormatOptions)
 */

const formatDate = ({
  date,
  type = 'ISO_DATE',
  customType,
  options
}: FormatDateType) => {
  // 잘못된 date 형식을 위한 예외 처리
  if (!isValid(new Date(date))) return 'Invalid date';

  const formatType = customType ?? DATE_FORMAT_TYPE[type];

  return format(new Date(date), formatType, {
    locale: ko,
    ...options
  });
};

/**
 * formatDate with diff between date and now
 * format 할 date 과 현재 시간 차이로 나타내는 format 함수
 *
 * 1시간 전까지는 n minutes ago
 * 1-24 시간 까지는 n hours ago
 * 1-31 day까지는 n days ago
 * 1년 미만은 months ago
 * 이후 "MM dd, yyyy, hh.mm"
 *
 * @param date - format 할 date string
 */

const formatDiffDate = (date: string) => {
  const now = new Date();
  const commentDate = new Date(date);
  const diffInSeconds = Math.floor(
    (now.valueOf() - commentDate.valueOf()) / 1000
  );
  const diffInMinutes = Math.floor(diffInSeconds / 60);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);
  const diffInMonths = Math.floor(diffInDays / 30);

  if (diffInMinutes < 1) {
    return '방금 전';
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes}분 전`;
  } else if (diffInHours < 24) {
    return `${diffInHours}시간 전`;
  } else if (diffInDays <= 31) {
    return `${diffInDays}일 전`;
  } else if (diffInMonths < 12) {
    return `${diffInMonths}달 전`;
  }

  return formatDate({
    date,
    type: 'SHORT_MONTH_DAY_YEAR_TIME'
  });
};

/**
 * "YYYYMMDD" 포맷의 date string을 "yyyy.MM.dd" 포맷으로 변환
 * @param dateStr - format 할 date string
 * @returns "yyyy.MM.dd" format date string
 */
const parseDate = (dateStr?: string) => {
  if (!dateStr) return '';

  // "YYYYMMDD" 형식의 문자열을 date-fns를 사용하여 변환
  if (dateStr.length === 8 && !isNaN(Number(dateStr))) {
    try {
      const parsedDate = parse(dateStr, 'yyyyMMdd', new Date());

      if (isValid(parsedDate)) {
        return format(parsedDate, 'yyyy.MM.dd');
      }
    } catch (e) {
      console.error('날짜 파싱 오류:', e);
    }
  }

  try {
    const date = new Date(dateStr);
    if (isValid(date)) {
      return format(date, 'yyyy.MM.dd');
    }
  } catch (e) {
    console.error('날짜 변환 오류:', e);
  }

  return dateStr;
};

export type { FormatOptions };

export { DATE_FORMAT_TYPE, formatDate, formatDiffDate, parseDate };
