import Vehicle from './Vehicle';
import IMotorcycle from '../Interfaces/IMotorcycle';

class Motocycle extends Vehicle {
  private category: string;
  private engineCapacity: number;

  constructor(vehicleParameters: IMotorcycle) {
    super(vehicleParameters);

    this.category = vehicleParameters.category;
    this.engineCapacity = vehicleParameters.engineCapacity;
  }
}

export default Motocycle;