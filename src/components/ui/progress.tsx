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
          <div className="mb-1 flex justify-between text-sm">
            {children}
          </div>
        )}
        <ProgressPrimitive.Root
          data-slot="progress"
          className={cn(
            "relative flex h-1 w-full items-center overflow-x-hidden rounded-full bg-muted",
            className
          )}
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
  return (
    <span
      data-slot="progress-label"
      className={cn("text-foreground", className)}
      {...props}
    />
  )
}

function ProgressValue({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  const value = React.useContext(ProgressContext)
  return (
    <span
      data-slot="progress-value"
      className={cn("text-muted-foreground", className)}
      {...props}
    >
      {Math.round(value)}%
    </span>
  )
}

export { Progress, ProgressLabel, ProgressValue }
