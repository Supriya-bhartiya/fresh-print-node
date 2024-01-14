import type { Request, Response } from 'express';
import type { StockList, Stock } from './stock.model';
import fs from 'fs/promises';

const dataPath = 'src/data/stock.json';

export const updateStock = async (req: Request, res: Response) => {
  try {
    const data = await fs.readFile(dataPath, {
      encoding: 'utf8',
    });
    const dbStocks: StockList = JSON.parse(data);
    if (Array.isArray(req.body)) {
      const reqStocks: any[] = req.body;
      reqStocks.forEach(obj => {
        const stockToUpdate: Stock = obj;
        dbStocks.stocks = dbStocks.stocks.map((stock) =>
          stock.stock_id === obj.stock_id ? { ...stock, ...stockToUpdate } : stock);
      });
    } else {
      const stockId = req.body.stock_id;
      const stockToUpdate: Stock = req.body;

      dbStocks.stocks = dbStocks.stocks.map((stock) =>
        stock.stock_id === stockId ? { ...stock, ...stockToUpdate } : stock
      );
    }

    await fs.writeFile(dataPath, JSON.stringify(dbStocks, null, 2), {
      encoding: 'utf8',
    });

    res.status(200).send(dbStocks);
  } catch (error) {
    res
      .status(500)
      .send('An error occurred when updating the stock' + req.body);
  }
};

export default {
  updateStock
}