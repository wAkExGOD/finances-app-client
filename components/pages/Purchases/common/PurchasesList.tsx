"use client"

import { Purchase } from "@/types/Purchase"
import { PurchaseCard } from "./PurchaseCard"

export function PurchasesList() {
  const handleDelete = (id: Purchase["id"]) => console.log(`delete ${id}`)
  const handleEdit = async (id: Purchase["id"]) => {
    return new Promise((resolve) => {
      setTimeout(() => resolve(console.log(`edit ${id}`)))
    })
  }

  return (
    <div className="grid grid-cols-4 gap-4">
      {mockPurchases.map((purchase) => (
        <PurchaseCard
          key={purchase.id}
          purchase={purchase}
          onDelete={handleDelete}
          onEdit={handleEdit}
        />
      ))}
    </div>
  )
}

const mockPurchases: Purchase[] = [
  {
    id: 1,
    title: "Pears",
    description: "Juicy and sweet pears",
    category: "Food and Drink",
    price: 3.5,
    createdAt: "2023-03-01T10:30:00Z",
  },
  {
    id: 2,
    title: "Movie Ticket",
    description: "Ticket for the new movie",
    category: "Life and entertainment",
    price: 12.0,
    createdAt: "2023-03-05T18:00:00Z",
  },
  {
    id: 3,
    title: "Apartment Rent",
    description: "Rent payment for March",
    category: "Housing",
    price: 500.0,
    createdAt: "2023-03-10T09:00:00Z",
  },
  {
    id: 4,
    title: "Gasoline",
    description: "Car refueling",
    category: "Transport",
    price: 45.0,
    createdAt: "2023-03-12T13:15:00Z",
  },
  {
    id: 5,
    title: "Streaming Service Subscription",
    description: "Monthly subscription",
    category: "Communication, PC",
    price: 9.99,
    createdAt: "2023-03-15T08:00:00Z",
  },
  {
    id: 6,
    title: "Coffee",
    description: "Morning coffee at the café",
    category: "Food and Drink",
    price: 4.5,
    createdAt: "2023-03-16T07:30:00Z",
  },
]
