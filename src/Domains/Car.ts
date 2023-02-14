import ICar from '../Interfaces/ICar';
import Vehicle from './Vehicle';

class Car extends Vehicle {
  private doorsQty: number;
  private seatsQty: number;

  constructor(vehicleParameters: ICar) {
    super(vehicleParameters);

    this.doorsQty = vehicleParameters.doorsQty;
    this.seatsQty = vehicleParameters.seatsQty;
  }
}

export default Car;