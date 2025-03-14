
import React from "react";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface RequiredLabelProps extends React.ComponentPropsWithoutRef<typeof Label> {
  required?: boolean;
}

export const RequiredLabel = React.forwardRef<
  React.ElementRef<typeof Label>,
  RequiredLabelProps
>(({ className, children, required, ...props }, ref) => (
  <Label
    ref={ref}
    className={cn("flex items-center", className)}
    {...props}
  >
    {children}
    {required && <span className="text-red-500 ml-1 font-bold">*</span>}
  </Label>
));
RequiredLabel.displayName = "RequiredLabel";
