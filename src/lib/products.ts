// lib/products.ts

import { prisma } from "@/src/lib/prisma"

export async function productCount() {
  return await prisma.product.count()
}

export async function getProducts(page: number, pageSize: number) {
  const skip = (page - 1) * pageSize

  const products = await prisma.product.findMany({
    take: pageSize,
    skip,
    include: {
      category: true,
    },
  })

  return products
}
