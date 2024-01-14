export interface Order {
    order_id: number,
    customer_id: number,
    order_details:OrderDetails[]
  }
  
  export interface OrderList {
    orders: Order[];
  }

  interface OrderDetails {
    apparel_id: number,
    size_id: number,
    quantity: number,
  }