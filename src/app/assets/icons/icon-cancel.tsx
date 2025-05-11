import { IconProps } from './types'

export default function IconCancel({ size = 24, ...rest }: IconProps) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width={size}
      height={size}
      color={'#000000'}
      fill={'none'}
      {...rest}
    >
      <path
        d="M19.0005 4.99988L5.00049 18.9999M5.00049 4.99988L19.0005 18.9999"
        stroke="#000000"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      ></path>
    </svg>
  )
}
