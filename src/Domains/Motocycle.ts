import Vehicle from './Vehicle';
import IMotorcycles from '../Interfaces/IMotorcycles';

class Motocycle extends Vehicle {
  private category: string;
  private engineCapacity: number;

  constructor(vehicleParameters: IMotorcycles) {
    super(vehicleParameters);

    this.category = vehicleParameters.category;
    this.engineCapacity = vehicleParameters.engineCapacity;
  }
}

export default Motocycle;