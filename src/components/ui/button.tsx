import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-xl text-sm font-semibold ring-offset-background transition-all duration-300 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 relative overflow-hidden",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-primary to-primary/90 text-primary-foreground hover:from-primary/90 hover:to-primary/80 shadow-lg hover:shadow-xl hover:shadow-primary/25 border-2 border-primary/20 hover:border-primary/40 transform hover:-translate-y-1 hover:scale-105",
        destructive:
          "bg-gradient-to-r from-destructive to-destructive/90 text-destructive-foreground hover:from-destructive/90 hover:to-destructive/80 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",
        outline:
          "border-2 border-primary text-primary bg-background/80 hover:bg-primary hover:text-primary-foreground shadow-lg hover:shadow-xl hover:shadow-primary/20 transform hover:-translate-y-0.5 hover:scale-105 backdrop-blur-sm",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80 shadow-md hover:shadow-lg transform hover:-translate-y-0.5",
        ghost: "hover:bg-accent/50 hover:text-accent-foreground hover:shadow-lg hover:scale-105 backdrop-blur-sm border border-transparent hover:border-accent/30",
        link: "text-primary underline-offset-4 hover:underline hover:scale-105",
        luxury: "bg-gradient-to-r from-primary via-primary to-primary/90 text-primary-foreground shadow-xl hover:shadow-2xl hover:shadow-primary/25 border-2 border-primary/20 hover:border-primary/40 transform hover:-translate-y-1 hover:scale-105 font-bold tracking-wide backdrop-blur-sm",
        "luxury-outline": "border-2 border-primary text-primary bg-background/80 hover:bg-primary hover:text-primary-foreground shadow-lg hover:shadow-xl hover:shadow-primary/20 transform hover:-translate-y-0.5 hover:scale-105 backdrop-blur-sm font-semibold",
        "luxury-ghost": "text-primary hover:bg-primary/15 hover:shadow-lg hover:shadow-primary/10 hover:scale-105 backdrop-blur-sm border border-transparent hover:border-primary/30",
      },
      size: {
        default: "h-11 px-6 py-3",
        sm: "h-9 rounded-lg px-4 text-sm",
        lg: "h-14 rounded-xl px-10 text-lg font-bold",
        xl: "h-16 rounded-2xl px-12 text-xl font-bold",
        icon: "h-11 w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
