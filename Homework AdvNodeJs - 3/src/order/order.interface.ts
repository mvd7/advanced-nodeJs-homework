export interface Product {
  id: string;
  productName: string;
  productPrice: number;
}

export interface Order {
  id: string;
  orderDate: Date;
  productsOrdered: Product[];
}
