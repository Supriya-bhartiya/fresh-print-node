
import express from 'express';
import {
  checkCustomerOrder,
  // getOrder,
  // addOrder,
  // updateOrder,
  // deleteOrder,
} from '../contoller/orders/order';
const orderRoutes = express.Router();


// orderRoutes.route('/all').get(getOrders);
orderRoutes.route('/order/:id').get(checkCustomerOrder);
// orderRoutes.route('/add-order').post(addOrder);
// orderRoutes.route('/order/:id').put(updateOrder);
// orderRoutes.route('/order/:id').delete(deleteOrder);

export default orderRoutes;
