import * as React from "react"
import { cn } from "@/lib/utils"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

interface InteractiveAlertProps {
  title: string
  description: string
  icon?: React.ReactNode
  actionButton?: {
    label: string
    onClick: () => void
    variant?: "default" | "secondary" | "destructive" | "outline" | "ghost" | "link"
  }
  variant?: "default" | "destructive" | "warning" | "success"
  className?: string
}

export function InteractiveAlert({
  title,
  description,
  icon,
  actionButton,
  variant = "default",
  className,
}: InteractiveAlertProps) {
  const variantStyles = {
    default: "border-border",
    destructive: "border-destructive/50 bg-destructive/10 text-destructive-foreground",
    warning: "border-yellow-500/50 bg-yellow-500/10 text-yellow-foreground",
    success: "border-green-500/50 bg-green-500/10 text-green-foreground",
  }

  const iconStyles = {
    default: "text-muted-foreground",
    destructive: "text-destructive",
    warning: "text-yellow-500",
    success: "text-green-500",
  }

  return (
    <Alert className={cn(variantStyles[variant], className)}>
      <div className="flex items-start gap-3">
        {icon && (
          <div className={cn("flex-shrink-0 mt-0.5", iconStyles[variant])}>
            {icon}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h4 className="font-semibold text-sm mb-1">{title}</h4>
          <AlertDescription className="text-sm">
            {description}
          </AlertDescription>
        </div>
        {actionButton && (
          <Button
            size="sm"
            variant={actionButton.variant || "default"}
            onClick={actionButton.onClick}
            className="flex-shrink-0"
          >
            {actionButton.label}
          </Button>
        )}
      </div>
    </Alert>
  )
}