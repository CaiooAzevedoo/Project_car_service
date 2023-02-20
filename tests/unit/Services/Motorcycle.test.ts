import { Model } from 'mongoose';
import Sinon from 'sinon';
import { expect } from 'chai';
import IMotorcycle from '../../../src/Interfaces/IMotorcycle';
import Motorcycle from '../../../src/Domains/Motorcycle';
import MotorcycleService from '../../../src/Services/Motorciclye.service';

describe('Testa os serviços relacionados a Motorcycle', function () {
  // mocks
  const honda = 'Honda Cb 600f Hornet';
  const motoInputMock: IMotorcycle = {
    model: honda,
    year: 2005,
    color: 'Yellow',
    status: true,
    buyValue: 30.000,
    category: 'Street',
    engineCapacity: 600,
  };

  const motoOutputMock: Motorcycle = new Motorcycle({
    id: '6348513f34c397abcad040b2',
    model: honda,
    year: 2005,
    color: 'Yellow',
    status: true,
    buyValue: 30.000,
    category: 'Street',
    engineCapacity: 600,
  });

  const carListOutputMock: IMotorcycle[] = [
    {
      id: '634852326b35b59438fbea2f',
      model: honda,
      year: 2005,
      color: 'Yellow',
      status: true,
      buyValue: 30.000,
      category: 'Street',
      engineCapacity: 600,
    },
    {
      id: '634852326b35b59438fbea31',
      model: 'Honda Cbr 1000rr',
      year: 2011,
      color: 'Orange',
      status: true,
      buyValue: 59.900,
      category: 'Street',
      engineCapacity: 1000,
    },
  ];

  it('Testa se uma moto é registrada com sucesso', async function () {
    // arrange
    Sinon.stub(Model, 'create').resolves(motoOutputMock);
    // act
    const service = new MotorcycleService();
    const outPut = await service.create(motoInputMock);
    // assert
    expect(outPut).to.be.deep.equal(motoOutputMock);
  });

  it('Testa se é possível obter uma lista com todas as motos', async function () {
    // arrange
    Sinon.stub(Model, 'find').resolves(carListOutputMock);
    // act
    const service = new MotorcycleService();
    const outPut = await service.find();
    // assert
    expect(outPut).to.be.deep.equal(carListOutputMock);
  });

  it('Testa se é possível consultar uma moto pelo id', async function () {
    // arrange
    Sinon.stub(Model, 'findById').resolves(motoOutputMock);
    // act
    const service = new MotorcycleService();
    const outPut = await service.findById('6348513f34c397abcad040b2');
    // assert
    expect(outPut).to.be.deep.equal(motoOutputMock);
  });

  it(
    'Testa se uma mensagem de error é retornada ao enviar um ID que não existe', 
    async function () {
      // arrange
      Sinon.stub(Model, 'findById').resolves({});
      // act
      try {
        const service = new MotorcycleService();
        await service.findById('1111222233330000ffffcccc');
      } catch (error) {
        // assert
        expect((error as Error).message).to.be.equal('Motorcycle not found');
      }
    },
  );

  it(
    'Testa se uma mensagem de error é retornada ao enviar um ID fora do padrão', 
    async function () {
      // arrange
      Sinon.stub(Model, 'findById').resolves({});
      // act
      try {
        const service = new MotorcycleService();
        await service.findById('11');
      } catch (error) {
        // assert
        expect((error as Error).message).to.be.equal('Invalid mongo id');
      }
    },
  );

  it('Testa se é possível alterar uma moto', async function () {
    // arrange
    Sinon.stub(Model, 'update').resolves();
  });

  afterEach(function () {
    Sinon.restore();
  });
});