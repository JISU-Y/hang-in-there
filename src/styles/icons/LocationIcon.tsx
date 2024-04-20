import { Icon, IconProps } from '@chakra-ui/react';

const LocationIcon = (props: IconProps) => (
  <Icon
    xmlns="http://www.w3.org/2000/svg"
    width={6}
    height={6}
    strokeWidth={1}
    fill="none"
    {...props}
  >
    <g clip-path="url(#A)" fill="#000000">
      <path d="M12 0A10.01 10.01 0 0 0 2 10c0 5.282 8.4 12.533 9.354 13.343l.646.546.646-.546C13.6 22.533 22 15.282 22 10A10.01 10.01 0 0 0 12 0h0zm0 15a5 5 0 0 1-3.535-8.536A5 5 0 0 1 17 10a5.01 5.01 0 0 1-1.466 3.534c-.937.938-2.208 1.464-3.534 1.466zm0-1.999a3 3 0 1 0 0-6 3 3 0 1 0 0 6z" />
    </g>
    <defs>
      <clipPath id="A">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </Icon>
);

export default LocationIcon;
