import { model, Model, Schema, models } from 'mongoose';
import ICar from '../Interfaces/ICar';

const carSchema = new Schema<ICar>({
  model: { type: String, require: true },
  year: { type: Number, require: true },
  color: { type: String, required: true },
  status: { type: Boolean, required: false, default: false },
  buyValue: { type: Number, required: true },
  doorsQty: { type: Number, required: true },
  seatsQty: { type: Number, required: true },
});

class CarODM {
  private schema: Schema;
  private model: Model<ICar>;

  constructor() {
    this.schema = carSchema;
    this.model = models.Car || model('Car', this.schema);
  }

  public async create(car: ICar): Promise<ICar> {
    return this.model.create(car);
  }
}

export default CarODM;