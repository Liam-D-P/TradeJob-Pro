import React from 'react';

interface DotPatternProps extends React.SVGProps<SVGSVGElement> {
  width: number
  height: number
  cx: number
  cy: number
  cr: number
}

export default function DotPattern({
  width,
  height,
  cx,
  cy,
  cr,
  ...props
}: DotPatternProps) {
  return (
    <svg width="100%" height="100%" {...props}>
      <defs>
        <pattern
          id="dotPattern"
          x="0"
          y="0"
          width={width}
          height={height}
          patternUnits="userSpaceOnUse"
        >
          <circle cx={cx} cy={cy} r={cr} fill="currentColor" />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill="url(#dotPattern)" />
    </svg>
  )
}
