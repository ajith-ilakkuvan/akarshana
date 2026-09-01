"use client";

import { useTransition } from "react";
import { updateOrderStatus } from "@/lib/actions/adminOrders";
import type { OrderStatus } from "@prisma/client";

const statuses: OrderStatus[] = ["PENDING", "PAID", "FAILED", "SHIPPED", "DELIVERED", "CANCELLED"];

export function OrderStatusSelect({ orderId, status }: { orderId: string; status: OrderStatus }) {
  const [isPending, startTransition] = useTransition();

  return (
    <select
      defaultValue={status}
      disabled={isPending}
      onChange={(event) => startTransition(() => updateOrderStatus(orderId, event.target.value as OrderStatus))}
      className="input w-auto"
    >
      {statuses.map((option) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
