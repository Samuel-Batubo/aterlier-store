"use client";

import { useState } from "react";
import { Button } from "@/components/ui";

/** UI only: the cart is not built yet, so adding shows a placeholder notice. */
export function AddToBag({ soldOut }: { soldOut: boolean }) {
  const [notice, setNotice] = useState(false);

  if (soldOut) {
    return (
      <Button disabled className="w-full">
        Sold Out
      </Button>
    );
  }

  return (
    <div className="flex flex-col">
      <Button className="w-full" onClick={() => setNotice(true)}>
        Add to Bag
      </Button>
      {/* Live region stays mounted so the notice is announced; it takes no space while empty. */}
      <p role="status" className="mt-3 text-body-sm text-muted empty:mt-0">
        {notice && "The shopping bag isn’t connected yet. This button is a placeholder."}
      </p>
    </div>
  );
}
