/**
 * Seeds realistic placeholder categories/products so the storefront and
 * admin panel aren't empty on first run. Prices, weights and descriptions
 * are illustrative — swap them (and the placeholder photos) for the
 * client's real catalog via /admin once it's ready. Run with `npm run db:seed`.
 */
import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

interface SeedProduct {
  name: string;
  slug: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  metal: string;
  purity?: string;
  weightGrams?: number;
  gemstone?: string;
  sku: string;
  stock: number;
  featured?: boolean;
  image: string;
}

interface SeedCategory {
  name: string;
  slug: string;
  description: string;
  image: string;
  products: SeedProduct[];
}

const categories: SeedCategory[] = [
  {
    name: "Necklaces",
    slug: "necklaces",
    description: "Statement necklaces and haarams handcrafted in gold, from everyday elegance to bridal grandeur.",
    image: "/products/placeholder-necklaces.svg",
    products: [
      {
        name: "Kanchi Kamakshi Temple Necklace",
        slug: "kanchi-kamakshi-temple-necklace",
        description:
          "A handcrafted temple-style necklace in 22K gold, featuring traditional deity motifs and a ruby-studded pendant — a timeless choice for weddings and festive occasions.",
        price: 185000,
        compareAtPrice: 198000,
        metal: "Gold",
        purity: "22K",
        weightGrams: 42.5,
        gemstone: "Ruby, Kundan",
        sku: "PJ-NK-001",
        stock: 4,
        featured: true,
        image: "/products/placeholder-necklaces.svg",
      },
      {
        name: "The Royal Nagas Necklace",
        slug: "the-royal-nagas-necklace",
        description:
          "An eternal narration of heritage — a temple-antique necklace densely worked with naga and peacock motifs in gold, set with ruby and emerald accents. From Prashwa Jewels' Royal Nagas collection.",
        price: 265000,
        metal: "Gold",
        purity: "22K",
        weightGrams: 62,
        gemstone: "Ruby, Emerald",
        sku: "PJ-NK-002",
        stock: 2,
        featured: true,
        image: "/products/placeholder-necklaces.svg",
      },
      {
        name: "Rose Gold Layered Pendant Chain",
        slug: "rose-gold-layered-pendant-chain",
        description: "A delicate, everyday-wear layered chain in 18K rose gold with a petite diamond pendant.",
        price: 62000,
        metal: "Gold",
        purity: "18K",
        weightGrams: 9.2,
        gemstone: "Diamond",
        sku: "PJ-NK-003",
        stock: 10,
        image: "/products/placeholder-necklaces.svg",
      },
    ],
  },
  {
    name: "Earrings",
    slug: "earrings",
    description: "From subtle studs to elaborate jhumkas — earrings for every occasion.",
    image: "/products/placeholder-earrings.svg",
    products: [
      {
        name: "Kundan Polki Jhumka",
        slug: "kundan-polki-jhumka",
        description: "Statement jhumkas in Kundan-Polki work with a pearl drop finish, perfect for bridal wear.",
        price: 78000,
        metal: "Gold",
        purity: "22K",
        weightGrams: 16,
        gemstone: "Kundan, Pearl",
        sku: "PJ-ER-001",
        stock: 6,
        featured: true,
        image: "/products/placeholder-earrings.svg",
      },
      {
        name: "Viruvah Diamonds Emerald Drop Studs",
        slug: "viruvah-diamonds-emerald-drop-studs",
        description:
          "A pear-cut emerald halo in a diamond frame — from Viruvah Diamonds, Prashwa Jewels' fine diamond line.",
        price: 68000,
        metal: "Gold",
        purity: "18K",
        weightGrams: 3.4,
        gemstone: "Diamond, Emerald",
        sku: "PJ-ER-002",
        stock: 8,
        featured: true,
        image: "/products/placeholder-earrings.svg",
      },
      {
        name: "Viruvah Diamonds Floral Halo Studs",
        slug: "viruvah-diamonds-floral-halo-studs",
        description:
          "An open floral motif in rose gold, rimmed with a diamond halo — a reflection of modern elegance, from Viruvah Diamonds.",
        price: 39500,
        metal: "Gold",
        purity: "18K",
        weightGrams: 2.6,
        gemstone: "Diamond",
        sku: "PJ-ER-005",
        stock: 12,
        image: "/products/placeholder-earrings.svg",
      },
      {
        name: "Peacock Motif Chandbali",
        slug: "peacock-motif-chandbali",
        description: "Chandbali earrings with a hand-enamelled peacock motif and hanging pearl tassels.",
        price: 46500,
        metal: "Gold",
        purity: "22K",
        weightGrams: 11.5,
        gemstone: "Pearl, Enamel",
        sku: "PJ-ER-003",
        stock: 8,
        image: "/products/placeholder-earrings.svg",
      },
    ],
  },
  {
    name: "Bangles & Bracelets",
    slug: "bangles-bracelets",
    description: "Everyday bangles, stacking bracelets and ceremonial kada, in gold and diamond.",
    image: "/products/placeholder-bangles.svg",
    products: [
      {
        name: "Nakshi Work Gold Bangle Pair",
        slug: "nakshi-work-gold-bangle-pair",
        description: "A pair of broad bangles with intricate Nakshi engraving, sold as a set.",
        price: 168000,
        metal: "Gold",
        purity: "22K",
        weightGrams: 38,
        sku: "PJ-BN-001",
        stock: 3,
        featured: true,
        image: "/products/placeholder-bangles.svg",
      },
      {
        name: "Diamond Tennis Bracelet",
        slug: "diamond-tennis-bracelet",
        description: "A classic diamond tennis bracelet in 18K gold, a versatile everyday-luxury piece.",
        price: 95000,
        metal: "Gold",
        purity: "18K",
        weightGrams: 7.8,
        gemstone: "Diamond",
        sku: "PJ-BN-002",
        stock: 5,
        image: "/products/placeholder-bangles.svg",
      },
    ],
  },
  {
    name: "Rings",
    slug: "rings",
    description: "Engagement, daily-wear and statement rings in gold and diamond.",
    image: "/products/placeholder-rings.svg",
    products: [
      {
        name: "Solitaire Engagement Ring",
        slug: "solitaire-engagement-ring",
        description: "A timeless solitaire engagement ring in 18K white gold with a certified centre diamond.",
        price: 125000,
        metal: "Gold",
        purity: "18K",
        weightGrams: 4.2,
        gemstone: "Diamond",
        sku: "PJ-RG-001",
        stock: 6,
        featured: true,
        image: "/products/placeholder-rings.svg",
      },
      {
        name: "Antique Floral Gold Ring",
        slug: "antique-floral-gold-ring",
        description: "An antique-finish gold ring with a floral motif and a ruby centre stone.",
        price: 32500,
        metal: "Gold",
        purity: "22K",
        weightGrams: 6.5,
        gemstone: "Ruby",
        sku: "PJ-RG-002",
        stock: 9,
        image: "/products/placeholder-rings.svg",
      },
    ],
  },
  {
    name: "Bridal Collection",
    slug: "bridal-collection",
    description:
      "Being your happily ever after with exemplary jewellery for the bride — complete bridal sets designed as one ensemble.",
    image: "/products/placeholder-bridal.svg",
    products: [
      {
        name: "Grand Temple Bridal Set",
        slug: "grand-temple-bridal-set",
        description:
          "A complete bridal set — layered temple-style necklace, matching jhumkas, vanki and maang tikka — handcrafted in 22K gold with ruby and Kundan work.",
        price: 425000,
        compareAtPrice: 455000,
        metal: "Gold",
        purity: "22K",
        weightGrams: 96,
        gemstone: "Ruby, Kundan",
        sku: "PJ-BR-001",
        stock: 1,
        featured: true,
        image: "/products/placeholder-bridal.svg",
      },
    ],
  },
  {
    name: "Chains & Pendants",
    slug: "chains-pendants",
    description: "Gold chains and pendants for daily wear and gifting.",
    image: "/products/placeholder-chains.svg",
    products: [
      {
        name: "Classic Rope Chain",
        slug: "classic-rope-chain",
        description: "A durable, everyday 22K gold rope chain — a versatile foundation for any pendant.",
        price: 58000,
        metal: "Gold",
        purity: "22K",
        weightGrams: 14,
        sku: "PJ-CH-001",
        stock: 15,
        image: "/products/placeholder-chains.svg",
      },
      {
        name: "Om Pendant with Chain",
        slug: "om-pendant-with-chain",
        description: "A minimal Om pendant in 22K gold on a matching fine chain.",
        price: 24500,
        metal: "Gold",
        purity: "22K",
        weightGrams: 5.5,
        sku: "PJ-CH-002",
        stock: 20,
        image: "/products/placeholder-chains.svg",
      },
    ],
  },
];

