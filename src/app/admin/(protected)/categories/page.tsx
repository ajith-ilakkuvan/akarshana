import Link from "next/link";
import { db } from "@/lib/db";
import { DeleteCategoryButton } from "@/components/admin/DeleteCategoryButton";

export const dynamic = "force-dynamic";

export default async function AdminCategoriesPage() {
  const categories = await db.category.findMany({
    orderBy: { sortOrder: "asc" },
    include: { _count: { select: { products: true } } },
  });

  return (
    <div>
      <div className="flex items-center justify-between">
        <h1 className="font-display text-2xl font-semibold text-charcoal">Categories</h1>
        <Link href="/admin/categories/new/" className="rounded-full bg-brand-black px-4 py-2 text-sm font-semibold text-white hover:bg-brand-black-deep">
          Add Category
        </Link>
      </div>

      <div className="mt-6 overflow-hidden rounded-2xl border border-charcoal/10 bg-white">
        <table className="w-full text-left text-sm">
          <thead className="border-b border-charcoal/10 text-xs uppercase tracking-wide text-charcoal/50">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Slug</th>
              <th className="px-4 py-3">Products</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody className="divide-y divide-charcoal/10">
            {categories.map((category) => (
              <tr key={category.id}>
                <td className="px-4 py-3 font-medium text-charcoal">{category.name}</td>
                <td className="px-4 py-3 text-charcoal/60">/{category.slug}/</td>
                <td className="px-4 py-3 text-charcoal/60">{category._count.products}</td>
                <td className="px-4 py-3 text-right">
                  <div className="flex items-center justify-end gap-3">
                    <Link href={`/admin/categories/${category.id}/`} className="text-sm font-medium text-charcoal hover:text-brand-black">
                      Edit
                    </Link>
                    <DeleteCategoryButton categoryId={category.id} categoryName={category.name} hasProducts={category._count.products > 0} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {categories.length === 0 && <p className="p-6 text-center text-sm text-charcoal/60">No categories yet.</p>}
      </div>
    </div>
  );
}
