export const CATEGORIES = {
  foodAndDrink: "Food and Drink",
  purchases: "Purchases",
  housing: "Housing",
  transport: "Transport",
  vehicle: "Vehicle",
  lifeAndEntertainment: "Life and entertainment",
  communication: "Communication, PC",
  financialExpenses: "Financial expenses",
  investments: "Investments",
  other: "Other",
} as const;

export const CATEGORIES_ARRAY = Object.values(CATEGORIES);
