import Car from '../Domains/Car';
import ICar from '../Interfaces/ICar';
import CarODM from '../Models/CarODM';

export default class CarService {
  private createCarDomain(car: ICar | null): Car | null {
    if (car) {
      return new Car(car);
    }
    return null;
  }

  public async createCar(car: ICar) {
    const carODM = new CarODM();
    const newCar = await carODM.create(car);

    return this.createCarDomain(newCar);
  }

  public async listCar() {
    const carODM = new CarODM();
    const cars = await carODM.list();

    const formattedCars = cars.map((car) => ({
      id: car.id,
      model: car.model,
      year: car.year,
      color: car.color,
      status: car.status,
      buyValue: car.buyValue,
      doorsQty: car.doorsQty,
      seatsQty: car.seatsQty,
    }));

    return formattedCars;
  }

  public async findCarById(id: string) {
    const carODM = new CarODM();
    try {
      const car = await carODM.findById(id);
      return car;
    } catch {
      throw new Error();
    }
  }

  public async updateCar(newData: Partial<ICar>) {
    const carODM = new CarODM();
    const car = await carODM.updateCar(newData);

    if (car) {
      const updatedCar = { 
        model: car.model,
        year: car.year,
        color: car.color,
        status: car.status,
        buyValue: car.buyValue,
        doorsQty: car.doorsQty,
        seatsQty: car.seatsQty,
      };

      return updatedCar;
    }
  }
}