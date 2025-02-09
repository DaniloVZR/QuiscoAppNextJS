"use client"
import useSWR from "swr"
import { OrderCard } from "@/components/order/OrderCard"
import { Heading } from "@/components/ui/Heading"
import { TOrderWithProducts } from "@/src/types"

const OrdersPage = () => {
  const url = '/admin/orders/api'
  const fetcher = () => fetch(url).then(res => res.json()).then(data => data)
  const { data, error, isLoading } = useSWR<TOrderWithProducts[]>(url, fetcher, {
    refreshInterval: 60000,
    revalidateOnFocus: false
  })

  if (isLoading) return "Loading..."

  if (data) return (
    <>
      <Heading>
        Administrar Ordenes
      </Heading>

      {data.length ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-3 gap-5 mt-5">
          {data.map(order => (
            <OrderCard
              key={order.id}
              order={order}
            />
          ))}
        </div>
      ) :
        <p>
          No hay ordenes pendientes
        </p>
      }
    </>
  )
}

export default OrdersPage