// import { ProductSearchForm } from "@/components/products/ProductSearchForm"
// import { ProductsPagination } from "@/components/products/ProductsPagination"
// import { ProductsTable } from "@/components/products/ProductsTable"
// import { Heading } from "@/components/ui/Heading"
// import { prisma } from "@/src/lib/prisma"
// import Link from "next/link"
// import { redirect } from "next/navigation"

// async function productCount() {
//   return await prisma.product.count()
// }


// export async function getProducts(page: number, pageSize: number) {

//   const skip = (page - 1) * pageSize

//   const products = await prisma.product.findMany({
//     take: pageSize,
//     skip,
//     include: {
//       category: true,
//     }
//   })
//   return products
// }

// export type ProductsWithCategory = Awaited<ReturnType<typeof getProducts>>

// const ProductsPage = async ({ searchParams }: { searchParams: Promise<{ page?: string }> }) => {

//   const pageParams = +(await searchParams).page!
//   const page = pageParams || 1
//   const pageSize = 10
//   const skip = (page - 1) * pageSize

//   if (page < 0) redirect('/admin/products')

//   const productsData = getProducts(page, pageSize)
//   const totalProductsData = productCount()
//   const [products, totalProducts] = await Promise.all([productsData, totalProductsData])
//   const totalPages = Math.ceil(totalProducts / pageSize)

//   if (page > totalPages) redirect('/admin/products')

//   return (
//     <>
//       <Heading>
//         Administrar Productos
//       </Heading>

//       <div className="flex flex-col lg:flex-row lg:justify-between gap-5">
//         <Link href={'/admin/products/new'} className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 cursor-pointer font-bold">
//           Crear Producto
//         </Link>
//         <ProductSearchForm />
//       </div>

//       <ProductsTable
//         products={products}
//       />
//       <ProductsPagination
//         page={page}
//         totalPages={totalPages}
//       />
//     </>
//   )
// }

// export default ProductsPage

import { ProductSearchForm } from "@/components/products/ProductSearchForm"
import { ProductsPagination } from "@/components/products/ProductsPagination"
import { ProductsTable } from "@/components/products/ProductsTable"
import { Heading } from "@/components/ui/Heading"
import { prisma } from "@/src/lib/prisma"
import Link from "next/link"
import { redirect } from "next/navigation"

// Creamos un objeto con las funciones auxiliares
const ProductsHelper = {
  async productCount() {
    return await prisma.product.count()
  },

  async getProducts(page: number, pageSize: number) {
    const skip = (page - 1) * pageSize

    const products = await prisma.product.findMany({
      take: pageSize,
      skip,
      include: {
        category: true,
      }
    })
    return products
  }
} as const

export type ProductsWithCategory = Awaited<ReturnType<typeof ProductsHelper.getProducts>>

interface PageProps {
  searchParams: { page?: string }
}

const ProductsPage = async ({ searchParams }: PageProps) => {
  const page = Number(searchParams.page) || 1
  const pageSize = 10

  if (page < 0) redirect('/admin/products')

  const productsData = ProductsHelper.getProducts(page, pageSize)
  const totalProductsData = ProductsHelper.productCount()
  const [products, totalProducts] = await Promise.all([productsData, totalProductsData])
  const totalPages = Math.ceil(totalProducts / pageSize)

  if (page > totalPages) redirect('/admin/products')

  return (
    <>
      <Heading>
        Administrar Productos
      </Heading>

      <div className="flex flex-col lg:flex-row lg:justify-between gap-5">
        <Link href={'/admin/products/new'} className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 cursor-pointer font-bold">
          Crear Producto
        </Link>
        <ProductSearchForm />
      </div>

      <ProductsTable
        products={products}
      />
      <ProductsPagination
        page={page}
        totalPages={totalPages}
      />
    </>
  )
}

export default ProductsPage