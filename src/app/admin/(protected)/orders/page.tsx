import Link from "next/link";
import { db } from "@/lib/db";
import { formatInr, formatUpdatedAt } from "@/lib/utils";

export const dynamic = "force-dynamic";

const statusColors: Record<string, string> = {
  PENDING: "bg-amber-100 text-amber-800",
  PAID: "bg-green-100 text-green-800",
  FAILED: "bg-red-100 text-red-800",
  SHIPPED: "bg-blue-100 text-blue-800",
  DELIVERED: "bg-emerald-100 text-emerald-800",
  CANCELLED: "bg-charcoal/10 text-charcoal/60",
};

export default async function AdminOrdersPage() {
  const orders = await db.order.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-charcoal">Orders</h1>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-charcoal/10 bg-white">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-charcoal/10 text-xs uppercase tracking-wide text-charcoal/50">
            <tr>
              <th className="px-4 py-3">Order</th>
              <th className="px-4 py-3">Customer</th>
              <th className="px-4 py-3">Total</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Placed</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-charcoal/10">
            {orders.map((order) => (
              <tr key={order.id}>
                <td className="px-4 py-3">
                  <Link href={`/admin/orders/${order.id}/`} className="font-medium text-charcoal hover:text-brand-black">
                    {order.orderNumber}
                  </Link>
                </td>
                <td className="px-4 py-3 text-charcoal/70">{order.customerName}</td>
                <td className="px-4 py-3 text-charcoal/70">{formatInr(order.total)}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusColors[order.status]}`}>{order.status}</span>
                </td>
                <td className="px-4 py-3 text-charcoal/50">{formatUpdatedAt(order.createdAt.toISOString())}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {orders.length === 0 && <p className="p-6 text-center text-sm text-charcoal/60">No orders yet.</p>}
      </div>
    </div>
  );
}
