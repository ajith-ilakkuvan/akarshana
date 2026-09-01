import Link from "next/link";
import { db } from "@/lib/db";
import { formatInr } from "@/lib/utils";

export default async function AdminDashboardPage() {
  const [productCount, categoryCount, orderCount, paidOrders, recentOrders] = await Promise.all([
    db.product.count(),
    db.category.count(),
    db.order.count(),
    db.order.findMany({ where: { status: "PAID" }, select: { total: true } }),
    db.order.findMany({ orderBy: { createdAt: "desc" }, take: 5 }),
  ]);

  const revenue = paidOrders.reduce((sum, order) => sum + order.total, 0);

  const stats = [
    { label: "Products", value: productCount, href: "/admin/products/" },
    { label: "Categories", value: categoryCount, href: "/admin/categories/" },
    { label: "Orders", value: orderCount, href: "/admin/orders/" },
    { label: "Revenue (Paid)", value: formatInr(revenue), href: "/admin/orders/" },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl font-semibold text-charcoal">Dashboard</h1>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Link key={stat.label} href={stat.href} className="rounded-2xl border border-charcoal/10 bg-white p-5 hover:border-brand-black">
            <p className="text-xs font-semibold uppercase tracking-wide text-charcoal/50">{stat.label}</p>
            <p className="mt-2 font-display text-2xl font-semibold text-charcoal">{stat.value}</p>
          </Link>
        ))}
      </div>

      <div className="mt-8 rounded-2xl border border-charcoal/10 bg-white p-5">
        <h2 className="font-display text-lg font-semibold text-charcoal">Recent Orders</h2>
        {recentOrders.length === 0 ? (
          <p className="mt-3 text-sm text-charcoal/60">No orders yet.</p>
        ) : (
          <ul className="mt-4 divide-y divide-charcoal/10">
            {recentOrders.map((order) => (
              <li key={order.id} className="flex items-center justify-between py-3 text-sm">
                <Link href={`/admin/orders/${order.id}/`} className="font-medium text-charcoal hover:text-brand-black">
                  {order.orderNumber}
                </Link>
                <span className="text-charcoal/60">{order.customerName}</span>
                <span className="font-semibold text-charcoal">{formatInr(order.total)}</span>
                <StatusBadge status={order.status} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: string }) {
  const colors: Record<string, string> = {
    PENDING: "bg-amber-100 text-amber-800",
    PAID: "bg-green-100 text-green-800",
    FAILED: "bg-red-100 text-red-800",
    SHIPPED: "bg-blue-100 text-blue-800",
    DELIVERED: "bg-emerald-100 text-emerald-800",
    CANCELLED: "bg-charcoal/10 text-charcoal/60",
  };
  return <span className={`rounded-full px-3 py-1 text-xs font-semibold ${colors[status] ?? ""}`}>{status}</span>;
}
