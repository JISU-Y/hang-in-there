import { format, isValid } from 'date-fns';
import { FormatOptions } from 'date-fns/format';

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
    return 'just now';
  } else if (diffInMinutes < 60) {
    return `${diffInMinutes} minute${diffInMinutes > 1 ? 's' : ''} ago`;
  } else if (diffInHours < 24) {
    return `${diffInHours} hour${diffInHours > 1 ? 's' : ''} ago`;
  } else if (diffInDays <= 31) {
    return `${diffInDays} day${diffInDays > 1 ? 's' : ''} ago`;
  } else if (diffInMonths < 12) {
    return `${diffInMonths} month${diffInMonths > 1 ? 's' : ''} ago`;
  }

  return formatDate({
    date,
    type: 'SHORT_MONTH_DAY_YEAR_TIME'
  });
};

export type { FormatOptions };

export { DATE_FORMAT_TYPE, formatDate, formatDiffDate };
