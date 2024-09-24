import React from 'react'
import { cn } from '@/lib/utils'

export const Marquee = ({
  className,
  reverse,
  pauseOnHover = false,
  children,
  ...props
}: {
  className?: string
  reverse?: boolean
  pauseOnHover?: boolean
  children: React.ReactNode
}) => {
  return (
    <div
      {...props}
      className={cn('group flex overflow-hidden', className)}
    >
      <div
        className={cn(
          'animate-marquee flex min-w-full shrink-0 items-center justify-around gap-4',
          reverse && 'animate-marquee-reverse',
          pauseOnHover && 'group-hover:[animation-play-state:paused]'
        )}
      >
        {children}
      </div>
      <div
        aria-hidden="true"
        className={cn(
          'animate-marquee flex min-w-full shrink-0 items-center justify-around gap-4',
          reverse && 'animate-marquee-reverse',
          pauseOnHover && 'group-hover:[animation-play-state:paused]'
        )}
      >
        {children}
      </div>
    </div>
  )
}
