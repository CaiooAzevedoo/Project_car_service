import Motorcycle from '../Domains/Motorcycle';
import IMotorcycle from '../Interfaces/IMotorcycle';
import MotorcycleODM from '../Models/MotorcycleODM';

export default class MotorcycleService {
  private createMotocycleDomain(moto: IMotorcycle | null): Motorcycle | null {
    if (moto) {
      return new Motorcycle(moto);
    }
    return null;
  }

  public async create(moto: IMotorcycle) {
    const motoODM = new MotorcycleODM();
    const newMoto = await motoODM.create(moto);

    return this.createMotocycleDomain(newMoto);
  }

  public async find() {
    const motoODM = new MotorcycleODM();
    const motos = await motoODM.find();

    const formattedCars = motos.map((moto) => ({
      id: moto.id,
      model: moto.model,
      year: moto.year,
      color: moto.color,
      status: moto.status,
      buyValue: moto.buyValue,
      category: moto.category,
      engineCapacity: moto.engineCapacity,
    
    }));

    return formattedCars;
  }

  public async findById(id: string) {
    const motoODM = new MotorcycleODM();
    try {
      const moto = await motoODM.findById(id);
      return moto;
    } catch {
      throw new Error('Invalid mongo id');
    }
  }

  public async update(id: string, newData: Partial<IMotorcycle>) {
    const motoODM = new MotorcycleODM();
    const moto = await motoODM.update(id, newData);
    try {
      if (moto) {
        const updatedMoto = {
          id: moto.id,
          model: moto.model,
          year: moto.year,
          color: moto.color,
          status: moto.status,
          buyValue: moto.buyValue,
          category: moto.category,
          engineCapacity: moto.engineCapacity,
        };
  
        return updatedMoto;
      }
    } catch {
      throw new Error();
    }
  }
}