import { cn } from "@/lib/utils";

type Width = "prose" | "standard" | "wide";

const widths: Record<Width, string> = {
  prose: "max-w-2xl",
  standard: "max-w-3xl",
  wide: "max-w-5xl",
};

export function Container({
  children,
  width = "standard",
  className,
}: {
  children: React.ReactNode;
  width?: Width;
  className?: string;
}) {
  return (
    <div className={cn("mx-auto px-6 sm:px-8", widths[width], className)}>
      {children}
    </div>
  );
}
