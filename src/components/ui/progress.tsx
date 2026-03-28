"use client"

import * as React from "react"
import { Progress as ProgressPrimitive } from "radix-ui"

import { cn } from "@/lib/utils"

const ProgressContext = React.createContext<number>(0)

function Progress({
  className,
  value,
  children,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) {
  return (
    <ProgressContext.Provider value={value ?? 0}>
      <div className="w-full">
        {children && (
          <div className="flex justify-between text-xs text-muted-foreground mb-1">
            {children}
          </div>
        )}
        <ProgressPrimitive.Root
          data-slot="progress"
          className={cn(
            "relative flex h-1.5 w-full items-center overflow-x-hidden rounded-full bg-muted",
            className
          )}
          value={value}
          {...props}
        >
          <ProgressPrimitive.Indicator
            data-slot="progress-indicator"
            className="size-full flex-1 bg-primary transition-all"
            style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
          />
        </ProgressPrimitive.Root>
      </div>
    </ProgressContext.Provider>
  )
}

function ProgressLabel({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return <span data-slot="progress-label" className={cn(className)} {...props} />
}

function ProgressValue({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  const value = React.useContext(ProgressContext)
  return (
    <span data-slot="progress-value" className={cn(className)} {...props}>
      {Math.round(value)}%
    </span>
  )
}

export { Progress, ProgressLabel, ProgressValue }
