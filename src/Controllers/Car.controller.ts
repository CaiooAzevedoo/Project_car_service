import { Request, Response, NextFunction } from 'express';
import ICar from '../Interfaces/ICar';
import CarService from '../Services/Car.service';

class CarController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: CarService;
  
  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new CarService();
  }

  public async create() {
    const { 
      model, 
      year, 
      color, 
      status, 
      buyValue, 
      doorsQty, 
      seatsQty } = this.req.body;
    const car: ICar = {
      model,
      year,
      color, 
      status, 
      buyValue, 
      doorsQty, 
      seatsQty, 
    };
    try {
      const newCar = await this.service.createCar(car);
      return this.res.status(201).json(newCar);
    } catch (error) {
      this.next(error);
    }
  }

  public async list() {
    const cars = await this.service.listCar();
    return this.res.status(200).json(cars);
  }

  public async findCarById() {
    const { id } = this.req.params;

    try {
      const car = await this.service.findCarById(id);

      return this.res.status(200).json(car);
    } catch (error) {
      return this.res.status(404).json({ message: 'Car not found' });
    }
  }

  public async updateCar() {
    const { id } = this.req.params;
    const newInfo = this.req.body;

    try {
      const car = await this.service.findCarById(id);
      return this.res.status(200).json(car);
    } catch (error) {
      if (error instanceof Error) return this.res.status(404).json({ message: 'Car not found' });
      this.next(error);
    }
    
    const newCar = await this.service.updateCar(id, newInfo);
    
    return this.res.status(200).json(newCar);
  }
}

export default CarController;