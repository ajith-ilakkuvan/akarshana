import { z } from "zod";

export const productSchema = z.object({
  name: z.string().trim().min(2).max(150),
  slug: z
    .string()
    .trim()
    .min(2)
    .max(150)
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers and hyphens only"),
  description: z.string().trim().min(10).max(4000),
  price: z.number().int().min(0),
  compareAtPrice: z.number().int().min(0).nullable().optional(),
  metal: z.string().trim().min(2).max(60),
  purity: z.string().trim().max(30).optional().or(z.literal("")),
  weightGrams: z.number().min(0).nullable().optional(),
  gemstone: z.string().trim().max(100).optional().or(z.literal("")),
  sku: z.string().trim().min(2).max(60),
  stock: z.number().int().min(0),
  featured: z.boolean().optional(),
  isActive: z.boolean().optional(),
  categoryId: z.string().min(1, "Choose a category"),
  images: z.array(z.object({ url: z.string().min(1), alt: z.string().optional() })).default([]),
});

export const categorySchema = z.object({
  name: z.string().trim().min(2).max(100),
  slug: z
    .string()
    .trim()
    .min(2)
    .max(100)
    .regex(/^[a-z0-9-]+$/, "Slug must be lowercase letters, numbers and hyphens only"),
  description: z.string().trim().max(1000).optional().or(z.literal("")),
  image: z.string().optional().or(z.literal("")),
  sortOrder: z.number().int().optional(),
});

export type ProductInput = z.infer<typeof productSchema>;
export type CategoryInput = z.infer<typeof categorySchema>;
