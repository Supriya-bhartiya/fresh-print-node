import express from 'express';

// Import individual route profiles from controllers
import stockRoute from '../routes/stock.routes';
import orderRoute from '../routes/order.routes';

const router = express.Router();

// Pass our router instance to controllers
router.get('/status', (req, res) => {
	res.json({
		message: 'OK',
		timestamp: new Date().toISOString(),
		IP: req.ip,
		URL: req.originalUrl,
	});
});

router.get('/', (req, res) => {
	res.json({
		message: 'Fresh Print coding challange for Node'
	});
});
router.use('/stocks', stockRoute);
router.use('/orders', orderRoute);

export default router;