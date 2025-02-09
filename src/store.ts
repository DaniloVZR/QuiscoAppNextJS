import { create } from "zustand";
import { TOrderItem } from "./types";
import { Product } from "@prisma/client";

interface Store {
  order: TOrderItem[]
  addToOrder: (product: Product) => void
  increaseQuantity: (id: Product['id']) => void
  decreaseQuantity: (id: Product['id']) => void
  removeItem: (id: Product['id']) => void
  clearOrder: () => void
}

export const useStore = create<Store>((set, get) => ({
  order: [],

  // Add to order
  addToOrder: (product) => {

    const { ...data } = product

    let order: TOrderItem[] = []
    const existingItem = get().order.find(item => item.id === data.id);
    if (existingItem) {
      if (existingItem.quantity < 5) {
        order = get().order.map(item => item.id === product.id ? {
          ...item,
          quantity: item.quantity + 1,
          subtotal: item.price * (item.quantity + 1)
        } : item);
      } else {
        return;
      }
    } else {
      order = [...get().order, {
        ...data,
        quantity: 1,
        subtotal: 1 * product.price
      }]
    }
    set(() => ({
      order
    }))
  },

  // Increase Quantity
  increaseQuantity: (id) => {
    set((state) => ({
      order: state.order.map(item => item.id === id ? {
        ...item,
        quantity: item.quantity + 1,
        subtotal: item.price * (item.quantity + 1)
      } : item)
    }))
  },

  // Decrease Quantuity
  decreaseQuantity: (id) => {

    const order = get().order.map(item => item.id === id ? {
      ...item,
      quantity: item.quantity - 1,
      subtotal: item.price * (item.quantity - 1)
    } : item)

    set(() => ({
      order
    }))
  },

  // Remove Item
  removeItem: (id) => {
    set(() => ({
      order: get().order.filter(item => item.id !== id)
    }))
  },

  // Clear Order
  clearOrder: () => {
    set(() => ({
      order: []
    }))
  }
}))