import Link from "next/link";
import Image from "next/image";
import { Plus } from "lucide-react";
import { db } from "@/lib/db";
import { formatInr } from "@/lib/utils";
import { DeleteProductButton } from "@/components/admin/DeleteProductButton";

export const dynamic = "force-dynamic";

export default async function AdminProductsPage() {
  const products = await db.product.findMany({
    orderBy: { createdAt: "desc" },
    include: { category: true, images: { take: 1, orderBy: { sortOrder: "asc" } } },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-charcoal">Products</h1>
        <Link
          href="/admin/products/new/"
          className="inline-flex items-center gap-2 rounded-full bg-brand-black px-4 py-2 text-sm font-semibold text-white hover:bg-brand-black-deep"
        >
          <Plus aria-hidden="true" className="size-4" />
          Add Product
        </Link>
      </div>

      <div className="mt-6 overflow-x-auto rounded-2xl border border-charcoal/10 bg-white">
        <table className="w-full min-w-[720px] text-left text-sm">
          <thead className="border-b border-charcoal/10 text-xs uppercase tracking-wide text-charcoal/50">
            <tr>
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Category</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-charcoal/10">
            {products.map((product) => (
              <tr key={product.id}>
                <td className="flex items-center gap-3 px-4 py-3">
                  <div className="relative size-10 shrink-0 overflow-hidden rounded-lg bg-cream">
                    {product.images[0] && (
                      <Image src={product.images[0].url} alt="" fill sizes="40px" className="object-cover" />
                    )}
                  </div>
                  <span className="font-medium text-charcoal">{product.name}</span>
                </td>
                <td className="px-4 py-3 text-charcoal/70">{product.category.name}</td>
                <td className="px-4 py-3 text-charcoal/70">{formatInr(product.price)}</td>
                <td className="px-4 py-3 text-charcoal/70">{product.stock}</td>
                <td className="px-4 py-3">
                  <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${product.isActive ? "bg-green-100 text-green-800" : "bg-charcoal/10 text-charcoal/60"}`}>
                    {product.isActive ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <Link href={`/admin/products/${product.id}/`} className="text-sm font-medium text-charcoal hover:text-brand-black">
                      Edit
                    </Link>
                    <DeleteProductButton productId={product.id} productName={product.name} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {products.length === 0 && <p className="p-6 text-center text-sm text-charcoal/60">No products yet.</p>}
      </div>
    </div>
  );
}
