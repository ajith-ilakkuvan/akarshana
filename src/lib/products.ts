import "server-only";
import { db } from "@/lib/db";
import type { Prisma } from "@prisma/client";

const productWithRelations = {
  include: { images: { orderBy: { sortOrder: "asc" as const } }, category: true },
};

export type ProductWithRelations = Prisma.ProductGetPayload<typeof productWithRelations>;

export interface ShopFilters {
  category?: string;
  metal?: string;
  sort?: "newest" | "price-asc" | "price-desc" | "featured";
  minPrice?: number;
  maxPrice?: number;
}

export async function getShopProducts(filters: ShopFilters = {}): Promise<ProductWithRelations[]> {
  const where: Prisma.ProductWhereInput = { isActive: true };

  if (filters.category) where.category = { slug: filters.category };
  if (filters.metal) where.metal = filters.metal;
  if (filters.minPrice != null || filters.maxPrice != null) {
    where.price = {
      ...(filters.minPrice != null ? { gte: filters.minPrice } : {}),
      ...(filters.maxPrice != null ? { lte: filters.maxPrice } : {}),
    };
  }

  const orderBy: Prisma.ProductOrderByWithRelationInput =
    filters.sort === "price-asc"
      ? { price: "asc" }
      : filters.sort === "price-desc"
        ? { price: "desc" }
        : filters.sort === "featured"
          ? { featured: "desc" }
          : { createdAt: "desc" };

  return db.product.findMany({ where, orderBy, ...productWithRelations });
}

export async function getProductBySlug(slug: string): Promise<ProductWithRelations | null> {
  return db.product.findFirst({ where: { slug, isActive: true }, ...productWithRelations });
}

export async function getFeaturedProducts(limit = 8): Promise<ProductWithRelations[]> {
  return db.product.findMany({
    where: { isActive: true, featured: true },
    orderBy: { createdAt: "desc" },
    take: limit,
    ...productWithRelations,
  });
}

export async function getRelatedProducts(categoryId: string, excludeId: string, limit = 4): Promise<ProductWithRelations[]> {
  return db.product.findMany({
    where: { isActive: true, categoryId, id: { not: excludeId } },
    take: limit,
    ...productWithRelations,
  });
}

export async function getAllCategories() {
  return db.category.findMany({ orderBy: { sortOrder: "asc" }, include: { _count: { select: { products: true } } } });
}

export async function getCategoryBySlug(slug: string) {
  return db.category.findUnique({ where: { slug } });
}

export async function getDistinctMetals(): Promise<string[]> {
  const rows = await db.product.findMany({ where: { isActive: true }, select: { metal: true }, distinct: ["metal"] });
  return rows.map((row) => row.metal);
}
