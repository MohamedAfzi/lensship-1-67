import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

interface SelectableCardProps {
  id: string
  value: string
  selectedValue?: string
  onSelect: (value: string) => void
  title: string
  description?: string
  icon?: React.ReactNode
  actionButton?: {
    label: string
    onClick: (e: React.MouseEvent) => void
    variant?: "default" | "secondary" | "destructive" | "outline" | "ghost" | "link"
    className?: string
  }
  disabled?: boolean
  className?: string
  children?: React.ReactNode
}

export function SelectableCard({
  id,
  value,
  selectedValue,
  onSelect,
  title,
  description,
  icon,
  actionButton,
  disabled = false,
  className,
  children,
}: SelectableCardProps) {
  const isSelected = selectedValue === value

  const handleCardClick = () => {
    if (!disabled) {
      onSelect(value)
    }
  }

  const handleActionClick = (e: React.MouseEvent) => {
    e.stopPropagation()
    if (actionButton?.onClick) {
      actionButton.onClick(e)
    }
  }

  return (
    <Card
      className={cn(
        "cursor-pointer transition-all duration-200 hover:shadow-md",
        "border-2",
        isSelected
          ? "border-primary bg-primary/5 shadow-md"
          : "border-border hover:border-primary/50",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      onClick={handleCardClick}
    >
      <CardContent className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 flex-1">
            {icon && (
              <div className={cn(
                "flex-shrink-0",
                isSelected ? "text-primary" : "text-muted-foreground"
              )}>
                {icon}
              </div>
            )}
            <div className="flex-1">
              <h3 className={cn(
                "font-medium text-sm",
                isSelected ? "text-primary" : "text-foreground"
              )}>
                {title}
              </h3>
              {description && (
                <p className="text-xs text-muted-foreground mt-1">
                  {description}
                </p>
              )}
            </div>
          </div>
          
          {actionButton && (
            <Button
              size="sm"
              variant={actionButton.variant || "default"}
              className={cn("ml-3", actionButton.className)}
              onClick={handleActionClick}
              disabled={disabled}
            >
              {actionButton.label}
            </Button>
          )}
        </div>
        
        {children && (
          <div className="mt-3">
            {children}
          </div>
        )}
      </CardContent>
    </Card>
  )
}