import express from 'express';
import {
  updateStock
} from '../contoller/stock/stock';
const stockRoutes = express.Router();


stockRoutes.route('/update').put(updateStock);

export default stockRoutes;
