import * as React from "react"
import { cn } from "@/lib/utils"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

interface ToggleButtonOption {
  value: string
  label: string
  icon?: React.ReactNode
  description?: string
}

interface ToggleButtonGroupProps {
  value?: string
  onValueChange: (value: string) => void
  options: ToggleButtonOption[]
  type?: "single" | "multiple"
  disabled?: boolean
  className?: string
  size?: "default" | "sm" | "lg"
}

export function ToggleButtonGroup({
  value,
  onValueChange,
  options,
  type = "single",
  disabled = false,
  className,
  size = "default",
}: ToggleButtonGroupProps) {
  const handleValueChange = (newValue: string | string[]) => {
    if (type === "single" && typeof newValue === "string") {
      onValueChange(newValue)
    } else if (type === "single" && Array.isArray(newValue) && newValue.length > 0) {
      onValueChange(newValue[0])
    }
  }

  if (type === "single") {
    return (
      <ToggleGroup
        type="single"
        value={value}
        onValueChange={(newValue) => newValue && onValueChange(newValue)}
        className={cn("grid grid-cols-1 gap-2", className)}
        disabled={disabled}
      >
        {options.map((option) => (
          <ToggleGroupItem
            key={option.value}
            value={option.value}
            className={cn(
              "flex items-center justify-start gap-3 p-3 h-auto",
              "border border-border rounded-lg",
              "data-[state=on]:border-primary data-[state=on]:bg-primary/10",
              "hover:bg-muted/50 transition-colors",
              size === "sm" && "p-2",
              size === "lg" && "p-4"
            )}
          >
            {option.icon && (
              <div className="flex-shrink-0">
                {option.icon}
              </div>
            )}
            <div className="flex-1 text-left">
              <div className="font-medium text-sm">
                {option.label}
              </div>
              {option.description && (
                <div className="text-xs text-muted-foreground mt-1">
                  {option.description}
                </div>
              )}
            </div>
          </ToggleGroupItem>
        ))}
      </ToggleGroup>
    )
  }

  // Multiple type support if needed in the future
  return (
    <ToggleGroup
      type="multiple"
      value={Array.isArray(value) ? value : []}
      onValueChange={(newValue) => onValueChange(newValue.join(','))}
      className={cn("grid grid-cols-1 gap-2", className)}
      disabled={disabled}
    >
      {options.map((option) => (
        <ToggleGroupItem
          key={option.value}
          value={option.value}
          className={cn(
            "flex items-center justify-start gap-3 p-3 h-auto",
            "border border-border rounded-lg",
            "data-[state=on]:border-primary data-[state=on]:bg-primary/10",
            "hover:bg-muted/50 transition-colors",
            size === "sm" && "p-2",
            size === "lg" && "p-4"
          )}
        >
          {option.icon && (
            <div className="flex-shrink-0">
              {option.icon}
            </div>
          )}
          <div className="flex-1 text-left">
            <div className="font-medium text-sm">
              {option.label}
            </div>
            {option.description && (
              <div className="text-xs text-muted-foreground mt-1">
                {option.description}
              </div>
            )}
          </div>
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}