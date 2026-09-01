import Link from "next/link";
import { LayoutDashboard, Package, FolderTree, ShoppingCart, FileText, LogOut, ExternalLink } from "lucide-react";
import { logoutAdmin } from "@/lib/actions/adminAuth";

const navItems = [
  { href: "/admin/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/products/", label: "Products", icon: Package },
  { href: "/admin/categories/", label: "Categories", icon: FolderTree },
  { href: "/admin/orders/", label: "Orders", icon: ShoppingCart },
  { href: "/admin/content/", label: "Site Content", icon: FileText },
];

export function AdminShell({ email, children }: { email: string; children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-cream-dark">
      <div className="flex flex-col lg:flex-row">
        <aside className="shrink-0 border-b border-charcoal/10 bg-brand-black-deep text-white lg:min-h-screen lg:w-64 lg:border-b-0 lg:border-r">
          <div className="p-6">
            <p className="font-display text-lg font-semibold text-brand-gold-light">Prashwa Jewels</p>
            <p className="text-xs text-white/50">Admin Panel</p>
          </div>
          <nav className="px-3 pb-6">
            <ul className="flex flex-row flex-wrap gap-1 lg:flex-col">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-white/80 hover:bg-white/10 hover:text-white"
                  >
                    <item.icon aria-hidden="true" className="size-4" />
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto space-y-2 border-t border-white/10 p-4">
            <p className="truncate text-xs text-white/50">{email}</p>
            <Link href="/" target="_blank" className="flex items-center gap-2 text-xs text-white/70 hover:text-brand-gold-light">
              <ExternalLink aria-hidden="true" className="size-3.5" />
              View Storefront
            </Link>
            <form action={logoutAdmin}>
              <button type="submit" className="flex items-center gap-2 text-xs text-white/70 hover:text-brand-gold-light">
                <LogOut aria-hidden="true" className="size-3.5" />
                Sign Out
              </button>
            </form>
          </div>
        </aside>

        <main id="main-content" className="flex-1 p-4 sm:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
