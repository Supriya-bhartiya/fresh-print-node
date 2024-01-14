export interface Stock {
    stock_id: number,
    vendor_id: number,
    apparel_id: number,
    size_id:number,
    quantity: number,
    price: number,
    
  }
  
  export interface StockList {
    stocks: Stock[];
  }
