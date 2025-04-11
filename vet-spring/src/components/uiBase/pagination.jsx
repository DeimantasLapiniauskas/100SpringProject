import * as React from "react"
import { cn } from "../../lib/utils"; 

const Pagination = ({ className, ...props }) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("flex items-center justify-between", className)}
    {...props}
  />
)
Pagination.displayName = "Pagination"

const PaginationContent = ({ className, ...props }) => (
  <ul className={cn("flex items-center gap-1", className)} {...props} />
)
PaginationContent.displayName = "PaginationContent"

const PaginationItem = ({ className, ...props }) => (
  <li className={cn("text-sm", className)} {...props} />
)
PaginationItem.displayName = "PaginationItem"

const PaginationLink = React.forwardRef(({ className, isActive, ...props }, ref) => (
  <a
    ref={ref}
    aria-current={isActive ? "page" : undefined}
    className={cn(
      " items-center justify-center rounded-md border border-input bg-background  font-medium hover:text-accent-foreground",
      isActive && "bg-accent text-accent-foreground",
      className
    )}
    {...props}
  />
))
PaginationLink.displayName = "PaginationLink"

const PaginationPrevious = React.forwardRef(({ className, ...props }, ref) => (
  <a
    ref={ref}
    className={cn(
      "flex  items-center justify-center rounded-md border border-input  ",
      className
    )}
    {...props}
  />
))
PaginationPrevious.displayName = "PaginationPrevious"

const PaginationNext = React.forwardRef(({ className, ...props }, ref) => (
  <a
    ref={ref}
    className={cn(
      "flex  items-center justify-center rounded-md border border-input",
      className
    )}
    {...props}
  />
))
PaginationNext.displayName = "PaginationNext"
const PaginationEllipsis = ({ className, ...props }) => (
  <span style={{padding: 0}}
    className={cn("flex  items-center justify-between", className )}
    {...props}
  >
    . . .
  </span>
)
PaginationEllipsis.displayName = "PaginationEllipsis"

export {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis
}
