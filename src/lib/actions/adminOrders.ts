"use server";

import { revalidatePath } from "next/cache";
import { db, } from "@/lib/db";
import { getAdminSession } from "@/lib/adminAuth";
import type { OrderStatus } from "@prisma/client";

export async function updateOrderStatus(orderId: string, status: OrderStatus): Promise<void> {
  const session = await getAdminSession();
  if (!session) throw new Error("Not authorized.");

  await db.order.update({ where: { id: orderId }, data: { status } });
  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${orderId}`);
}
