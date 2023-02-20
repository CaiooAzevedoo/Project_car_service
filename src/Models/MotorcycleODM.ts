import { Schema } from 'mongoose';
import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import AbstractODM from './AbstractODM';

class MotorcycleODM extends AbstractODM<IMotorcycle> {
  constructor() {
    const schema = new Schema<IMotorcycle>({
      model: { type: String, require: true },
      year: { type: Number, require: true },
      color: { type: String, required: true },
      status: { type: Boolean, required: false, default: false },
      buyValue: { type: Number, required: true },
      category: { type: String, required: true },
      engineCapacity: { type: Number, required: true },
    });
    super(schema, 'Motorcycle');
  }

  public async find(): Promise<IMotorcycle[]> {
    return this.model.find();
  }

  public async findById(id: string): Promise<Motorcycle> {
    const motorcycle = await this.model.findById(id);

    if (!motorcycle) throw new Error();

    return new Motorcycle(motorcycle);
  }
}

export default MotorcycleODM;