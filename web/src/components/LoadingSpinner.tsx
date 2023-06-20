import { Oval } from 'react-loader-spinner'

type LoadingSpinnerProps = {
  width?: number
  height?: number
  strokeWidth?: number
}

export default function LoadingSpinner({
  width = 25,
  height = 25,
  strokeWidth = 4,
}: LoadingSpinnerProps) {
  return (
    <Oval
      height={width}
      width={height}
      strokeWidth={strokeWidth || 4}
      color="#ffffff"
      secondaryColor="#ffffff"
    />
  )
}
