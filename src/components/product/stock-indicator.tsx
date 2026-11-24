import { cn } from "@/lib/cn";
import { getStockState, type StockStatus } from "@/lib/stock";

const dot: Record<StockStatus, string> = {
  in_stock: "bg-success",
  low_stock: "bg-danger",
  sold_out: "bg-subtle",
};

const text: Record<StockStatus, string> = {
  in_stock: "text-ink",
  low_stock: "text-danger",
  sold_out: "text-muted",
};

export function StockIndicator({ quantity, className }: { quantity: number; className?: string }) {
  const { status, label } = getStockState(quantity);
  return (
    <p className={cn("flex items-center gap-2 text-body-sm", text[status], className)}>
      <span aria-hidden className={cn("size-1.5 rounded-full", dot[status])} />
      {label}
    </p>
  );
}
