import { Router } from 'express';
import CarController from '../Controllers/Car.controller';
import MotorcycleController from '../Controllers/Motorcycle.controller';
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
routes.post('/motorcycles', (req, res, next) => new MotorcycleController(req, res, next).create());
routes.get('/motorcycles', (req, res, next) => new MotorcycleController(req, res, next).find());
routes.get(
  '/motorcycles/:id',
  (req, res, next) => new MotorcycleController(req, res, next).findById(),
);
routes.put(
  '/motorcycles/:id',
  ValidId.verify,
  (req, res, next) => new MotorcycleController(req, res, next).update(),
);

export default routes;