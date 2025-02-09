import { Order, OrderProducts, Product } from "@prisma/client";

export type TOrderItem = Pick<Product, 'id' | 'name' | 'price'> & {
  quantity: number
  subtotal: number
}

export type TOrderWithProducts = Order & {
  orderProducts: (OrderProducts & {
    product: Product
  })[]
}