import { CATEGORIES } from "./../lib/constants/categories";

export type PurchaseCategory = (typeof CATEGORIES)[keyof typeof CATEGORIES];
export type PurchaseCategoryKey = keyof typeof CATEGORIES;
