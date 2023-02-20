import { Request, Response, NextFunction } from 'express';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleService from '../Services/Motorciclye.service';

class MotorcycleController {
  private req: Request;
  private res: Response;
  private next: NextFunction;
  private service: MotorcycleService;
  
  constructor(req: Request, res: Response, next: NextFunction) {
    this.req = req;
    this.res = res;
    this.next = next;
    this.service = new MotorcycleService();
  }

  public async create() {
    const { 
      model, 
      year, 
      color, 
      status, 
      buyValue, 
      category,
      engineCapacity } = this.req.body;
    const moto: IMotorcycle = {
      model,
      year,
      color, 
      status, 
      buyValue, 
      category,
      engineCapacity, 
    };
    try {
      const newMoto = await this.service.create(moto);
      return this.res.status(201).json(newMoto);
    } catch (error) {
      this.next();
    }
  }

  public async find() {
    const motos = await this.service.find();
    return this.res.status(200).json(motos);
  }

  public async findById() {
    const { id } = this.req.params;

    try {
      const moto = await this.service.findById(id);

      return this.res.status(200).json(moto);
    } catch (error) {
      return this.res.status(404).json({ message: 'Motorcycle not found' });
    }
  }

  public async update() {
    const { id } = this.req.params;
    const newData = this.req.body;

    try {
      await this.service.findById(id);
    } catch (error) {
      if (error) return this.res.status(404).json({ message: 'Motorcycle not found' });
      this.next();
    }
    
    const newMoto = await this.service.update(id, newData);
    
    return this.res.status(200).json(newMoto);
  }
}

export default MotorcycleController;