export type StockStatus = "in_stock" | "low_stock" | "sold_out";

export const LOW_STOCK_THRESHOLD = 3;

export function getStockState(quantity: number): { status: StockStatus; label: string } {
  if (quantity <= 0) return { status: "sold_out", label: "Sold out" };
  if (quantity <= LOW_STOCK_THRESHOLD) {
    return { status: "low_stock", label: `Only ${quantity} left` };
  }
  return { status: "in_stock", label: "In stock" };
}
