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
      this.next();
    }
  }

  public async find() {
    const cars = await this.service.find();
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

  public async update() {
    const { id } = this.req.params;
    const newData = this.req.body;

    try {
      await this.service.findCarById(id);
    } catch (error) {
      if (error) return this.res.status(404).json({ message: 'Car not found' });
      this.next();
    }
    
    const newCar = await this.service.update(id, newData);
    
    return this.res.status(200).json(newCar);
  }
}

export default CarController;