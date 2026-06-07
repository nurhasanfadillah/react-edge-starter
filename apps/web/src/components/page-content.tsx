import { cn } from "@repo/ui/src/lib/utils"

export function PageContent({
  className,
  children,
}: React.ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "flex flex-1 flex-col space-y-6 px-4 py-4 md:py-6 lg:px-6",
        className
      )}
    >
      {children}
    </div>
  )
}
