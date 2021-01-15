import express from 'express';
import Currency from '../controller/index';

const router = express.Router();

router.get('/rates', Currency.createProxy);


export default router;