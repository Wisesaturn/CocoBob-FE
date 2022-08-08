export interface IProduct {
  category: string;
  code: string;
  description: string;
  name: string;
  price: number;
  productId: number;
  thumbnail: string;
}

export interface IProductList {
  empty: boolean;
  first: boolean;
  last: boolean;
  pageNumber: number;
  pageSize: number;
  productList: IProduct[];
  totalElements: number;
  totalPages: number;
}
export interface IPetProperties {
  property: string;
}
export interface IProductDetail {
  amountOfCalciumPerMcal: number;
  amountOfFatPerMcal: number;
  amountOfFiberPerMcal: number;
  amountOfMineralPerMcal: number;
  amountOfPhosphorusPerMcal: number;
  amountOfProteinPerMcal: number;
  beef: boolean;
  calcium: number;
  category: string;
  chicken: boolean;
  code: string;
  description: string;
  duck: boolean;
  fat: number;
  fiber: number;
  hydrolyticBeef: boolean;
  hydrolyticChicken: boolean;
  hydrolyticDuck: boolean;
  hydrolyticMeat: boolean;
  hydrolyticMutton: boolean;
  hydrolyticSalmon: boolean;
  hydrolyticTurkey: boolean;
  isAAFCOSatisfied: boolean;
  kcalPerKg: number;
  likeCount: number;
  meat: boolean;
  mineral: number;
  moisture: number;
  mutton: boolean;
  name: string;
  petProperties: IPetProperties[];
  phosphorus: number;
  price: number;
  productDetailImage: string;
  productId: number;
  productImage: string;
  protein: number;
  salmon: boolean;
  turkey: boolean;
}
