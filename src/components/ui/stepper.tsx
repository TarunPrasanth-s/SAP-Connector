import * as React from "react"
import { Check } from "lucide-react"

import { cn } from "@/lib/utils"

export interface StepperProps extends React.HTMLAttributes<HTMLDivElement> {
  activeStep: number
  steps: { title: string; description?: string }[]
}

export function Stepper({ activeStep, steps, className, ...props }: StepperProps) {
  return (
    <div className={cn("flex flex-row items-center justify-between w-full mb-8", className)} {...props}>
      {steps.map((step, index) => {
        const isActive = index === activeStep
        const isCompleted = index < activeStep

        return (
          <div key={step.title} className="flex-1 flex flex-col items-center relative gap-2">
            <div
              className={cn(
                "flex h-10 w-10 items-center justify-center rounded-full border-2 transition-colors duration-300 z-10 bg-background",
                isActive ? "border-primary text-primary" : "",
                isCompleted ? "border-primary bg-primary text-primary-foreground" : "",
                !isActive && !isCompleted ? "border-muted-foreground/30 text-muted-foreground" : ""
              )}
            >
              {isCompleted ? <Check className="h-5 w-5" /> : <span>{index + 1}</span>}
            </div>
            
            <div className="flex flex-col items-center text-center">
              <span className={cn("text-sm font-semibold", isActive || isCompleted ? "text-foreground" : "text-muted-foreground")}>
                {step.title}
              </span>
              {step.description && (
                <span className="text-xs text-muted-foreground hidden sm:block max-w-[120px] leading-tight mt-1">
                  {step.description}
                </span>
              )}
            </div>

            {index < steps.length - 1 && (
              <div
                className={cn(
                  "absolute top-5 left-1/2 w-full h-[2px] -z-10 transition-colors duration-300",
                  isCompleted ? "bg-primary" : "bg-muted-foreground/20"
                )}
              />
            )}
          </div>
        )
      })}
    </div>
  )
}
