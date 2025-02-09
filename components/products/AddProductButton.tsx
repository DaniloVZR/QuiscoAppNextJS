"use client"

import { Product } from "@prisma/client"
import { useStore } from "@/src/store"

type AddProductButtonProps = {
  product: Product
}

export const AddProductButton = ({ product }: AddProductButtonProps) => {

  const { addToOrder } = useStore()

  return (
    <button
      type="button"
      className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold"
      onClick={() => addToOrder(product)}
    >
      Agregar
    </button>
  )
}
