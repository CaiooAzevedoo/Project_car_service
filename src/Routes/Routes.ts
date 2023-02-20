import { Router } from 'express';
import CarController from '../Controllers/Car.controller';
import ValidId from '../Middlewares/Cars.middleware';

const routes = Router();

routes.post('/cars', (req, res, next) => new CarController(req, res, next).create());
routes.get('/cars', (req, res, next) => new CarController(req, res, next).find());
routes.get(
  '/cars/:id',
  ValidId.verify,
  (req, res, next) => new CarController(req, res, next).findCarById(),
);
routes.put(
  '/cars/:id',
  ValidId.verify,
  (req, res, next) => new CarController(req, res, next).update(),
);

export default routes;