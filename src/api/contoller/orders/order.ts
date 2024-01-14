import type { Request, Response } from 'express';
import type { OrderList, Order } from './order.model';
import type { StockList } from '../stock/stock.model';
import fs from 'fs/promises';
import stock from '../stock/stock';

const dataPath = 'src/data/order.json';
const stockDataPath = 'src/data/stock.json';

const getOrder = async (orderId: Number) => {
  try {
    let order: any = {};
    const data = await fs.readFile(dataPath, {
      encoding: 'utf8',
    });

    if (data.length > 0) {
      const allOrders: OrderList = JSON.parse(data);
      order = {
        ...allOrders.orders.find((order: Order) => order.order_id === Number(orderId)),
      };

      return { status: 200, data: order }
    }
    return { status: 204, message: `No Order Found with id: ${orderId}` }

  } catch (error) {
    return { status: 500, message: `An error occurred when fetching the order with id ${orderId}` };
  }
};

export const checkCustomerOrder = async (req: Request, res: Response) => {
  try {
    const isPriceCheck = req.query.isPriceCheck && req.query.isPriceCheck === 'true' ? true : false;
    const orderId = Number(req.params.id);
    const response = await getOrder(orderId);
    let availableVendorsWithStock: any = [];

    const data = await fs.readFile(stockDataPath, {
      encoding: 'utf8',
    });

    if (data.length > 0 && response.status === 200 && response.data && response.data) {

      const allStocks: StockList = JSON.parse(data);
      availableVendorsWithStock = availableVendors(response.data.order_details, allStocks, isPriceCheck);
    }
    res.status(200).send(availableVendorsWithStock);
  } catch (error) {
    res
      .status(500)
      .send(
        'An error occurred when checking availability order with id ' + req.params.id
      );
  }
};

export const getLowestCostStocksPerOrder = async (req: Request, res: Response) => {
  try {
    const orderId = Number(req.params.id);
    const response = await getOrder(orderId);
    let availableVendorsWithStock: any = [];

    const data = await fs.readFile(stockDataPath, {
      encoding: 'utf8',
    });

    if (data.length > 0 && response.status === 200 && response.data && response.data) {
      const allStocks: StockList = JSON.parse(data);
      availableVendorsWithStock = availableVendors(response.data.order_details, allStocks, true);
    }
    res.status(200).send(availableVendorsWithStock);
  } catch (error) {
    res
      .status(500)
      .send(
        'An error occurred when checking availability order with id ' + req.params.id
      );
  }
};

function availableVendors(order_details: any, allStocks: StockList, priceCheck: boolean) {
  return order_details.map((order: any) => {
    let lowestPrice: number = 0;
    order.availableVendors = allStocks.stocks.filter((stock: any) => {
      if (stock.apparel_id === Number(order.apparel_id) && stock.size_id === Number(order.size_id) && stock.quantity >= Number(order.quantity)) {
        if (priceCheck && lowestPrice === 0) {
          lowestPrice = stock.price;
        }
        if (priceCheck && stock.price < lowestPrice) {
          lowestPrice = stock.price;
        }
        return stock;
      }
    });

    if (priceCheck)
      order.lowestPrice = lowestPrice;
    order.canOrderPossible = order.availableVendors.length > 0 ? true : false;
    return order;
  });
}        

export default {
  checkCustomerOrder
};