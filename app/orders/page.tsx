"use client"
import useSWR from "swr"
import { Logo } from "@/components/ui/Logo"
import { TOrderWithProducts } from "@/src/types"
import { LastestOrder } from "@/components/order/LastestOrder"

const OrdersPage = () => {
  const url = '/orders/api'
  const fetcher = () => fetch(url).then(res => res.json()).then(data => data)
  const { data, error, isLoading } = useSWR<TOrderWithProducts[]>(url, fetcher, {
    refreshInterval: 60000,
    revalidateOnFocus: false
  })

  if (isLoading) return <p>Cargando...</p>

  if (data) return (
    <>
      <h1 className="text-center mt-20 text-6xl font-black">
        Ordenes Listas
      </h1>
      <Logo />
      {data.length ? (
        <div className="grid grid-cols-2 gap-5 max-w-5xl mx-auto mt-10">
          {data.map(order => (
            <LastestOrder
              key={order.id}
              order={order}
            />
          ))}
        </div>
      ) :
        <p className="text-center my-10">
          No hay ordenes listas
        </p>
      }
    </>
  )
}

export default OrdersPage