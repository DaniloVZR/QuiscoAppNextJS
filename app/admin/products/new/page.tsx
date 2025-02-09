import { AddProductForm } from "@/components/products/AddProductForm"
import { ProductForm } from "@/components/products/ProductForm"
import { ProductsTable } from "@/components/products/ProductsTable"
import { GoBackButton } from "@/components/ui/GoBackButton"
import { Heading } from "@/components/ui/Heading"
import { prisma } from "@/src/lib/prisma"

const NewProductPage = async () => {

  return (
    <>
      <Heading>Nuevo Producto</Heading>

      <GoBackButton />

      <AddProductForm>
        <ProductForm />
      </AddProductForm>
    </>
  )
}

export default NewProductPage