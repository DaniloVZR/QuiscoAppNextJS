import { ProductSearchForm } from "@/components/products/ProductSearchForm"
import { ProductsPagination } from "@/components/products/ProductsPagination"
import { ProductsTable } from "@/components/products/ProductsTable"
import { Heading } from "@/components/ui/Heading"
import { prisma } from "@/src/lib/prisma"
import { getProducts, productCount } from "@/src/lib/products" // Importar desde lib
import Link from "next/link"
import { redirect } from "next/navigation"

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

export type ProductsWithCategory = Awaited<ReturnType<typeof getProducts>>

const ProductsPage = async ({ searchParams }: { searchParams: Promise<{ page?: string }> }) => {

  const pageParams = +(await searchParams).page!
  const page = pageParams || 1
  const pageSize = 10
  const skip = (page - 1) * pageSize

  if (page < 0) redirect('/admin/products')

  const productsData = getProducts(page, pageSize)
  const totalProductsData = productCount()
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

// import { ProductSearchForm } from "@/components/products/ProductSearchForm"
// import { ProductsPagination } from "@/components/products/ProductsPagination"
// import { ProductsTable } from "@/components/products/ProductsTable"
// import { Heading } from "@/components/ui/Heading"
// import { getProducts, productCount } from "@/src/lib/products" // Importar desde lib
// import Link from "next/link"
// import { redirect } from "next/navigation"
// import { URLSearchParams } from "url"

// interface ProductsPageProps {
//   searchParams: Promise<{ page?: string | undefined }>
// }

// const ProductsPage = async ({ searchParams }: ProductsPageProps) => {

//   const page = (await searchParams).page ? parseInt((await searchParams).page) : 1
//   const pageSize = 10

//   if (page < 1) redirect('/admin/products')

//   // Obtiene los datos de los productos y el total de productos
//   const [products, totalProducts] = await Promise.all([
//     getProducts(page, pageSize),
//     productCount(),
//   ])

//   const totalPages = Math.ceil(totalProducts / pageSize)

//   if (page > totalPages) redirect('/admin/products')

//   return (
//     <>
//       <Heading>Administrar Productos</Heading>

//       <div className="flex flex-col lg:flex-row lg:justify-between gap-5">
//         <Link href={'/admin/products/new'} className="bg-amber-400 w-full lg:w-auto text-xl px-10 py-3 cursor-pointer font-bold">
//           Crear Producto
//         </Link>
//         <ProductSearchForm />
//       </div>

//       <ProductsTable products={products} />
//       <ProductsPagination page={page} totalPages={totalPages} />
//     </>
//   )
// }

// export default ProductsPage
