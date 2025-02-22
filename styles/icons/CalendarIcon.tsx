interface CalendarIconProps {
  width?: string;
  height?: string;
  color?: string;
}

const CalendarIcon = ({
  width = '16px',
  height = '16px',
  color = '#191919'
}: CalendarIconProps) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g clipPath="url(#clip0_922_8325)">
        <path
          d="M14 1.33333H12V0H10.6667V1.33333H5.33333V0H4V1.33333H2C1.46957 1.33333 0.960859 1.54405 0.585786 1.91912C0.210714 2.29419 0 2.8029 0 3.33333L0 16H16V3.33333C16 2.8029 15.7893 2.29419 15.4142 1.91912C15.0391 1.54405 14.5304 1.33333 14 1.33333ZM1.33333 3.33333C1.33333 3.15652 1.40357 2.98695 1.5286 2.86193C1.65362 2.7369 1.82319 2.66667 2 2.66667H14C14.1768 2.66667 14.3464 2.7369 14.4714 2.86193C14.5964 2.98695 14.6667 3.15652 14.6667 3.33333V5.33333H1.33333V3.33333ZM1.33333 14.6667V6.66667H14.6667V14.6667H1.33333Z"
          fill={color}
        />
        <path d="M11.3333 8.6665H10V9.99984H11.3333V8.6665Z" fill={color} />
        <path d="M8.66684 8.6665H7.3335V9.99984H8.66684V8.6665Z" fill={color} />
        <path d="M5.99984 8.6665H4.6665V9.99984H5.99984V8.6665Z" fill={color} />
        <path d="M11.3333 11.3335H10V12.6668H11.3333V11.3335Z" fill={color} />
        <path
          d="M8.66684 11.3335H7.3335V12.6668H8.66684V11.3335Z"
          fill={color}
        />
        <path
          d="M5.99984 11.3335H4.6665V12.6668H5.99984V11.3335Z"
          fill={color}
        />
      </g>
      <defs>
        <clipPath id="clip0_922_8325">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
};

export default CalendarIcon;
