import { ProductSearchForm } from "@/components/products/ProductSearchForm";
import { ProductsTable } from "@/components/products/ProductsTable";
import { Heading } from "@/components/ui/Heading"
import { prisma } from "@/src/lib/prisma";

const searchProducts = async (searchTerm: string) => {
  const products = await prisma.product.findMany({
    where: {
      name: {
        contains: searchTerm,
        mode: 'insensitive'
      }
    },
    include: {
      category: true
    }
  })
  return products
}

const SearchPage = async ({ searchParams }: { searchParams: Promise<{ search?: string }> }) => {

  const searchPrm = (await searchParams).search
  const searchTerm = searchPrm || ''
  const products = await searchProducts(searchTerm)

  return (
    <>
      <Heading>
        Resultados de busqueda: {searchTerm}
      </Heading>

      <div className="flex flex-col lg:flex-row lg:justify-end gap-5">
        <ProductSearchForm />
      </div>

      {products.length ? (
        <ProductsTable
          products={products}
        />
      ) :
        <p className="text-center text-lg">
          No hay resultados
        </p>}

    </>
  )
}

export default SearchPage