/**
 * Slugs from earlier seed runs that were renamed/replaced above — removed
 * first so their old SKUs don't collide with the renamed products' SKUs.
 * Safe to delete: this is placeholder seed data, never real orders.
 */
const supersededSlugs = ["antique-lakshmi-haaram", "diamond-solitaire-studs"];

async function main() {
  await db.product.deleteMany({ where: { slug: { in: supersededSlugs } } });

  for (const [index, category] of categories.entries()) {
    const createdCategory = await db.category.upsert({
      where: { slug: category.slug },
      create: {
        name: category.name,
        slug: category.slug,
        description: category.description,
        image: category.image,
        sortOrder: index,
      },
      update: {
        name: category.name,
        description: category.description,
        image: category.image,
        sortOrder: index,
      },
    });

    for (const product of category.products) {
      await db.product.upsert({
        where: { slug: product.slug },
        create: {
          name: product.name,
          slug: product.slug,
          description: product.description,
          price: product.price,
          compareAtPrice: product.compareAtPrice,
          metal: product.metal,
          purity: product.purity,
          weightGrams: product.weightGrams,
          gemstone: product.gemstone,
          sku: product.sku,
          stock: product.stock,
          featured: product.featured ?? false,
          categoryId: createdCategory.id,
          images: { create: [{ url: product.image, alt: product.name, sortOrder: 0 }] },
        },
        update: {
          name: product.name,
          description: product.description,
          price: product.price,
          compareAtPrice: product.compareAtPrice,
          metal: product.metal,
          purity: product.purity,
          weightGrams: product.weightGrams,
          gemstone: product.gemstone,
          stock: product.stock,
          featured: product.featured ?? false,
          categoryId: createdCategory.id,
        },
      });
    }
  }

  console.log(`Seeded ${categories.length} categories and ${categories.reduce((n, c) => n + c.products.length, 0)} products.`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await db.$disconnect();
  });
