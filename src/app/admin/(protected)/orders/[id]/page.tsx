import { notFound } from "next/navigation";
import { db } from "@/lib/db";
import { formatInr, formatUpdatedAt } from "@/lib/utils";
import { OrderStatusSelect } from "@/components/admin/OrderStatusSelect";

export default async function AdminOrderDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const order = await db.order.findUnique({ where: { id }, include: { items: true } });
  if (!order) notFound();

  return (
    <div className="max-w-2xl">
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-charcoal">{order.orderNumber}</h1>
        <OrderStatusSelect orderId={order.id} status={order.status} />
      </div>
      <p className="mt-1 text-sm text-charcoal/50">Placed {formatUpdatedAt(order.createdAt.toISOString())}</p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <div className="rounded-2xl border border-charcoal/10 bg-white p-5">
          <h2 className="font-display text-base font-semibold text-charcoal">Customer</h2>
          <p className="mt-2 text-sm text-charcoal/70">{order.customerName}</p>
          <p className="text-sm text-charcoal/70">{order.email}</p>
          <p className="text-sm text-charcoal/70">{order.phone}</p>
        </div>
        <div className="rounded-2xl border border-charcoal/10 bg-white p-5">
          <h2 className="font-display text-base font-semibold text-charcoal">Shipping Address</h2>
          <p className="mt-2 text-sm text-charcoal/70">
            {order.addressLine1}
            {order.addressLine2 ? `, ${order.addressLine2}` : ""}
            <br />
            {order.city}, {order.state} {order.pincode}
          </p>
        </div>
      </div>

      <div className="mt-6 rounded-2xl border border-charcoal/10 bg-white p-5">
        <h2 className="font-display text-base font-semibold text-charcoal">Items</h2>
        <ul className="mt-3 divide-y divide-charcoal/10">
          {order.items.map((item) => (
            <li key={item.id} className="flex justify-between py-2 text-sm text-charcoal/70">
              <span>
                {item.productName} × {item.quantity}
              </span>
              <span>{formatInr(item.price * item.quantity)}</span>
            </li>
          ))}
        </ul>
        <dl className="mt-3 space-y-1 border-t border-charcoal/10 pt-3 text-sm text-charcoal/70">
          <div className="flex justify-between">
            <dt>Subtotal</dt>
            <dd>{formatInr(order.subtotal)}</dd>
          </div>
          <div className="flex justify-between">
            <dt>Shipping</dt>
            <dd>{order.shipping === 0 ? "Free" : formatInr(order.shipping)}</dd>
          </div>
          <div className="flex justify-between font-semibold text-charcoal">
            <dt>Total</dt>
            <dd>{formatInr(order.total)}</dd>
          </div>
        </dl>
      </div>

      {order.razorpayPaymentId && (
        <p className="mt-4 text-xs text-charcoal/40">Razorpay payment ID: {order.razorpayPaymentId}</p>
      )}
    </div>
  );
}
